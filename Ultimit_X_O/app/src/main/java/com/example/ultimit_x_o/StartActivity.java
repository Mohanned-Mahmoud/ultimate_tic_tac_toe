package com.example.ultimit_x_o;

import android.content.Intent;
import android.content.SharedPreferences;
import android.os.Bundle;

import androidx.appcompat.app.AppCompatActivity;

public class StartActivity extends AppCompatActivity {

    private SharedPreferences preferences;
    private MusicManager musicManager;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_start);

        preferences = getSharedPreferences("game_settings", MODE_PRIVATE);
        musicManager = MusicManager.getInstance(this, preferences);

        if (preferences.getBoolean("music", true)) {
            musicManager.startBackgroundMusic();
        }

        findViewById(R.id.startGameButton).setOnClickListener(v -> startNewGame());
        findViewById(R.id.howToPlayButton).setOnClickListener(v -> showHowToPlay());
        findViewById(R.id.settingsButton).setOnClickListener(v -> openSettings());
    }

    private void startNewGame() {
        Intent intent = new Intent(StartActivity.this, LoadingActivity.class);
        intent.putExtra("next_activity", "main");
        startActivity(intent);
    }

    private void showHowToPlay() {
        Intent intent = new Intent(StartActivity.this, LoadingActivity.class);
        intent.putExtra("next_activity", "how_to_play");
        startActivity(intent);
    }

    private void openSettings() {
        Intent intent = new Intent(StartActivity.this, LoadingActivity.class);
        intent.putExtra("next_activity", "settings");
        startActivity(intent);
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
