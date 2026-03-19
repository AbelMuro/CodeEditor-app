import React from 'react';
import { ChangeStyles } from '~/Common/Functions';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import * as styles from './styles.module.css';

type Props = {
    name: string,
    extension: string,
    id: string,
    content: string
}

function File({name, extension, id, content} : Props) {
    const selected = useTypedSelector(state => state.folderManagement.selected);
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        dispatch({type: 'CHANGE_SELECTED', payload: {id}});
        dispatch({type: 'CHANGE_CURRENT_FILE', payload: {id}});
        dispatch({type: 'ADD_FILE_TO_OPEN_FILES', payload: {file: {name, extension, id, content}}})
    }

    return(
        <div 
            onClick={handleClick}
            className={ChangeStyles(theme, 'file', styles)} 
            style={selected === id ? {backgroundColor: '#ffffff33'} : {}}>
            {`${name}.${extension}`}
        </div>
    )
}

export default File;