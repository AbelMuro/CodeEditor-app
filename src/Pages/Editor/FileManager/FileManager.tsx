import React, {useRef, useEffect} from 'react';
import CreateFolder from './Folder/CreateFolder';
import CreateFile from './Folder/CreateFile';
import { useTypedSelector, useTypedDispatch } from '~/Store';
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
    const dispatch = useTypedDispatch();
    const foldersRef = useRef<HTMLDivElement>(null);

    const handleClick = (e: MouseEvent) => {
        const element = e.target as HTMLElement;

        if(element.classList.contains(styles.folders)){
            dispatch({type: 'CHANGE_CURRENT_FOLDER', payload: {folderId: 'root'}}); 
            dispatch({type: 'CHANGE_SELECTED', payload: {id: ''}});
        }
                
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <aside className={styles.files}>
            <div className={styles.files_commands}>
                <AddFile/>
                <AddFolder/>
            </div>          
            <div className={styles.folders} ref={foldersRef}> 
                {(createNewFolder && ('root' === currentFolderId)) && <CreateFolder/>} 
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
            </div>
        </aside>
    )
}

export default FileManager;