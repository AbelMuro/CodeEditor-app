import React, {useEffect, useMemo} from 'react';
import Line from './Lines';
import * as styles from './styles.module.css';

type Props = {
    code: string;
}

function HighlightErrors({code}: Props) {

    const Lines = useMemo(() => {
        return code.split('\n').map((line, i) => {
                return <Line key={i} line={line}/>
            })  
    }, [code])


    return (
        <article className={styles.highlight_errors}>
            {
                Lines
            }
        </article>
    )
}

export default HighlightErrors;