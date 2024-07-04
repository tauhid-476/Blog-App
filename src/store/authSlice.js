import { createSlice } from "@reduxjs/toolkit";

// this is used to track the authentication of user


const initialState = {

  status: false,
  userData: null

}
const authSlice = createSlice({
  //name initial state reducers
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {

        state.status = true,
        state.userData = action.payload.userData
        //when login,jsx calls here the status remains same and the userdata changes
    },
   logout : (state)=>{

    state.status = false;
    state.userData = null;
   }
  }
})

export const {login,logout} = authSlice.actions
export default authSlice.reducer;