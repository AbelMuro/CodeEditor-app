import React from 'react';
import {LayoutGroup} from 'framer-motion';
import Folder from './Folder';
import icons from './icons';
import * as styles from './styles.module.css';

/* 
    {
        folderName: {
            fileName: {
                name: fileName 
                extension: js
            },
            folderName: {
                fileName: {
                name: { 
                    name: fileName,
                    extension: js
                }
            }
        }
    }
*/

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
            <div className={styles.folders}> 
                <LayoutGroup>
                    <Folder name={'public'}/>    
                </LayoutGroup>          
            </div>
        </aside>
    )
}

export default FileManager;