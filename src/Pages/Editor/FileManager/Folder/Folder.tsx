import React, { useEffect, useMemo, memo, MouseEvent, useState, MouseEventHandler} from 'react';
import {ChangeStyles} from '~/Common/Functions';
import File from './File';
import CreateFolder from './CreateFolder';
import CreateFile from './CreateFile';
import {useTypedDispatch, useTypedSelector} from '~/Store';
import FolderContextMenu from './FolderContextMenu';
import {motion} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';

type File = {name: string, extension: string, content: string, id: string}
type Folder = {name: string, id: string, files: Array<string>, folders: Array<string>}

type Props = {
    id: string,
}

function Folder({id} : Props) {
    const open = useTypedSelector(state => state.folderManagement.allFolders[id].open);
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



    return(
        <section className={styles.folder}>                   
                <FolderContextMenu 
                    id={id}
                    Header={({handleRightClick}) => {
                        return (
                            <div onContextMenu={handleRightClick}
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
                            </div>                         
                        )
                    }}
                />
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