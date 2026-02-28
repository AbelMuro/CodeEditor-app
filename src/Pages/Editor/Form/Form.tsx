import React, {ChangeEvent, useEffect, useRef, useState} from 'react';
import * as styles from './styles.module.css';

function Form(){
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null)
    const [code, setCode] = useState<string>('');

    const handleHighlight = () => {
        const words = code.split(' ');

        return words.map((word) => {
            if(word === 'function')
                return (
                    <span className={styles.keyword}>
                        function
                    </span>
                )
            else
                return word;
        })
    }

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

    return(
        <div className={styles.editor}>
            <textarea 
                className={styles.textarea}
                value={code}
                onChange={handleChange}
                ref={textareaRef}
                />
                <div className={styles.highlight_layer} ref={highlightRef}>
                    {handleHighlight()}
                </div>
        </div>
    )
}

export default Form;