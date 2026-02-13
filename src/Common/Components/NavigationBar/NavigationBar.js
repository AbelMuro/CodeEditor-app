import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles.module.css';

function NavigationBar() {
    const navigate = useNavigate();
    let vawr = 123;
    vawr;

    const handleLink = (link) => {
        navigate(link)
    }

    return(
        <nav className={styles.navbar}>
            <ul className={styles.navbar_links}>
                <li onClick={() => handleLink('/')}>
                    Home
                </li>
                <li onClick={() => handleLink('/editor')}>
                    Editor
                </li>
                <li onClick={() => handleLink('/editor')}>
                    Docs
                </li>
                <li onClick={() => handleLink('/editor')}>
                    Contact Us
                </li>
            </ul>
        </nav>
    )
}

export default NavigationBar;