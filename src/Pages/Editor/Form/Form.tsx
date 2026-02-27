import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import * as styles from './styles.module.css';

function Form(){
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const [code, setCode] = useState<string>('');

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
        const tab = '    ';

        for(let i = startLine; i <= endLine; i++){
            lines[i] = '\t' + lines[i];
        }

        setCode(lines.join('\n'));
        textareaRef.current.selectionStart = selectionStart + 1; 
        textareaRef.current.selectionEnd = selectionEnd + (endLine - startLine + 1);
    }

    useEffect(() => {
        textareaRef.current.addEventListener('keydown', handleTab);

        return () => {
            textareaRef.current.removeEventListener('keydown', handleTab);
        }
    }, [code])

    return(
        <form className={styles.form}>
            <textarea 
                className={styles.textarea}
                value={code}
                onChange={handleChange}
                ref={textareaRef}
                />
        </form>
    )
}

export default Form;