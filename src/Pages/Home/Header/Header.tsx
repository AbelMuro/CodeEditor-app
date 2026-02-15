import React from 'react';
import images from './images';
import * as styles from './styles.module.css';

function Header() {
    return(
        <header className={styles.header}>
            <section className={styles.header_content}>
                <h1 className={styles.header_intro}>
                    Code Editor, 
                </h1>
                <h2 className={styles.header_desc_one}>
                    A developer's best friend.
                </h2>
                <h3 className={styles.header_desc_two}>
                    Experience code editing on a whole different level.
                </h3>
            </section>
            <section className={styles.header_images}>
                <img className={styles.header_image_laptop} src={images['laptop']}/>
                <img className={styles.header_image_mobile} src={images['mobile']}/>                
            </section>

        </header>
    )
}

export default Header;