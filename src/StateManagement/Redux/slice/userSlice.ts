import { createSlice } from '@reduxjs/toolkit'

interface UserState {
    _id: string;
  name: string;
  email: string;
  password: string;
  role: string;
  playlist: string[];
}

const initialState: UserState = {
    _id: '',
    name: '',
    email: '',
    password: '',
    role: '',
    playlist: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      const { _id, name, email, password, role, playlist } = action.payload;
      state._id = _id;
      state.name = name;
      state.email = email;
      state.password = password;
      state.role = role;
      state.playlist = playlist;
    },
    clearUser: (state) => {
      state._id = '';
      state.name = '';
      state.email = '';
      state.password = '';
      state.role = '';
      state.playlist = [];
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;

