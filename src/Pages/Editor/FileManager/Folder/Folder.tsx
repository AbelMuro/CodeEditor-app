import React, { useEffect} from 'react';
import File from './File';
import { useDispatch } from 'react-redux';
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
    const dispatch = useDispatch();

    const handleOpen = () => {
        setOpen();
    }

    useEffect(() => {
        if(isOpen){
            dispatch({type: 'CHANGE_DIRECTORY', payload: {directory, name}});
        }
            
    }, [isOpen])

    return(
            <motion.section
                layout
                className={styles.folder}
                onClick={handleOpen}
                >
                    <motion.div layout className={styles.folder_header}>
                        <motion.img 
                            layout
                            key={name}
                            className={styles.arrow} 
                            src={icons['arrow']}
                            initial={false}
                            animate={isOpen ? {rotate: '90deg'} : {rotate: '0deg'}}
                            />
                        {name}                    
                    </motion.div>
                    <motion.div layout className={styles.folder_content}>
                        {
                            isOpen && 
                                folders.map((folder) => {
                                    const name = folder.name;
                                    const directory = folder.directory;
                                    const folders = folder.folders;
                                    const files = folder.files;
                                    return (<Folder name={name} directory={directory} folders={folders} files={files}/>)
                                }) 
                        }
                        {
                            isOpen && 
                                files.map((file) => {
                                    const name = file.name;
                                    const extension = file.extension;
                                    const content = file.content;
                                    return (<File name={name} extension={extension} content={content}/>)
                                })
                        }

                    </motion.div>

            </motion.section>            
    )
}

export default Folder;