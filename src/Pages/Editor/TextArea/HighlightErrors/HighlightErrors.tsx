import React from 'react';
import Line from './Lines';
import * as styles from './styles.module.css';

type Props = {
    code: string;
}


function HighlightErrors({code}: Props) {

    return (
        <article className={styles.highlight_errors}>
            {
                code.split('\n').map((line) => {
                    return <Line line={line}/>
                })    
            }
        </article>
    )
}

export default HighlightErrors;