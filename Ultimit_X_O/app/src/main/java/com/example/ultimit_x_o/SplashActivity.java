package com.example.ultimit_x_o;

import android.content.Intent;
import android.net.Uri;
import android.os.Bundle;
import android.widget.VideoView;

import androidx.appcompat.app.AppCompatActivity;

public class SplashActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splash);

        VideoView videoView = findViewById(R.id.splashVideoView);
        Uri videoUri = Uri.parse("android.resource://" + getPackageName() + "/" + R.raw.splash_video); // Ensure the video file is in res/raw
        videoView.setVideoURI(videoUri);

        videoView.setOnCompletionListener(mediaPlayer -> {
            startActivity(new Intent(SplashActivity.this, StartActivity.class));
            finish();
        });

        videoView.start();
    }
}
