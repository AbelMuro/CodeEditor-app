import React from 'react';
import { useTypedDispatch } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function AddFile() {
    const dispatch = useTypedDispatch();

    const handleFile = () => {
        dispatch({type: 'CREATE_FILE', payload: true})
    }

    return(
        <button className={styles.files_commands_add_file} onClick={handleFile}>
            <img src={icons['addFile']}/>
        </button>
    )
}

export default AddFile;