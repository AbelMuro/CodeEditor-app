import React, { useEffect, useMemo, memo} from 'react';
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
    const createNewFolder = useTypedSelector(state => state.folderManagement.creatingFolder);
    const currentFolderId = useTypedSelector(state => state.folderManagement.currentFolder);
    const createNewFile = useTypedSelector(state => state.folderManagement.creatingFile);
    const selected = useTypedSelector(state => state.folderManagement.selected);

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
                const content = file.content;
                const id = file.id;
                return (<File name={name} id={id} extension={extension} content={content}/>)
            })
    }, [files])

    useEffect(() => {
        if(isOpen)
            dispatch({type: 'CHANGE_CURRENT_FOLDER', payload: {folderId: id}});
        
    }, [isOpen])

    return(
        <section className={styles.folder}>                     
                <div className={styles.folder_header} onClick={handleOpen} style={selected === id ? {backgroundColor: '#ffffff33'} : {}}>
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
                {(isOpen && (allFolders.length > 0 || allFiles.length > 0)) && 
                    <div className={styles.folder_content}>                       
                        {allFolders}
                        {allFiles}  
                    </div>}
                {(createNewFolder && (id === currentFolderId)) && <CreateFolder/>}  
                {(createNewFile && (id === currentFolderId)) && <CreateFile/>}
        </section>                  
    )
}

export default memo(Folder);