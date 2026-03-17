import React, { useEffect, useMemo, memo} from 'react';
import {ChangeStyles} from '~/Common/Functions';
import File from './File';
import CreateFolder from './CreateFolder';
import CreateFile from './CreateFile';
import {useTypedDispatch, useTypedSelector} from '~/Store';
import {motion, useCycle} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';

type File = {name: string, extension: string, content: string, id: string}
type Folder = {name: string, id: string, files: Array<File>, folders: Array<Folder>}

type Props = {
    name: string,
    id: string,
    files: Array<File>,
    folders: Array<Folder>,
}

function Folder({name, id, files, folders} : Props) {
    const [isOpen, setOpen] = useCycle(false, true);
    const dispatch = useTypedDispatch();
    const displayFolderInput = useTypedSelector(state => state.folderManagement.displayFolderInput);
    const currentFolderId = useTypedSelector(state => state.folderManagement.currentFolder);
    const displayFileInput = useTypedSelector(state => state.folderManagement.displayFileInput);
    const selected = useTypedSelector(state => state.folderManagement.selected);
    const theme = useTypedSelector(state => state.theme.theme);

    const handleOpen = () => {
        dispatch({type: 'CHANGE_SELECTED', payload: {id}})
        setOpen();
    }

    const allFolders = useMemo(() => {
        return folders.map((folder) => {
            const name = folder.name;
            const id = folder.id;
            const folders = folder.folders;
            const files = folder.files;
            return (<Folder name={name} id={id} folders={folders} files={files}/>)
        }) 
    }, [folders]);

    const allFiles = useMemo(() => {
        return files.map((file) => {
                const name = file.name;
                const extension = file.extension;
                const id = file.id;
                return (<File name={name} id={id} extension={extension}/>)
            })
    }, [files])

    useEffect(() => {
        if(isOpen)
            dispatch({type: 'CHANGE_CURRENT_FOLDER', payload: {folderId: id}});
        
    }, [isOpen])

    return(
        <section className={styles.folder}>                     
                <div 
                    className={ChangeStyles(theme, 'folder_header', styles)} 
                    onClick={handleOpen} 
                    style={selected === id ? {backgroundColor: '#ffffff33'} : {}}>
                        <motion.img 
                            layout
                            key={name}
                            className={styles.arrow} 
                            src={icons['arrow']}
                            initial={false}
                            animate={isOpen ? {rotate: '90deg'} : {rotate: '0deg'}}
                            />
                        {name}                    
                </div>
                {
                    (isOpen && (allFolders.length > 0 || allFiles.length > 0)) && 
                        <div className={styles.folder_content}>                       
                            {allFolders}
                            {allFiles}  
                        </div>
                }
                {
                    (displayFolderInput && (id === currentFolderId)) &&
                        <div className={styles.add_content}>
                            <CreateFolder/>
                        </div>
                }
                {
                    (displayFileInput && (id === currentFolderId)) &&
                        <div className={styles.add_content}>
                            <CreateFile/>
                        </div>
                }   
        </section>                  
    )
}

export default memo(Folder);