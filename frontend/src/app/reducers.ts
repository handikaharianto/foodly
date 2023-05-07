import { combineReducers } from "@reduxjs/toolkit";

import user from "../features/user/UserSlice";

const rootReducer = combineReducers({
  user,
});

export default rootReducer;
