import React from 'react';
import JavascriptTextArea from './JavascriptTextArea';
import Tabs from './Tabs';
import { useTypedSelector } from '~/Store';
import PlainTextArea from './PlainTextArea';
import * as styles from './styles.module.css';

function DisplayFiles(){
    const currentFile = useTypedSelector(state => state.folderManagement.currentFile);

    return (
        <section className={styles.container}>
            <Tabs/>
            {
              currentFile.extension === 'js' ? <JavascriptTextArea/> : <PlainTextArea/>  
            }
        </section>
    )
}

export default DisplayFiles;