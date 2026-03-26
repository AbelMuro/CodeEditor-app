import React, { useEffect, useMemo, memo, MouseEvent, useState} from 'react';
import {ChangeStyles} from '~/Common/Functions';
import File from './File';
import CreateFolder from './CreateFolder';
import CreateFile from './CreateFile';
import {useTypedDispatch, useTypedSelector} from '~/Store';
import {motion} from 'framer-motion';
import RenameFolder from './RenameFolder';
import icons from './icons';
import * as styles from './styles.module.css';

type File = {name: string, extension: string, content: string, id: string}
type Folder = {name: string, id: string, files: Array<string>, folders: Array<string>}

type Props = {
    id: string,
}

function Folder({id} : Props) {
    const open = useTypedSelector(state => state.folderManagement.allFolders[id].open);
    const [openMenu, setOpenMenu] = useState<{x: number, y: number}>(null);
    const [rename, setRename] = useState<boolean>(false);
    const dispatch = useTypedDispatch();
    const folder = useTypedSelector(state => state.folderManagement.allFolders[id])
    const name = folder.name;
    const displayFolderInput = useTypedSelector(state => state.folderManagement.displayFolderInput);
    const currentFolderId = useTypedSelector(state => state.folderManagement.currentFolder);
    const displayFileInput = useTypedSelector(state => state.folderManagement.displayFileInput);
    const selected = useTypedSelector(state => state.folderManagement.selected);
    const theme = useTypedSelector(state => state.theme.theme);

    const handleOpen = () => {
        dispatch({type: 'CHANGE_SELECTED', payload: {id}})
        dispatch({type: 'OPEN_FOLDER', payload: {id}})
    }

    const handleRightClick = (e: MouseEvent) => {
        e.preventDefault();
        setOpenMenu({x: e.clientX, y: e.clientY});
    }

    const handleContextMenu = () => {
        setOpenMenu(null);
    }

    const handleDelete = () => {
        dispatch({type: 'DELETE_FOLDER', payload: {id}})
    }

    const handleRename = () => {
        setRename(!rename);
    }

    const folderNodes = useMemo(() => {
        const allFolders = folder.folders;
        return allFolders.map((folderId) => {
            return (<Folder id={folderId}/>)
        }) 
    }, [folder]);

    const fileNodes = useMemo(() => {
        const files = folder.files;
        return files.map((fileId) => {
                return (<File id={fileId}/>)
            })
    }, [folder])

    useEffect(() => {
        if(open)
            dispatch({type: 'CHANGE_CURRENT_FOLDER', payload: {folderId: id}});
        
    }, [open])

    useEffect(() => {
        if(openMenu)
            document.addEventListener('click', handleContextMenu);
        else
            document.removeEventListener('click', handleContextMenu);

        return () => {
            document.removeEventListener('click', handleContextMenu);
        }


    }, [openMenu]);

    useEffect(() => {
        return;
        if(rename)
            document.addEventListener('click', handleRename)
        else
            document.removeEventListener('click', handleRename);

        return () => {
            document.removeEventListener('click', handleRename)
        }
    }, [rename])

    return(
        <section className={styles.folder}>        
                {
                    openMenu && 
                        <ul className={ChangeStyles(theme, 'folder_menu', styles)} 
                            style={{top: openMenu.y, left: openMenu.x}}>
                                <li>
                                    <button className={ChangeStyles(theme, 'folder_menu_button', styles)} onClick={handleDelete}>
                                        Delete
                                    </button>
                                    <button className={ChangeStyles(theme, 'folder_menu_button', styles)} onClick={handleRename}>
                                        Rename
                                    </button>
                                </li>
                        </ul>
                }             
                {rename ? <RenameFolder/> : <div 
                    onContextMenu={handleRightClick}
                    className={ChangeStyles(theme, 'folder_header', styles)} 
                    onClick={handleOpen} 
                    style={selected === id ? {backgroundColor: '#ffffff33'} : {}}>
                        <motion.img 
                            layout
                            key={name}
                            className={styles.arrow} 
                            src={icons['arrow']}
                            initial={false}
                            animate={open ? {rotate: '90deg'} : {rotate: '0deg'}}
                            />
                        {name}                    
                </div>}
                {
                    (open && (folderNodes.length > 0 || fileNodes.length > 0)) && 
                        <div className={styles.folder_content}>                       
                            {folderNodes}
                            {fileNodes}  
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