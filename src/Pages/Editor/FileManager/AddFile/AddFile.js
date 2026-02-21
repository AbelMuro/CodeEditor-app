import React from 'react';
import icons from './icons';
import * as styles from './styles.module.css';

function AddFile() {

    const handleFile = () => {

    }

    return(
        <button className={styles.files_commands_add_file} onClick={handleFile}>
            <img src={icons['addFile']}/>
        </button>
    )
}

export default AddFile;