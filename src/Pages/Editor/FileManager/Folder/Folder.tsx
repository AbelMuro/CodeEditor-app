import React, { useEffect, useMemo} from 'react';
import File from './File';
import CreateFolder from './CreateFolder';
import {useTypedDispatch} from '~/Store';
import {motion, useCycle} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';

type File = {name: string, extension: string, content: string}
type Folder = {name: string, directory: Array<string>, files: Array<File>, folders: Array<Folder>}

type Props = {
    name: string,
    files: Array<File>,
    folders: Array<Folder>,
    directory: Array<string>,
}

function Folder({name, files, folders, directory} : Props) {
    const [isOpen, setOpen] = useCycle(false, true);
    const dispatch = useTypedDispatch();

    const handleOpen = () => {
        setOpen();
    }

    const allFolders = useMemo(() => {
        return folders.map((folder) => {
            const name = folder.name;
            const directory = folder.directory;
            const folders = folder.folders;
            const files = folder.files;
            return (<Folder name={name} directory={directory} folders={folders} files={files}/>)
        }) 
    }, [folders]);

    const allFiles = useMemo(() => {
        return files.map((file) => {
                const name = file.name;
                const extension = file.extension;
                const content = file.content;
                return (<File name={name} extension={extension} content={content}/>)
            })
    }, [files])

    useEffect(() => {
        if(isOpen)
            dispatch({type: 'CHANGE_DIRECTORY', payload: {directory, name}});
        
    }, [isOpen])

    return(
        <section className={styles.folder}>                     
                <div className={styles.folder_header} onClick={handleOpen}>
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
                <CreateFolder directory={directory}/>  
        </section>                  
    )
}

export default Folder;