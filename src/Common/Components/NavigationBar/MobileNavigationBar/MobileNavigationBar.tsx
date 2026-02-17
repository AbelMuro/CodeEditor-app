import React from 'react';
import {motion, useCycle} from 'framer-motion';
import icons from '~/Common/icons';
import * as styles from './styles.module.css';

type Props = {
    handleLink: Function
}

function MobileNavigationBar({handleLink} : Props) {
    const [open, setOpen] = useCycle(true, false);

    const handleOpen = () => {
        setOpen();
    }

    const handleClick = (link : string) => {
        handleLink(link)
        setOpen();
    }


    return(
        <motion.nav 
            initial={false}
            animate={open ? {height: '80px', borderBottomLeftRadius: '100%'} : {height: '300px', borderBottomLeftRadius: '0%'}}
            className={styles.navbar}>
            <button className={styles.navbar_button} onClick={handleOpen}>
                <img className={styles.navbar_icon} src={icons['menu']}/>
            </button>
            <ul className={styles.navbar_links}>
                <li onClick={() => handleClick('/')}>
                    Home
                </li>
                <li onClick={() => handleClick('/editor')}>
                    Editor
                </li>
                <li onClick={() => handleClick('/editor')}>
                    Docs
                </li>
                <li onClick={() => handleClick('/editor')}>
                    Contact Us
                </li>
            </ul>
        </motion.nav>
    )
}

export default MobileNavigationBar;