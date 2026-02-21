import React from 'react';
import {motion} from 'framer-motion';
import * as styles from './styles.module.css';

type Props = {
    name: string,
    extension: string,
    content: string
}

function File({name, extension, content} : Props) {
    return(
        <motion.div layout className={styles.file}>
            {`${name}.${extension}`}
        </motion.div>
    )
}

export default File;