import React from 'react';
import {useMediaQuery} from '~/Common/Hooks';
import MobileNavigationBar from './MobileNavigationBar';
import { useNavigate } from 'react-router-dom';
import * as styles from './styles.module.css';

function NavigationBar() {
    const navigate = useNavigate();
    const [mobile] = useMediaQuery('(max-width: 540px)');

    const handleLink = (link : string) => {
        navigate(link);
    }

    return mobile ? <MobileNavigationBar handleLink={handleLink}/> : (
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