import React from 'react';
import Split from 'react-split'
import { useMediaQuery } from '~/Hooks';
import {useTypedSelector} from '~/Store'
import TextArea from './TextArea';
import FileManager from './FileManager';
import NoFileSelected from './NoFileSelected';
import * as styles from './styles.module.css';
import './global.css';

function Editor() {
    const currentFile = useTypedSelector(state => state.folderManagement.currentFile);
    const [mobile] = useMediaQuery('(max-width: 530px)');

    return(
        <Split 
            key={mobile ? 'vertical' : 'horizontal'}
            sizes={[30, 70]} 
            minSize={[10, 10]}
            gutterSize={10} 
            cursor={mobile ? "row-resize" : "col-resize"}
            direction={mobile ? 'vertical' : 'horizontal'}
            className={styles.container}
            >
                <FileManager/>
                {currentFile ? <TextArea file={currentFile}/> : <NoFileSelected />}
        </Split>
    )
}

export default Editor;