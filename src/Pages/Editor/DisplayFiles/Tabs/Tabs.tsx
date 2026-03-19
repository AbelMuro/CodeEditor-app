import React from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import {ChangeStyles} from '~/Common/Functions'
import * as styles from './styles.module.css';

function Tabs() {
    const dispatch = useTypedDispatch();
    const theme = useTypedSelector(state => state.theme.theme);
    const openFiles = useTypedSelector(state => state.folderManagement.openFiles);

    const handleTab = (id: string) => {
        dispatch({type: 'CHANGE_CURRENT_FILE', payload: {id}})
    }

    return(
        <div className={ChangeStyles(theme, 'tabs', styles)}>
            {
                openFiles?.map((file) => {
                    const name = file.name;
                    const extension = file.extension;
                    const id = file.id;

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

export default Tabs;