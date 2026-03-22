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
    const rootFolder = useTypedSelector(state => state.folderManagement.allFolders['root']);
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
                            rootFolder.folders.map((folderId) => {
                                return <Folder id={folderId} />
                            })
                        }
                        {
                            rootFolder.files.map((fileId) => {
                                return <File id={fileId}/>
                            })
                        }                
                </div>                
            </section>
    )
}

export default FileManager;