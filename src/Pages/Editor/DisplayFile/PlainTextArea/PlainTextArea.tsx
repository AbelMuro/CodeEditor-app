import React, {useState, ChangeEvent, useRef, useEffect} from 'react';
import LineNumbers from '~/Common/Components/LineNumbers';
import {ChangeStyles} from '~/Common/Functions';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

function PlainTextArea() {
    const file = useTypedSelector(state => state.folderManagement.currentFile);
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();
    const [code, setCode] = useState<string>(file.content);
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
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

        for(let i = selectionEnd - 1; i >= 0; i--){
            if(code[i] === '\n'){
                lineBefore = code.slice(i + 1, selectionStart + 2);
                break;
            }
        }

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
            textareaRef.current?.removeEventListener('keydown', handleKeyboard);
        }
    }, [code])

    useEffect(() => {
        dispatch({
            type: 'UPDATE_FILE_CONTENT',
            payload: {content: code}
        })
    }, [code])

    return(
        <section className={styles.container}>
            <LineNumbers code={code}/>
            <textarea 
                ref={textareaRef}
                value={code}
                className={ChangeStyles(theme, 'textarea', styles)}
                onChange={handleText}
            />            
        </section>

    )
}

export default PlainTextArea;