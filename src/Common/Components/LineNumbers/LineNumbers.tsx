import React from 'react';
import * as styles from './styles.module.css';

type Props = {
    code: string
}

function LineNumbers({code} : Props) {
    return(
        <div className={styles.line_numbers}>
            {
                code.split('\n').map((_, i) => {
                    return <span> {i + 1}</span>;
                })  
            }
        </div>
    )
}

export default LineNumbers;