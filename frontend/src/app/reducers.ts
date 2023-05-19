import { combineReducers } from "@reduxjs/toolkit";

import user from "../features/user/UserSlice";
import community from "../features/community/CommunitySlice";

const rootReducer = combineReducers({
  user,
  community,
});

export default rootReducer;
