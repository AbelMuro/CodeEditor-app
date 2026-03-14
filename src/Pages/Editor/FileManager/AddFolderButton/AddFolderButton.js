import React from 'react';
import {ChangeStyles} from '~/Common/Functions';
import { useTypedDispatch, useTypedSelector } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function AddFolderButton() {
    const dispatch = useTypedDispatch();
    const theme = useTypedSelector(state => state.theme.theme);

    const handleFolder = () => {
        dispatch({type: 'DISPLAY_FOLDER_INPUT', payload: true});
        dispatch({type: 'DISPLAY_FILE_INPUT', payload: false})
    }

    return(
        <button 
            onClick={handleFolder}
            className={ChangeStyles(theme, 'add_folder', styles)}>
                {theme === 'dark' ? <img src={icons['addFolder_dark']}/> : <img src={icons['addFolder_light']}/>}
        </button>
    )
};

export default AddFolderButton;