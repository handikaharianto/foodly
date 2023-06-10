import { combineReducers } from "@reduxjs/toolkit";

import user from "../features/user/UserSlice";
import communityApplication from "../features/communityApplication/CommunityApplicationSlice";
import chat from "../features/chat/ChatSlice";
import community from "../features/community/communitySlice";

const rootReducer = combineReducers({
  user,
  communityApplication,
  chat,
  community,
});

export default rootReducer;
