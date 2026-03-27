import React, {ComponentType, MouseEventHandler, useState, useEffect} from 'react';
import RenameFile from './RenameFile';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import {ChangeStyles} from '~/Common/Functions';
import * as styles from './styles.module.css';

type Props = {
    id: string, 
    Header : ComponentType<{handleRightClick : MouseEventHandler<HTMLDivElement>} >
}

function FileContextMenu({Header, id}: Props){
    const [open, setOpen] = useState<{x: number, y: number}>(null);
    const [rename, setRename] = useState<boolean>(false);
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();


    const handleDelete = () => {
        dispatch({type: 'DELETE_FILE', payload: {id}})
    }

    const handleRename = () => {
        setRename(!rename);
    }

    const handleContextMenu = () => {
        setOpen(null);
    }

    const handleRightClick : MouseEventHandler<HTMLDivElement> = (e) => {
        e.preventDefault();
        const x = e.clientX;
        const y = e.clientY;
        setOpen({x, y});
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

    return (
        <>
            {
                open && 
                    <div className={ChangeStyles(theme, 'file_menu', styles)} style={{top: open.y, left: open.x}}>
                            <li>
                                <button className={ChangeStyles(theme, 'file_menu_button', styles)} onClick={handleDelete}>
                                    Delete
                                </button>
                                <button className={ChangeStyles(theme, 'file_menu_button', styles)} onClick={handleRename}>
                                    Rename
                                </button>
                            </li>
                    </div>
            }
            {
                rename ? <RenameFile id={id} setRename={setRename}/> : 
                <Header handleRightClick={handleRightClick}/>
            }
            
        </>
    )
}

export default FileContextMenu;