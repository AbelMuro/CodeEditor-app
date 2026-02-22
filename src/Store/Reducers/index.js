import { combineReducers } from "redux";
import folderReducer from "./FolderReducer.ts";

const rootReducer = combineReducers({
    folderManagement: folderReducer
});

export default rootReducer;