import { combineReducers } from "@reduxjs/toolkit";

import user from "../features/user/UserSlice";
import communityApplication from "../features/communityApplication/CommunityApplicationSlice";
import chat from "../features/chat/ChatSlice";

const rootReducer = combineReducers({
  user,
  communityApplication,
  chat,
});

export default rootReducer;
