import { configureStore } from "@reduxjs/toolkit";
import {useDispatch, TypedUseSelectorHook, useSelector} from 'react-redux';
import rootReducer from "./Reducers";

const Store = configureStore({
    reducer: rootReducer
});

type RootState = ReturnType<typeof Store.getState>;
type TypedDispatch = typeof Store.dispatch;

const useTypedDispatch = () => useDispatch<TypedDispatch>();
const useTypedSelector : TypedUseSelectorHook<RootState> = useSelector;

export {useTypedDispatch, useTypedSelector};
export default Store;