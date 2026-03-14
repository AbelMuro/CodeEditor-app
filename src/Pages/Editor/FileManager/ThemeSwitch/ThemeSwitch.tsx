import React from 'react';
import { ChangeStyles } from '~/Common/Functions';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';


function ThemeSwitch() {
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();

    const handleTheme = () => {
        dispatch({type: 'SWITCH_THEME'});
    }

    return(
        <button className={ChangeStyles(theme, 'container', styles)} onClick={handleTheme}>
            <motion.div
                className={ChangeStyles(theme, 'dot', styles)}
                initial={false}
                animate={theme === 'dark' ? {x: 0} : {x: 18}}
                 />
        </button>
    )
}

export default ThemeSwitch;