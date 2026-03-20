import React, {memo} from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import {ChangeStyles} from '~/Common/Functions'
import * as styles from './styles.module.css';

function Tabs() {
    const dispatch = useTypedDispatch();
    const theme = useTypedSelector(state => state.theme.theme);
    const openFiles = useTypedSelector(state => state.folderManagement.openFiles);
    const allFiles = useTypedSelector(state => state.folderManagement.allFiles);

    const handleTab = (id: string) => {
        dispatch({type: 'CHANGE_CURRENT_FILE', payload: {id}});
    }

    return(
        <div className={ChangeStyles(theme, 'tabs', styles)}>
            {
                openFiles?.map((file) => {
                    const id = file;
                    const currentFile = allFiles.filter((file) => file.id === id)[0];
                    console.log(currentFile);
                    const name = currentFile.name;
                    const extension = currentFile.extension;

                    return (
                        <div className={ChangeStyles(theme, 'tab', styles)} onClick={() => handleTab(id)}>
                            {`${name}.${extension}`}
                        </div>
                    )
                })
            }
        </div>
    )
}

export default memo(Tabs);