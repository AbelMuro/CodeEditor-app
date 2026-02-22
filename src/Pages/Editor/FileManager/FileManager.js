import React, {useState, useEffect} from 'react';
import { useSelector } from 'react-redux';
import {LayoutGroup, motion} from 'framer-motion';
import Folder from './Folder';
import AddFile from './AddFile';
import AddFolder from './AddFolder';
import * as styles from './styles.module.css';

/* 
    {      
        name: 'root'
        directory: ['root'],
        files: [],
        folders: [
            {
                name: 'my folder'
                directory: ['root', 'my folder']
                files: [{name: '', extension: '', content: ''}, {name: '', extension: '', content: ''}]
                folders: []
            }        
        ]

    }
*/

function FileManager() {
    const folders = useSelector(state => state.folderManagement.allFolders.folders);



    return (
        <aside className={styles.files}>
            <div className={styles.files_commands}>
                <AddFile/>
                <AddFolder/>
            </div> 
            <LayoutGroup>            
                <motion.div layout className={styles.folders}> 
                    {
                        folders.map((folder) => {
                            const name = folder.name;
                            const directory = folder.directory;
                            const files = folder.files;
                            const folders = folder.folders;
         
                            return <Folder name={name} directory={directory} files={files} folders={folders}/>
                       })
                    }
                </motion.div>
            </LayoutGroup>  
        </aside>
    )
}

export default FileManager;