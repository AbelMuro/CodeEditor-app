import React, {ChangeEvent, useRef, useEffect, useState, useDeferredValue} from 'react';
import LineNumbers from '~/Common/Components/LineNumbers';
import {ChangeStyles} from '~/Common/Functions';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

type Props = {
    content: string,
    currentFileId: string
}


function PlainTextArea({content, currentFileId} : Props) {
    const [text, setText] = useState<string>(content);
    const deferredCode = useDeferredValue(text, '1000');
    const theme = useTypedSelector(state => state.theme.theme);
    const dispatch = useTypedDispatch();
    const textareaRef = useRef<HTMLTextAreaElement>(null);

    const handleText = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setText(input);
        dispatch({
            type: 'CHANGES_SAVED',
            payload: {
                saved: false
            }
        })
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
            if(text[i] === '\n'){
                lineBefore = text.slice(i + 1, selectionStart + 2);
                break;
            }
        }

        for(let i = 0; i < lineBefore.length; i++){
            if(lineBefore[i] === ' ' || lineBefore[i] === '\t')
                indent += lineBefore[i];
            else
                break;
        }


        let newCode : string | Array<string> = text.split('');
        newCode.splice(selectionEnd, 0, `\n${indent}`);
        const newStart : number = selectionEnd + indent.length + 1;

        setText(newCode.join(''));

        requestAnimationFrame(() => {
            textareaRef.current.setSelectionRange(newStart, newStart);
        })
    }

    const handleTab = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        if(keyPressed !== 'Tab') return;
        e.preventDefault();
        const {selectionStart, selectionEnd} = textareaRef.current;

        let before : string = text.slice(0, selectionStart);
        let linesToTab : string | Array<string> = text.slice(selectionStart, selectionEnd).split('\n');
        let after : string = text.slice(selectionEnd, text.length);
        const tab = '\t';

        linesToTab = linesToTab.map((line) => {
            return tab + line;
        }).join('\n');  

        const newStart = selectionEnd + linesToTab.length;
        setText(before + linesToTab + after);

        requestAnimationFrame(() => {
            textareaRef.current.setSelectionRange(newStart, newStart);
        })
    }

    useEffect(() => {
        textareaRef.current.addEventListener('keydown', handleKeyboard);

        return () => {
            textareaRef.current?.removeEventListener('keydown', handleKeyboard);
        }
    }, [text])

    useEffect(() => {
        dispatch({
            type: 'UPDATE_FILE_CONTENT',
            payload: {content: deferredCode, id: currentFileId}
        });
    }, [deferredCode])


    return(
        <section className={styles.container}>
            <LineNumbers code={text}/>
            <textarea 
                ref={textareaRef}
                value={text}
                className={ChangeStyles(theme, 'textarea', styles)}
                onChange={handleText}
            />            
        </section>

    )
}

export default PlainTextArea;