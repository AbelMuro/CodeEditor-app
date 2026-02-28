import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import { useTypedDispatch} from '~/Store';
import HighlightSyntax from './HighlightSyntax';
import * as styles from './styles.module.css';

type File = {
    name : string,
    extension: string,
    content: string,
}

type Props = {
    file: File | null
}

function TextArea({file} : Props){
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [code, setCode] = useState<string>(file.content);
    const dispatch = useTypedDispatch();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setCode(input);
    }

    const handleTab = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        if(keyPressed !== 'Tab') return;
        e.preventDefault();
        const {selectionStart, selectionEnd} = textareaRef.current;

        const lines = code.split('\n');
        const startLine = code.slice(0, selectionStart).split('\n').length - 1; 
        const endLine = code.slice(0, selectionEnd).split('\n').length - 1;
        const tab = '\t';

        for(let i = startLine; i <= endLine; i++){
            lines[i] = tab + lines[i];
        }

        setCode(lines.join('\n'));
        textareaRef.current.selectionStart = selectionEnd - 3; 
    }

    useEffect(() => {
        textareaRef.current.addEventListener('keydown', handleTab);

        return () => {
            textareaRef.current.removeEventListener('keydown', handleTab);
        }
    }, [code])

    useEffect(() => {
        dispatch({
            type: 'UPDATE_FILE_CONTENT',
            payload: {content: code}
        })
    }, [code])

    return(
        <div className={styles.editor}>
            <div className={styles.line_numbers}>
                {
                    code.split('\n').map((_, i) => {
                        return <span> {i + 1}</span>;
                    })  
                }
            </div>
            <textarea 
                className={styles.textarea}
                value={code}
                onChange={handleChange}
                ref={textareaRef}
                />
            <HighlightSyntax code={code}/>
        </div>
    )
}

export default TextArea;