package com.example.ultimit_x_o;

import android.annotation.SuppressLint;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.net.Uri;
import android.os.Bundle;
import android.os.Vibrator;
import android.view.View;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.Spinner;

import androidx.appcompat.app.AppCompatActivity;

public class SettingsActivity extends AppCompatActivity {
    private Vibrator vibrator;
    private ImageView vibrationSwitch;
    private ImageView musicSwitch;
    private ImageView soundSwitch;
    private Spinner musicSpinner;
    private SharedPreferences preferences;
    private SharedPreferences.Editor editor;
    private MusicManager musicManager;

    private boolean isVibrationOn;
    private boolean isMusicOn;
    private boolean isSoundOn;

    @SuppressLint("WrongViewCast")
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_settings);

        vibrator = (Vibrator) getSystemService(Context.VIBRATOR_SERVICE);
        preferences = getSharedPreferences("game_settings", MODE_PRIVATE);
        editor = preferences.edit();
        musicManager = MusicManager.getInstance(this, preferences);

        vibrationSwitch = findViewById(R.id.vibrationSwitch);
        musicSwitch = findViewById(R.id.musicSwitch);
        soundSwitch = findViewById(R.id.soundSwitch);
        musicSpinner = findViewById(R.id.music_spinner);

        isVibrationOn = preferences.getBoolean("vibration", true);
        isMusicOn = preferences.getBoolean("music", true);
        isSoundOn = preferences.getBoolean("sound", true);

        updateSwitchState(vibrationSwitch, isVibrationOn, R.drawable.toggle_on1, R.drawable.toggle_off1);
        updateSwitchState(musicSwitch, isMusicOn, R.drawable.toggle_on2, R.drawable.toggle_off2);
        updateSwitchState(soundSwitch, isSoundOn, R.drawable.toggle_on3, R.drawable.toggle_off3);

        ArrayAdapter<CharSequence> adapter = ArrayAdapter.createFromResource(this,
                R.array.music_spinner, android.R.layout.simple_spinner_item);
        adapter.setDropDownViewResource(android.R.layout.simple_spinner_dropdown_item);
        musicSpinner.setAdapter(adapter);

        // Set selected music from preferences
        int selectedMusic = preferences.getInt("selected_music", 0);
        musicSpinner.setSelection(selectedMusic);

        vibrationSwitch.setOnClickListener(v -> {
            isVibrationOn = !isVibrationOn;
            editor.putBoolean("vibration", isVibrationOn).apply();
            updateSwitchState(vibrationSwitch, isVibrationOn, R.drawable.toggle_on1, R.drawable.toggle_off1);
            triggerVibration(50);
        });

        musicSwitch.setOnClickListener(v -> {
            isMusicOn = !isMusicOn;
            editor.putBoolean("music", isMusicOn).apply();
            updateSwitchState(musicSwitch, isMusicOn, R.drawable.toggle_on2, R.drawable.toggle_off2);
            if (isMusicOn) {
                musicManager.startBackgroundMusic();
            } else {
                musicManager.stopBackgroundMusic();
            }
            triggerVibration(50);
        });

        soundSwitch.setOnClickListener(v -> {
            isSoundOn = !isSoundOn;
            editor.putBoolean("sound", isSoundOn).apply();
            updateSwitchState(soundSwitch, isSoundOn, R.drawable.toggle_on3, R.drawable.toggle_off3);
            triggerVibration(50);
        });

        musicSpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                editor.putInt("selected_music", position).apply();
                if (isMusicOn) {
                    musicManager.changeBackgroundMusic(position);
                }
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {
            }
        });

        findViewById(R.id.restartGameButton).setOnClickListener(v -> {
            restartGame();
            triggerVibration(50);
        });

        findViewById(R.id.githubIcon).setOnClickListener(v -> openLink("https://github.com/Mohanned-Mahmoud"));

        findViewById(R.id.linkedinIcon).setOnClickListener(v -> openLink("https://www.linkedin.com/in/mohanned-mahmoud-226579268/"));

        findViewById(R.id.instagramIcon).setOnClickListener(v -> openLink("https://www.instagram.com/mohanned._.78/"));
    }

    private void openLink(String url) {
        Intent intent = new Intent(Intent.ACTION_VIEW);
        intent.setData(Uri.parse(url));
        startActivity(intent);
    }

    public void restartGame() {
        Intent intent = new Intent(SettingsActivity.this, MainActivity.class);
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

    private void updateSwitchState(ImageView switchView, boolean isOn, int drawableOn, int drawableOff) {
        if (isOn) {
            switchView.setImageResource(drawableOn);
        } else {
            switchView.setImageResource(drawableOff);
        }
    }

    @Override
    protected void onResume() {
        super.onResume();
        if (preferences.getBoolean("music", true)) {
            musicManager.startBackgroundMusic();
        }
    }

    @Override
    protected void onPause() {
        super.onPause();
        musicManager.pauseBackgroundMusic();
    }
}
