import React from 'react';
import { useDispatch } from 'react-redux';
import icons from './icons';
import * as styles from './styles.module.css';

function AddFolder() {
    const dispatch = useDispatch();


    const handleFolder = () => {
        dispatch({type: 'CREATE_FOLDER', payload: true});
    }

    return(
        <button 
            onClick={handleFolder}
            className={styles.files_commands_add_folder}>
            <img src={icons['addFolder']}/>
        </button>
    )
};

export default AddFolder;