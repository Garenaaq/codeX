import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUser {
  id: string;
  nickname: string;
  name: string;
  surname: string;
  role:
    | "Frontend Developer"
    | "Backend Developer"
    | "QA Engineer"
    | "Designer"
    | "Manager"
    | "HR";
}

interface IUserState {
  user: IUser | null;
}

const initialState: IUserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setAuthenticated: (state, action: PayloadAction<IUser>) => {
      state.user = action.payload;
    },
    setUnauthenticated: (state) => {
      state.user = null;
    },
  },
});

export const { setAuthenticated, setUnauthenticated } = userSlice.actions;
export default userSlice.reducer;
