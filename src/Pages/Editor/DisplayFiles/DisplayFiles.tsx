import React, {useEffect, useState, useMemo} from 'react';
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

    const TextArea = useMemo(() => {
        if(!file) return <></>;

        if(file.extension === 'js')
            return <JavascriptTextArea content={file.content} currentFileId={file.id}/>
        else 
            return <PlainTextArea content={file.content} currentFileId={file.id}/>
    },[file])

    useEffect(() => {
        const file = allFiles[currentFileId];
        setFile(file);
    }, [currentFileId, allFiles])

    return (
        <section className={styles.container}>
            <Tabs/>
            {TextArea}
        </section>
    )
}

export default DisplayFiles;