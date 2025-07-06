// src/StateManagement/Redux/slices/playerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';


// StateManagement/Redux/slices/playerSlice.ts
export interface CurrentSong {
  _id: string;
  title: string;
  description?: string;
  audio_file: string;
  cover_image?: string;
  artist?: string;
}

interface PlayerState {
  currentSong: CurrentSong | null;
  isPlaying: boolean;
}



const initialState: PlayerState = {
  currentSong: null,
  isPlaying: false,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setCurrentSong(state, action: PayloadAction<CurrentSong>) {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    setIsPlaying(state, action: PayloadAction<boolean>) {
      state.isPlaying = action.payload;
    },
  },
});

export const { setCurrentSong, setIsPlaying } = playerSlice.actions;
export default playerSlice.reducer;
