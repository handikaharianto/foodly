import { combineReducers } from "@reduxjs/toolkit";

import user from "../features/user/UserSlice";
import communityApplication from "../features/communityApplication/CommunityApplicationSlice";

const rootReducer = combineReducers({
  user,
  communityApplication,
});

export default rootReducer;
