import React from 'react';
import { useTypedSelector } from '~/Store';
import {ChangeStyles} from '~/Common/Functions';
import * as styles from './styles.module.css';

function NoFileSelected(){
    const theme = useTypedSelector(state => state.theme.theme);

    return(
        <section className={ChangeStyles(theme, 'container', styles)}>
            <h1 className={ChangeStyles(theme, 'title', styles)}>
                Welcome To Web Studio Code.
            </h1>
            <h2 className={ChangeStyles(theme, 'desc', styles)}>
                Start by creating a file.
            </h2>
        </section>
    )
}

export default NoFileSelected;