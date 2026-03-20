import React, {useEffect, useState} from 'react';
import JavascriptTextArea from './JavascriptTextArea';
import Tabs from './Tabs';
import { useTypedSelector } from '~/Store';
import PlainTextArea from './PlainTextArea';
import * as styles from './styles.module.css';

type File = {
    name: string,
    extension: string,
    content: string,
    id: string
}


function DisplayFiles(){
    const currentFileId = useTypedSelector(state => state.folderManagement.currentFile);
    const allFiles = useTypedSelector(state => state.folderManagement.allFiles);
    const [file, setFile] = useState<File>(null);

    useEffect(() => {
        const file = allFiles.filter((file) => file.id === currentFileId);
        setFile(file[0]);
    }, [currentFileId])

    return (
        <section className={styles.container}>
            <Tabs/>
            {
              file?.extension === 'js' ? <JavascriptTextArea content={file.content} currentFileId={file.id}/> : <PlainTextArea content={file.content} currentFileId={file.id}/>  
            }
        </section>
    )
}

export default DisplayFiles;