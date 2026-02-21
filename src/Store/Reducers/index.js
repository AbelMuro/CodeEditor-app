import { combineReducers } from "redux";
import folderReducer from "./FolderReducer.js";

const rootReducer = combineReducers({
    folderManagement: folderReducer
});

export default rootReducer;