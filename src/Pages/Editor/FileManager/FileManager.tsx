import React, {useEffect} from 'react';
import CreateFolder from './Folder/CreateFolder';
import CreateFile from './Folder/CreateFile';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import Folder from './Folder';
import File from './Folder/File';
import AddFileButton from './AddFileButton';
import AddFolderButton from './AddFolderButton';
import SaveButton from './SaveButton';
import ThemeSwitch from './ThemeSwitch';
import {ChangeStyles} from '~/Common/Functions';
import * as styles from './styles.module.css';

function FileManager() {
    const theme = useTypedSelector(state => state.theme.theme);
    const folders = useTypedSelector(state => state.folderManagement.allFolders.folders);
    const files = useTypedSelector(state => state.folderManagement.allFolders.files);
    const displayFolderInput = useTypedSelector(state => state.folderManagement.displayFolderInput);
    const displayFileInput = useTypedSelector(state => state.folderManagement.displayFileInput);
    const currentFolderId = useTypedSelector(state => state.folderManagement.currentFolder);
    const dispatch = useTypedDispatch();

    const handleClick = (e: MouseEvent) => {
        const element = e.target as HTMLElement;

        if(element.classList.contains(styles.folders))
            dispatch({type: 'CHANGE_CURRENT_FOLDER', payload: {folderId: 'root'}});           
    }

    useEffect(() => {
        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
            <section className={ChangeStyles(theme, 'files', styles)}>
                <div className={styles.files_commands}>
                    <div className={styles.file_buttons}>
                        <AddFileButton/>
                        <AddFolderButton/>                        
                    </div>
                    <div className={styles.file_misc}>
                        <SaveButton/>
                        <ThemeSwitch/>                        
                    </div>

                </div>          
                <div className={ChangeStyles(theme, 'folders', styles)}> 
                    {(displayFolderInput && ('root' === currentFolderId)) ? <CreateFolder/> : <></>} 
                    {(displayFileInput && ('root' === currentFolderId)) ? <CreateFile/> : <></>} 
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
                                const content = file.content

                                return <File name={name} id={id} extension={extension} content={content}/>
                            })
                        }                
                </div>                
            </section>
    )
}

export default FileManager;