import React from 'react';
import Split from 'react-split'
import {useTypedSelector} from '~/Store'
import TextArea from './TextArea';
import FileManager from './FileManager';
import NoFileSelected from './NoFileSelected';
import * as styles from './styles.module.css';

function Editor() {
    const currentFile = useTypedSelector(state => state.folderManagement.currentFile);

    return(
        <Split 
            sizes={[30, 70]} 
            minSize={[10, 10]}
            gutterSize={10} 
            cursor="col-resize"
            direction='horizontal'
            className={styles.container}
            >
                <FileManager/>
                {currentFile ? <TextArea file={currentFile}/> : <NoFileSelected />}
        </Split>
    )
}

export default Editor;