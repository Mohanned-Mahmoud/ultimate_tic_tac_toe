package com.example.ultimit_x_o;

import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.os.Vibrator;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.GridLayout;
import android.widget.ImageView;
import android.widget.MediaController;
import android.widget.RelativeLayout;
import android.widget.Toast;
import android.widget.VideoView;
import android.media.MediaPlayer;
import android.widget.Button;
import android.widget.TextView;


import androidx.appcompat.app.AppCompatActivity;

public class MainActivity extends AppCompatActivity {

    private GridLayout globalBoard;
    private GridLayout[] localBoards;
    private Model model;
    private Vibrator vibrator;
    private MusicManager musicManager;
    private SharedPreferences preferences;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);

        globalBoard = findViewById(R.id.globalBoard);
        localBoards = new GridLayout[9];
        localBoards[0] = findViewById(R.id.localBoard0);
        localBoards[1] = findViewById(R.id.localBoard1);
        localBoards[2] = findViewById(R.id.localBoard2);
        localBoards[3] = findViewById(R.id.localBoard3);
        localBoards[4] = findViewById(R.id.localBoard4);
        localBoards[5] = findViewById(R.id.localBoard5);
        localBoards[6] = findViewById(R.id.localBoard6);
        localBoards[7] = findViewById(R.id.localBoard7);
        localBoards[8] = findViewById(R.id.localBoard8);

        model = new Model();
        preferences = getSharedPreferences("game_settings", MODE_PRIVATE);
        musicManager = MusicManager.getInstance(this, preferences);

        if (preferences.getBoolean("music", true)) {
            musicManager.startBackgroundMusic();
        }

        for (GridLayout localBoard : localBoards) {
            for (int i = 0; i < localBoard.getChildCount(); i++) {
                ImageView imageView = (ImageView) localBoard.getChildAt(i);
                final int localBoardIndex = localBoardIndex(localBoard);
                final int imageViewIndex = i;
                imageView.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        handleImageViewClick(localBoardIndex, imageViewIndex, (ImageView) v);
                        triggerVibration(50); // Small vibration on button click
                    }
                });
            }
        }

        adjustGlobalBoardSize();
        ImageView settingsIcon = findViewById(R.id.settingsIcon);
        settingsIcon.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Intent intent = new Intent(MainActivity.this, SettingsActivity.class);
                startActivity(intent);
            }
        });
        Button restartButton = findViewById(R.id.restartButton);
        Button quitButton = findViewById(R.id.quitButton);

        // Initially hide buttons
        restartButton.setVisibility(View.GONE);
        quitButton.setVisibility(View.GONE);

        // Restart Button functionality
        restartButton.setOnClickListener(v -> {
            resetGame();
            restartButton.setVisibility(View.GONE);
            quitButton.setVisibility(View.GONE);
            Toast.makeText(this, "Game Restarted!", Toast.LENGTH_SHORT).show();
        });

        // Quit Button functionality
        quitButton.setOnClickListener(v -> finish());

    }



    private void resetGame() {

            Intent intent = new Intent(MainActivity.this, MainActivity.class);
            intent.addFlags(Intent.FLAG_ACTIVITY_CLEAR_TOP | Intent.FLAG_ACTIVITY_NEW_TASK);
            startActivity(intent);
            finish();
    }


    private void triggerVibration(int duration) {
        if (preferences.getBoolean("vibration", true)) {
            if (vibrator != null) {
                vibrator.vibrate(duration);
            }
        }
    }

    private void adjustGlobalBoardSize() {
        DisplayMetrics metrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(metrics);
        int screenWidth = metrics.widthPixels;

        globalBoard.getLayoutParams().width = screenWidth;
        globalBoard.getLayoutParams().height = screenWidth;
        globalBoard.requestLayout();
    }

    private int localBoardIndex(GridLayout localBoard) {
        for (int i = 0; i < localBoards.length; i++) {
            if (localBoards[i] == localBoard) {
                return i;
            }
        }
        return -1;
    }

    private void handleImageViewClick(int localBoardIndex, int imageViewIndex, ImageView imageView) {
        int row = imageViewIndex / 3;
        int col = imageViewIndex % 3;
        int boardRow = localBoardIndex / 3;
        int boardCol = localBoardIndex % 3;

        if (model.validMove(boardRow, boardCol, row, col)) {
            boolean isPlayerX = model.getCurrentPlayer();
            imageView.setImageResource(isPlayerX ? R.drawable.cat_x : R.drawable.cat_o);
            imageView.setEnabled(false);
            model.makeMove(boardRow, boardCol, row, col);

            if (model.checkWin(boardRow, boardCol)) {
                Toast.makeText(this, "Player " + (isPlayerX ? "X" : "O") + " wins local board!", Toast.LENGTH_SHORT).show();
                updateLocalBoardView(localBoards[localBoardIndex], isPlayerX ? "X" : "O");
                triggerVibration(500); // Long vibration on local board win
            }

            if (model.checkGlobalWin()) {
                Toast.makeText(this, "Player " + (isPlayerX ? "X" : "O") + " wins the game!", Toast.LENGTH_SHORT).show();
                showGlobalWinOverlay(isPlayerX ? "X" : "O");
                disableAllBoards();
            } else {
                model.switchPlayer();
                if (model.isLocalBoardWon(row, col)) {
                    updateBoardHighlight(-1); // Allow playing on any valid board
                } else {
                    updateBoardHighlight(row * 3 + col);
                }
            }
        } else {
            wrongBoardToast();
        }
    }

    private void showGlobalWinOverlay(String winner) {
        // Inflate the overlay view
        View overlay = getLayoutInflater().inflate(R.layout.global_win_overlay, null);
        VideoView winVideo = overlay.findViewById(R.id.globalWinVideo);
        int videoResId = winner.equals("X") ? R.raw.cat_x_win : R.raw.cat_o_win;
        String videoPath = "android.resource://" + getPackageName() + "/" + videoResId;
        Uri uri = Uri.parse(videoPath);
        winVideo.setVideoURI(uri);

        // Add a MediaController for playback controls
        MediaController mediaController = new MediaController(this);
        winVideo.setMediaController(mediaController);
        mediaController.setAnchorView(winVideo);

        // Set layout parameters for the overlay
        ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.MATCH_PARENT,
                ViewGroup.LayoutParams.MATCH_PARENT
        );
        overlay.setLayoutParams(params);

        // Add the overlay to the main layout
        RelativeLayout mainLayout = findViewById(R.id.mainLayout);
        mainLayout.addView(overlay);

        // Stop the background music
        musicManager.pauseBackgroundMusic();

        // Start the video
        winVideo.start();

        // Resume music after the video ends
        winVideo.setOnCompletionListener(new MediaPlayer.OnCompletionListener() {
            @Override
            public void onCompletion(MediaPlayer mp) {
                musicManager.resumeBackgroundMusic();
                mainLayout.removeView(overlay);
            }
        });

        // Optionally, add a click listener to remove the overlay when clicked
        overlay.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                winVideo.stopPlayback();
                mainLayout.removeView(overlay);
                musicManager.resumeBackgroundMusic();
            }
        });

        Button restartButton = findViewById(R.id.restartButton);
        Button quitButton = findViewById(R.id.quitButton);
        restartButton.setVisibility(View.VISIBLE);
        quitButton.setVisibility(View.VISIBLE);
    }

    private void updateLocalBoardView(GridLayout localBoard, String winner) {
        try {
            // Remove the local board from its parent
            ViewGroup parent = (ViewGroup) localBoard.getParent();
            int index = parent.indexOfChild(localBoard);
            parent.removeView(localBoard);

            // Inflate the overlay view
            View overlay = getLayoutInflater().inflate(R.layout.overlay_view, null);
            ImageView overlayImage = overlay.findViewById(R.id.overlay_image);
            overlayImage.setImageResource(winner.equals("X") ? R.drawable.cat_x : R.drawable.cat_o);

            // Set layout parameters for the overlay
            ViewGroup.LayoutParams params = new ViewGroup.LayoutParams(
                    localBoard.getWidth(),
                    localBoard.getHeight()
            );
            overlay.setLayoutParams(params);

            // Add the overlay to the parent at the same position
            parent.addView(overlay, index);

            // Disable all ImageViews in the local board
            for (int i = 0; i < localBoard.getChildCount(); i++) {
                View view = localBoard.getChildAt(i);
                if (view instanceof ImageView) {
                    ImageView imageView = (ImageView) view;
                    imageView.setEnabled(false);
                }
            }

            Log.d("updateLocalBoardView", "Overlay added successfully for winner: " + winner);
        } catch (Exception e) {
            Log.e("updateLocalBoardView", "Error updating local board view", e);
        }
    }

    private void disableAllBoards() {
        for (GridLayout localBoard : localBoards) {
            for (int i = 0; i < localBoard.getChildCount(); i++) {
                ImageView imageView = (ImageView) localBoard.getChildAt(i);
                imageView.setEnabled(false);
            }
        }
    }

    private void updateBoardHighlight(int boardIndex) {
        for (int i = 0; i < localBoards.length; i++) {
            GridLayout localBoard = localBoards[i];

            if (boardIndex == -1) {
                if (model.isBoardAvailable(i)) {
                    localBoard.setBackgroundResource(R.drawable.highlight_green);
                    enableBoard(localBoard, true);
                } else {
                    localBoard.setBackgroundResource(android.R.color.transparent);
                    enableBoard(localBoard, false);
                }
            } else if (i == boardIndex) {
                localBoard.setBackgroundResource(R.drawable.highlight_green);
                enableBoard(localBoard, true);
            } else {
                localBoard.setBackgroundResource(android.R.color.transparent);
                enableBoard(localBoard, false);
            }
        }
    }

    private void enableBoard(GridLayout board, boolean enable) {
        for (int j = 0; j < board.getChildCount(); j++) {
            View view = board.getChildAt(j);
            if (view instanceof ImageView) {
                view.setEnabled(enable && ((ImageView) view).getDrawable() == null);
            }
        }
    }

    private void wrongBoardToast() {
        if (model.checkGlobalWin()) {
            Toast.makeText(this, "Player " + (model.getCurrentPlayer() ? "X" : "O") + " wins the game!", Toast.LENGTH_SHORT).show();
            disableAllBoards();
        } else {
            Toast.makeText(this, "Invalid move! Please select a valid board.", Toast.LENGTH_SHORT).show();
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (preferences.getBoolean("music", true)) {
            musicManager.resumeBackgroundMusic();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        musicManager.pauseBackgroundMusic();
    }

    private void disableAllExceptHighlighted(int boardIndex) {
        for (int i = 0; i < localBoards.length; i++) {
            if (i != boardIndex) {
                GridLayout localBoard = localBoards[i];
                for (int j = 0; j < localBoard.getChildCount(); j++) {
                    ImageView imageView = (ImageView) localBoard.getChildAt(j);
                    imageView.setEnabled(false);
                }
            } else {
                GridLayout localBoard = localBoards[i];
                for (int j = 0; j < localBoard.getChildCount(); j++) {
                    ImageView imageView = (ImageView) localBoard.getChildAt(j);
                    imageView.setEnabled(true);
                }
            }
        }
    }
}
