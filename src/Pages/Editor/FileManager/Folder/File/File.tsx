import React from 'react';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import * as styles from './styles.module.css';

type Props = {
    name: string,
    extension: string,
    id: string
}

function File({name, extension, id} : Props) {
    const selected = useTypedSelector(state => state.folderManagement.selected);
    const changesSaved = useTypedSelector(state => state.folderManagement.changesSaved);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        if(!changesSaved){
            const result = confirm('Changes have not been saved, are you sure you wish to proceed?');
            if(!result) return;
        }
        dispatch({type: 'CHANGE_SELECTED', payload: {id}});
        dispatch({type: 'CHANGE_CURRENT_FILE', payload: {id}});
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