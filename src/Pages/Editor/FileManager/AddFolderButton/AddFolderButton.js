import React from 'react';
import { useTypedDispatch } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function AddFolderButton() {
    const dispatch = useTypedDispatch();

    const handleFolder = () => {
        dispatch({type: 'DISPLAY_FOLDER_INPUT', payload: true});
        dispatch({type: 'DISPLAY_FILE_INPUT', payload: false})
    }

    return(
        <button 
            onClick={handleFolder}
            className={styles.files_commands_add_folder}>
                <img src={icons['addFolder']}/>
        </button>
    )
};

export default AddFolderButton;