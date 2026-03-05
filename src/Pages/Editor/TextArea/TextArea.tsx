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

    const handleKeyboard = (e : KeyboardEvent) => {
        handleTab(e);
        handleEnter(e);
    }

    const handleEnter = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        if(keyPressed !== 'Enter') return;
        e.preventDefault();

        const {selectionEnd} = textareaRef.current;
        const newCode = code.split('');
        newCode.splice(selectionEnd, 0, '\n')
        const lines : Array<string> = code.split('\n');
        const lastLine : Array<string> = lines[lines.length - 1].split('');
        let indent = '';

        for(let i = 0; i < lastLine.length; i++){
            if(lastLine[i] === ' ' || lastLine[i] === '\t')
                indent += lastLine[i];
            else
                break;
        }
        newCode.splice(selectionEnd, 0, indent);
        setCode(newCode.join(''));
    }

    const handleTab = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        if(keyPressed !== 'Tab') return;
        e.preventDefault();
        const {selectionStart, selectionEnd} = textareaRef.current;

        let textBeforeTab : string = code.slice(0, selectionStart);
        let linesToTab : string | Array<string> = code.slice(selectionStart, selectionEnd).split('\n');
        let textAfterTab : string = code.slice(selectionEnd, code.length);
        const tab = '    ';

        linesToTab = linesToTab.map((line) => {
            return tab + line;
        }).join('\n');  

        setCode(textBeforeTab + linesToTab + textAfterTab);
        textareaRef.current.setSelectionRange(selectionEnd, selectionEnd);
    }

    useEffect(() => {
        textareaRef.current.addEventListener('keydown', handleKeyboard);

        return () => {
            textareaRef.current.removeEventListener('keydown', handleKeyboard);
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