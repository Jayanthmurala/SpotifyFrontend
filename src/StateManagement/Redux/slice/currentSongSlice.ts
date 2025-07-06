import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CurrentSong {
  id: string;
  title: string;
  artist?: string;
  cover_image: string;
  audio_file: string;
}

const initialState: CurrentSong | null = null;

const currentSongSlice = createSlice({
  name: 'currentSong',
  initialState,
  reducers: {
    setCurrentSong: (state, action: PayloadAction<CurrentSong>) => {
      return action.payload;
    },
    clearCurrentSong: () => null,
  },
});

export const { setCurrentSong, clearCurrentSong } = currentSongSlice.actions;
export default currentSongSlice.reducer;
