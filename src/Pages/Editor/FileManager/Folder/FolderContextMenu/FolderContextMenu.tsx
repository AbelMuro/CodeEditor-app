import React, {useState, useEffect, MouseEventHandler, ComponentType} from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import RenameFolder from './RenameFolder';
import {ChangeStyles} from '~/Common/Functions';
import * as styles from './styles.module.css';

type Props = {
    id: string,
    Header: ComponentType<{handleRightClick: MouseEventHandler<HTMLDivElement>}>
}

function FolderContextMenu({Header, id} : Props) {
    const [open, setOpen] = useState<{x: number, y: number}>(null);
    const theme = useTypedSelector(state => state.theme.theme);
    const [rename, setRename] = useState<boolean>(false);
    const dispatch = useTypedDispatch();


    const handleRightClick : MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        setOpen({x: e.clientX, y: e.clientY});
    }

    const handleDelete = () => {
        dispatch({type: 'DELETE_FOLDER', payload: {id}});
    }

    const handleRename = () => {
        setRename(!rename);
    }

    const handleContextMenu = () => {
        setOpen(null);
    }

    useEffect(() => {
        if(open)
            document.addEventListener('click', handleContextMenu);
        else
            document.removeEventListener('click', handleContextMenu);

        return () => {
            document.removeEventListener('click', handleContextMenu);
        }


    }, [open]);

    return <>
            {
                open && 
                    <ul className={ChangeStyles(theme, 'folder_menu', styles)} 
                        style={{top: open.y, left: open.x}}>
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

            {

                rename ? 
                    <RenameFolder id={id} setRename={setRename}/> : 
                    <Header handleRightClick={handleRightClick}/>
            }
                
            </>
}

export default FolderContextMenu;