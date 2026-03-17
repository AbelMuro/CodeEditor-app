import React from 'react';
import { ChangeStyles } from '~/Common/Functions';
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
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        if(!changesSaved){
            const result = confirm('Changes have not been saved, are you sure you wish to proceed?');
            if(!result) return;
        }
        dispatch({
            type: 'CHANGES_SAVED',
            payload: {
                saved: true
            }
        })
        dispatch({type: 'CHANGE_SELECTED', payload: {id}});
        dispatch({type: 'CHANGE_CURRENT_FILE', payload: {id}});
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