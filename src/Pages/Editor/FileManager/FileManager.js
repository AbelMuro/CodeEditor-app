import React from 'react';
import CreateFolder from './Folder/CreateFolder';
import CreateFile from './Folder/CreateFile';
import { useTypedSelector } from '~/Store';
import {LayoutGroup, motion} from 'framer-motion';
import Folder from './Folder';
import File from './Folder/File';
import AddFile from './AddFile';
import AddFolder from './AddFolder';
import * as styles from './styles.module.css';


function FileManager() {
    const folders = useTypedSelector(state => state.folderManagement.allFolders.folders);
    const files = useTypedSelector(state => state.folderManagement.allFolders.files);
    const createNewFolder = useTypedSelector(state => state.folderManagement.creatingFolder);
    const createNewFile = useTypedSelector(state => state.folderManagement.creatingFile);
    const currentFolderId = useTypedSelector(state => state.folderManagement.currentFolder);

    return (
        <aside className={styles.files}>
            <div className={styles.files_commands}>
                <AddFile/>
                <AddFolder/>
            </div> 
            <LayoutGroup>            
                <motion.div layout className={styles.folders}> 
                    {(createNewFolder && ('root' === currentFolderId)) && <CreateFolder />} 
                    {(createNewFile && ('root' === currentFolderId)) && <CreateFile/>} 
                    {
                        folders.map((folder) => {
                            const name = folder.name;
                            const id = folder.id;
                            const files = folder.files;
                            const folders = folder.folders;
         
                            return <Folder name={name} id={id} files={files} folders={folders}/>
                       })
                    }
                    {
                        files.map((file) => {
                            const name = file.name;
                            const id = file.id;
                            const extension = file.extension;
                            const content = file.content;

                            return <File name={name} id={id} extension={extension} content={content}/>
                        })
                    }
                </motion.div>
            </LayoutGroup>  
        </aside>
    )
}

export default FileManager;