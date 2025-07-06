import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Song {
  id: string;
  title: string;
  description: string;
  audio_file: string;
  cover_image: string;
}

interface SongsState {
  songs: Song[];
}

const initialState: SongsState = {
  songs: [],
};

const songsSlice = createSlice({
  name: 'songs',
  initialState,
  reducers: {
    // Set the entire list of songs
    setSongs: (state, action: PayloadAction<Song[]>) => {
      state.songs = action.payload;
    },

    // Add a new song to the list
    addSong: (state, action: PayloadAction<Song>) => {
      state.songs.push(action.payload);
    },

    // Remove a song by _id
    removeSong: (state, action: PayloadAction<string>) => {
      state.songs = state.songs.filter(song => song.id !== action.payload);
    },
  },
});

export const { setSongs, addSong, removeSong } = songsSlice.actions;
export default songsSlice.reducer;
