// LoadingActivity.java
package com.example.ultimit_x_o;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.os.Handler;
import android.widget.VideoView;

import androidx.appcompat.app.AppCompatActivity;

public class LoadingActivity extends AppCompatActivity {

    private static final int LOADING_DISPLAY_LENGTH = 1600; // Adjust as needed

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_loading);

        VideoView loadingVideoView = findViewById(R.id.loadingVideoView);

        Uri videoUri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.loading_video);
        loadingVideoView.setVideoURI(videoUri);

        loadingVideoView.setOnPreparedListener(mp -> {
            mp.setLooping(true); // Loop the video
            loadingVideoView.start();
        });

        final String nextActivity = getIntent().getStringExtra("next_activity");

        new Handler().postDelayed(() -> {
            Intent intent = null;
            if (nextActivity != null) {
                switch (nextActivity) {
                    case "settings":
                        intent = new Intent(LoadingActivity.this, SettingsActivity.class);
                        break;
                    case "how_to_play":
                        intent = new Intent(LoadingActivity.this, HowToPlayActivity.class);
                        break;
                    case "main":
                    default:
                        intent = new Intent(LoadingActivity.this, MainActivity.class);
                        break;
                }
            } else {
                intent = new Intent(LoadingActivity.this, MainActivity.class);
            }
            startActivity(intent);
            finish();
        }, LOADING_DISPLAY_LENGTH);
    }
}
