import React from 'react';
import { ChangeStyles } from '~/Common/Functions';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import icons from './icons';
import * as styles from './styles.module.css';

function SaveButton() {
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();

    const handleClick = () => {
        dispatch({type: 'CHANGES_SAVED', payload: {saved: true}});
        dispatch({type: 'SAVE_FILE'});
    }

    return(
        <button className={ChangeStyles(theme, 'save', styles)} onClick={handleClick}>
            {
                theme === 'dark' ? 
                    <img className={styles.save_icon} src={icons['saveIconDark']}/> :
                    <img className={styles.save_icon} src={icons['saveIconLight']}/>}
        </button>
    )
}

export default SaveButton;