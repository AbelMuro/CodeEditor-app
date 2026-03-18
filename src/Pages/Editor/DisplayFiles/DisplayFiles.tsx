import React from 'react';
import JavascriptTextArea from './JavascriptTextArea';
import { useTypedSelector } from '~/Store';
import PlainTextArea from './PlainTextArea';
import * as styles from './styles.module.css';

function DisplayFiles(){
    const file = useTypedSelector(state => state.folderManagement.currentFile);
    const extension = file.extension;

    return (
        <section className={styles.container}>
            

            {
              extension === 'js' ? <JavascriptTextArea/> : <PlainTextArea/>  
            }
        </section>
    )
}

export default DisplayFiles;