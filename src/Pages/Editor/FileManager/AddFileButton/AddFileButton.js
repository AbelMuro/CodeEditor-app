import React from 'react';
import { useTypedDispatch } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function AddFileButton() {
    const dispatch = useTypedDispatch();

    const handleFile = () => {
        dispatch({type: 'DISPLAY_FILE_INPUT', payload: true})
        dispatch({type: 'DISPLAY_FOLDER_INPUT', payload: false});
    }

    return(
        <button className={styles.files_commands_add_file} onClick={handleFile}>
            <img src={icons['addFile']}/>
        </button>
    )
}

export default AddFileButton;