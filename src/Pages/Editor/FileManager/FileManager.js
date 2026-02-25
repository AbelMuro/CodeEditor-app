import React from 'react';
import CreateFolder from './Folder/CreateFolder';
import { useTypedSelector } from '~/Store';
import {LayoutGroup, motion} from 'framer-motion';
import Folder from './Folder';
import AddFile from './AddFile';
import AddFolder from './AddFolder';
import * as styles from './styles.module.css';


function FileManager() {
    const folders = useTypedSelector(state => state.folderManagement.allFolders.folders);
    const createNewFolder = useTypedSelector(state => state.folderManagement.creatingFolder);
    const currentFolderId = useTypedSelector(state => state.folderManagement.currentFolder);

    return (
        <aside className={styles.files}>
            <div className={styles.files_commands}>
                <AddFile/>
                <AddFolder/>
            </div> 
            <LayoutGroup>            
                <motion.div layout className={styles.folders}> 
                    {(createNewFolder && ('root' === currentFolderId)) && <CreateFolder id={'root'}/>} 
                    {
                        folders.map((folder) => {
                            const name = folder.name;
                            const id = folder.id;
                            const files = folder.files;
                            const folders = folder.folders;
         
                            return <Folder name={name} id={id} files={files} folders={folders}/>
                       })
                    }
                </motion.div>
            </LayoutGroup>  
        </aside>
    )
}

export default FileManager;