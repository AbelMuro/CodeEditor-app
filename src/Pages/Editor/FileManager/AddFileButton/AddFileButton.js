import React from 'react';
import { ChangeStyles } from '~/Common/Functions';
import { useTypedDispatch, useTypedSelector } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function AddFileButton() {
    const dispatch = useTypedDispatch();
    const theme = useTypedSelector(state => state.theme.theme);

    const handleFile = () => {
        dispatch({type: 'DISPLAY_FILE_INPUT', payload: true})
        dispatch({type: 'DISPLAY_FOLDER_INPUT', payload: false});
    }

    return(
        <button className={ChangeStyles(theme, 'add_file', styles)} onClick={handleFile}>
            {theme === 'dark' ? <img src={icons['addFileDark']}/> : <img src={icons['addFileLight']}/>}
        </button>
    )
}

export default AddFileButton;