import React from 'react';
import * as styles from './styles.module.css';

function NoFileSelected(){
    return(
        <section className={styles.container}>
            <h1 className={styles.title}>
                Welcome To Web Studio Code.
            </h1>
            <h2 className={styles.desc}>
                Start by creating a file.
            </h2>
        </section>
    )
}

export default NoFileSelected;