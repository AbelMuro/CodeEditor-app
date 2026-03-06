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

    const handleEnter = (e : KeyboardEvent) => {
        const pressedKey = e.key;

        if(pressedKey !== 'Enter') return;
        e.preventDefault();
        const {selectionStart, selectionEnd} = textareaRef.current;
        let lineBefore = '';
        let indent = '';

        for(let i = selectionStart; i >= 0; i--){
            if(code[i] === '\n'){
                console.log(selectionStart, i);
                lineBefore = code.slice(i + 1, selectionStart + 2);
                break;
            }
        }
        console.log(lineBefore);

        for(let i = 0; i < lineBefore.length; i++){
            if(lineBefore[i] === ' ' || lineBefore[i] === '\t')
                indent += lineBefore[i];
            else
                break;
        }


        let newCode : string | Array<string> = code.split('');
        newCode.splice(selectionEnd, 0, `\n${indent}`);
        const newStart : number = selectionEnd + indent.length + 1;

        setCode(newCode.join(''));

        requestAnimationFrame(() => {
            textareaRef.current.setSelectionRange(newStart, newStart);
        })
    }


    const handleTab = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        if(keyPressed !== 'Tab') return;
        e.preventDefault();
        const {selectionStart, selectionEnd} = textareaRef.current;

        let before : string = code.slice(0, selectionStart);
        let linesToTab : string | Array<string> = code.slice(selectionStart, selectionEnd).split('\n');
        let after : string = code.slice(selectionEnd, code.length);
        const tab = '\t';

        linesToTab = linesToTab.map((line) => {
            return tab + line;
        }).join('\n');  

        const newStart = selectionEnd + linesToTab.length;
        setCode(before + linesToTab + after);

        requestAnimationFrame(() => {
            textareaRef.current.setSelectionRange(newStart, newStart);
        })
        
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