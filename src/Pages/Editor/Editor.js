import React from 'react';
import {useTypedSelector} from '~/Store'
import TextArea from './TextArea';
import FileManager from './FileManager';
import * as styles from './styles.module.css';

function Editor() {
    const currentFile = useTypedSelector(state => state.folderManagement.currentFile);

    return(
        <section className={styles.container}>
            <FileManager/>
            {currentFile && <TextArea file={currentFile}/>}
        </section>
    )
}

export default Editor;