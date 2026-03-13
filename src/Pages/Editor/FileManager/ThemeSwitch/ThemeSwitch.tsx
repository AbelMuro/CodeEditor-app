import React from 'react';
import {useTypedSelector, useTypedDispatch} from '~/Store';
import {motion, useCycle} from 'framer-motion';
import * as styles from './styles.module.css';

//    const [theme, setTheme] = useCycle({x: 0}, {x: 18});

function ThemeSwitch() {
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();

    const handleTheme = () => {
        dispatch({type: 'SWITCH_THEME'});
    }

    return(
        <button className={styles.container} onClick={handleTheme}>
            <motion.div
                className={styles.dot}
                initial={false}
                animate={theme === 'dark' ? {x: 0} : {x: 18}}
                 />
        </button>
    )
}

export default ThemeSwitch;