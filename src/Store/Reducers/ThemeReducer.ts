import {createReducer, createAction} from '@reduxjs/toolkit';
import { PayloadAction } from '@reduxjs/toolkit'

type InitialState = {
    theme: string
}

const switchTheme = createAction('SWITCH_THEME');

const initialState : InitialState = {
    theme: 'dark'
}

const themeReducer = createReducer(initialState, builder => {
    builder.addCase(switchTheme, (state) => {
        state.theme = state.theme === 'dark' ? 'light' : 'dark'; 
    })
})

export default themeReducer;