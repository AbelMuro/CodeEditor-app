import React from 'react';
import * as styles from './styles.module.css';

type Props = {
    name: string,
    extension: string,
    content: string
}

function File({name, extension, content} : Props) {
    return(
        <div className={styles.file}>
            {`${name}.${extension}`}
        </div>
    )
}

export default File;