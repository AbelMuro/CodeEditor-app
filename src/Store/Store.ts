import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./Reducers";

const Store = configureStore({
    reducer: rootReducer
});

export type RootState = ReturnType<typeof Store.getState>;
export type TypedDispatch = typeof Store.dispatch;
export default Store;