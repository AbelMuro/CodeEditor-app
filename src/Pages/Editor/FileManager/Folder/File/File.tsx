import React from 'react';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import * as styles from './styles.module.css';

type Props = {
    name: string,
    extension: string,
    content: string,
    id: string
}

function File({name, extension, id, content} : Props) {
    const selected = useTypedSelector(state => state.folderManagement.selected);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        dispatch({type: 'CHANGE_SELECTED', payload: {id}})
    }

    return(
        <div 
            onClick={handleClick}
            className={styles.file} 
            style={selected === id ? {backgroundColor: '#ffffff33'} : {}}>
            {`${name}.${extension}`}
        </div>
    )
}

export default File;