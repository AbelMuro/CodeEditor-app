import React, {memo} from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import {ChangeStyles} from '~/Common/Functions'
import * as styles from './styles.module.css';


function Tabs() {
    const dispatch = useTypedDispatch();
    const theme = useTypedSelector(state => state.theme.theme);
    const openFiles = useTypedSelector(state => state.folderManagement.openFiles);
    const allFiles = useTypedSelector(state => state.folderManagement.allFiles);
    const currentFileId = useTypedSelector(state => state.folderManagement.currentFile);

    const handleTab = (id: string) => {
        dispatch({type: 'CHANGE_CURRENT_FILE', payload: {id}});
        dispatch({type: 'CHANGE_SELECTED', payload: {id}})
    }

    const selectedStyles = (fileId: string) : string => {
        if(currentFileId === fileId)
            return styles.selected
        else
            return '';
    }


    return(
        <div className={ChangeStyles(theme, 'tabs', styles)}>
            {
                openFiles?.map((file) => {
                    const id = file;
                    const currentFile = allFiles[id];
                    const name = currentFile.name;
                    const extension = currentFile.extension;

                    return (
                        <div 
                            className={[ChangeStyles(theme, 'tab', styles), selectedStyles(id)].join(' ')} 
                            onClick={() => handleTab(id)}>
                                {`${name}.${extension}`}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default memo(Tabs);