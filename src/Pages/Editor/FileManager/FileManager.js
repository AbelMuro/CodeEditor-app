import React from 'react';
import icons from './icons';
import * as styles from './styles.module.css';

function FileManager() {
    return (
        <aside className={styles.files}>
            <div className={styles.files_commands}>
                <button className={styles.files_commands_add_file}>
                    <img src={icons['addFile']}/>
                </button>
                <button className={styles.files_commands_add_folder}>
                    <img src={icons['addFolder']}/>
                </button>
            </div> 
        </aside>
    )
}

export default FileManager;