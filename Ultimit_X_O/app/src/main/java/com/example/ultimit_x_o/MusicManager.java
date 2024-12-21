package com.example.ultimit_x_o;

import android.content.Context;
import android.content.SharedPreferences;
import android.media.MediaPlayer;

public class MusicManager {
    private static MusicManager instance;
    private MediaPlayer backgroundMusic;
    private Context context;
    private SharedPreferences preferences;

    private MusicManager(Context context, SharedPreferences preferences) {
        this.context = context;
        this.preferences = preferences;
    }

    public static MusicManager getInstance(Context context, SharedPreferences preferences) {
        if (instance == null) {
            instance = new MusicManager(context, preferences);
        }
        return instance;
    }

    public void startBackgroundMusic() {
        if (backgroundMusic == null) {
            int selectedMusic = preferences.getInt("selected_music", 0);
            int musicResId = getMusicResId(selectedMusic);
            backgroundMusic = MediaPlayer.create(context, musicResId);
            backgroundMusic.setLooping(true);
        }
        backgroundMusic.start();
    }

    public void stopBackgroundMusic() {
        if (backgroundMusic != null) {
            backgroundMusic.pause();
        }
    }

    public void pauseBackgroundMusic() {
        if (backgroundMusic != null && backgroundMusic.isPlaying()) {
            backgroundMusic.pause();
        }
    }

    public void resumeBackgroundMusic() {
        if (backgroundMusic != null && !backgroundMusic.isPlaying()) {
            backgroundMusic.start();
        }
    }

    public void changeBackgroundMusic(int position) {
        stopBackgroundMusic();
        int musicResId = getMusicResId(position);
        backgroundMusic = MediaPlayer.create(context, musicResId);
        backgroundMusic.setLooping(true);
        backgroundMusic.start();
    }

    private int getMusicResId(int position) {
        switch (position) {
            case 0:
                return R.raw.background_music4; // Ensure you have these music files in res/raw
            case 1:
                return R.raw.background_music2;
            case 2:
                return R.raw.background_music3;
            case 3:
                return R.raw.background_music;
            default:
                return R.raw.background_music4;
        }
    }
}
