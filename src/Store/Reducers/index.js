import { combineReducers } from "redux";
import folderReducer from "./FolderReducer.js";

const rootReducer = combineReducers({
    folder: folderReducer
});

export default rootReducer;