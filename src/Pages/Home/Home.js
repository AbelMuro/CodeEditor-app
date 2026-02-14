import React from 'react';
import Header from './Header';
import * as styles from './styles.module.css';

function Home() {
    return(
        <section className={styles.container}>
            <Header/>
        </section>
    )
}

export default Home;