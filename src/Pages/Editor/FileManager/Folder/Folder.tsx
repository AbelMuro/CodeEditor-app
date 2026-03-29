import React, { useEffect, useMemo, memo} from 'react';
import {useDrag, useDrop} from 'react-dnd';
import {ChangeStyles} from '~/Common/Functions';
import File from './File';
import CreateFolder from './CreateFolder';
import CreateFile from './CreateFile';
import {useTypedDispatch, useTypedSelector} from '~/Store';
import FolderContextMenu from './FolderContextMenu';
import {motion} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';

type File = {name: string, extension: string, content: string, id: string};
type Folder = {name: string, id: string, files: Array<string>, folders: Array<string>};

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
    const [{isDragging}, drag] = useDrag({
        type: 'folder',
        item: () => ({
            id,
            type: 'folder'
        }),
        isDragging: (monitor) => {
            const item = monitor.getItem();
            return item.id === id
        },
        canDrag: () => {
            return true;
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })
    
    const [collect, drop] = useDrop({
        accept: ['file', 'folder'],
        collect: (monitor) => ({
            handlerId: monitor.getHandlerId(),
        }),
        hover: (item, monitor) => {
            dispatch({type: 'OPEN_FOLDER', payload: {id, open: true}})
        },
        canDrop: (item, monitor) => {
            return true;
        },
        drop: (item : {id: string, type: string}, monitor) => {
            const type = item.type;
            if(type === 'file'){
                const fileId = item.id;
                dispatch({type: 'CHANGE_FILE', payload: {fileId, destinationFolder: id}})
            }
                
            else if(type === 'folder'){
                const folderIdToBeMoved = item.id;
                dispatch({type: 'CHANGE_FOLDER', payload: {folderIdToBeMoved, destinationFolder: id}});
            }
                
        }
    }) 

    const handleOpen = () => {
        dispatch({type: 'CHANGE_SELECTED', payload: {id}})
        dispatch({type: 'OPEN_FOLDER', payload: {id, open: !open}})
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
        <section 
            key={id}
            className={styles.folder}
            ref={(ref) => {drag(drop(ref))}}
            style={isDragging ? {opacity: 0} : {}}
            >                   
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