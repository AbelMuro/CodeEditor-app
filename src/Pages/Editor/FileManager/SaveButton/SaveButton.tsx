import React, {useMemo} from 'react';
import { ChangeStyles } from '~/Common/Functions';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function SaveButton() {
    const theme = useTypedSelector(state => state.theme.theme);
    const changesSaved = useTypedSelector(state => state.folderManagement.changesSaved);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        dispatch({type: 'CHANGES_SAVED', payload: {saved: true}});
        dispatch({type: 'SAVE_FILE'});
    }

    const savedStyles = useMemo(() => {
        return changesSaved ? {filter: 'opacity(30%)'} : {}
    }, [changesSaved]);

    return(
        <button className={ChangeStyles(theme, 'save', styles)} onClick={handleClick}>
            {
                theme === 'dark' ? 
                    <img className={styles.save_icon} style={savedStyles} src={icons['saveIconDark']}/> :
                    <img className={styles.save_icon} style={savedStyles} src={icons['saveIconLight']}/>}
        </button>
    )
}

export default SaveButton;