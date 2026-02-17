import React from 'react';
import * as styles from './styles.module.css';

function ShootingStars() {
    return(
        <svg className={styles.container}>
            <line 
                x1="160" 
                x2="350" 
                y1="10" 
                y2="190" 
                strokeLinecap='round'     
                stroke="white" 
                stroke-width="2"/>
        </svg>
    )
}

export default ShootingStars;