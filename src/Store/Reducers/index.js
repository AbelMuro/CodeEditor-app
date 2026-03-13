import { combineReducers } from "redux";
import folderReducer from "./FolderReducer.ts";
import themeReducer from './ThemeReducer.ts';

const rootReducer = combineReducers({
    folderManagement: folderReducer,
    theme: themeReducer
});

export default rootReducer;