import React from 'react';
import FileManager from './FileManager';
import * as styles from './styles.module.css';

function Editor() {
    return(
        <section className={styles.container}>
            <FileManager/>

            <form className={styles.form}>

            </form>
        </section>
    )
}

export default Editor;