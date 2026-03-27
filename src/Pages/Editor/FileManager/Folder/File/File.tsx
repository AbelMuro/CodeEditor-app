import React from 'react';
import FileContextMenu from './FileContextMenu';
import { ChangeStyles } from '~/Common/Functions';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import * as styles from './styles.module.css';

type Props = {
    id: string,
}

function File({id} : Props) {
    const file = useTypedSelector(state => state.folderManagement.allFiles[id]);
    const selected = useTypedSelector(state => state.folderManagement.selected);
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        dispatch({type: 'CHANGE_SELECTED', payload: {id}});
        dispatch({type: 'CHANGE_CURRENT_FILE', payload: {id}});
        dispatch({type: 'ADD_FILE_TO_OPEN_FILES', payload: {id}});
    }

    return(
        <FileContextMenu
            id={id}
            Header={({handleRightClick}) => {
                return (
                    <div 
                        onContextMenu={handleRightClick}
                        onClick={handleClick}
                        className={ChangeStyles(theme, 'file', styles)} 
                        style={selected === id ? {backgroundColor: '#ffffff33'} : {}}>
                        {`${file.name}.${file.extension}`}
                    </div>                    
                )
            }}
        />

    )
}

export default File;