import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slice/userSlice'
import songsSlice from './slice/songsSlice'
import currentSongReducer from './slice/currentSongSlice'
import playerReducer from './slice/playerSlice'

const store = configureStore({
  reducer: {
    user: userSlice,
    song: songsSlice,
    currentSong: currentSongReducer,
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
