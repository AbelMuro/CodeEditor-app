import React from 'react';
import Form from './Form';
import FileManager from './FileManager';
import * as styles from './styles.module.css';

function Editor() {
    return(
        <section className={styles.container}>
            <FileManager/>
            <Form/>
        </section>
    )
}

export default Editor;