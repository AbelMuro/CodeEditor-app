import React, {useMemo} from 'react';
import {useDrag} from 'react-dnd';
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
    const [{isDragging}, drag] = useDrag({
        type: 'file',
        item: () => ({
            id,
            type: 'file'
        }),
        isDragging: (monitor) => {
            const item = monitor.getItem();
            return item.id === id
        },
        canDrag: () => {
            return true;
        },
        collect: (monitor) => ({
            isDragging: monitor.isDragging()
        })
    })

    const handleClick = () => {
        dispatch({type: 'CHANGE_SELECTED', payload: {id}});
        dispatch({type: 'CHANGE_CURRENT_FILE', payload: {id}});
        dispatch({type: 'ADD_FILE_TO_OPEN_FILES', payload: {id}});
    }

    const fileStyles = useMemo(() => {
        if(isDragging)
            return {opacity: 0};
        else if(selected === id)
            return {backgroundColor: '#ffffff33'}
        else 
            return {}
    }, [isDragging, selected])

    return(
        <FileContextMenu
            id={id}
            Header={({handleRightClick}) => {
                return (
                    <div 
                        onContextMenu={handleRightClick}
                        onClick={handleClick}
                        className={ChangeStyles(theme, 'file', styles)} 
                        style={fileStyles}
                        ref={(ref) => {drag(ref)}}>
                        {`${file.name}.${file.extension}`}
                    </div>                    
                )
            }}
        />

    )
}

export default File;