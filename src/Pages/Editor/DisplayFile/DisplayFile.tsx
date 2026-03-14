import React from 'react';
import JavascriptTextArea from './JavascriptTextArea';
import { useTypedSelector } from '~/Store';
import PlainTextArea from './PlainTextArea';

function DisplayFile(){
    const file = useTypedSelector(state => state.folderManagement.currentFile);
    const extension = file.extension;

    return extension === 'js' ? <JavascriptTextArea/> : <PlainTextArea/>
}

export default DisplayFile;