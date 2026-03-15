import React, {ChangeEvent, useEffect, useRef} from 'react';
import { useTypedDispatch, useTypedSelector} from '~/Store';
import HighlightSyntax from './HighlightSyntax';
import LineNumbers from '~/Common/Components/LineNumbers';
import HighlightErrors from './HighlightErrors';
import {ChangeStyles} from '~/Common/Functions';
import * as styles from './styles.module.css';


function JavascriptTextArea(){
    const code = useTypedSelector(state => state.folderManagement.currentFile.content);
    const theme = useTypedSelector(state => state.theme.theme);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const dispatch = useTypedDispatch();

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        dispatch({
            type: 'UPDATE_FILE_CONTENT',
            payload: {content: input}
        });
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

        dispatch({
            type: 'UPDATE_FILE_CONTENT',
            payload: {content: newCode.join('')}
        });

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

        dispatch({
            type: 'UPDATE_FILE_CONTENT',
            payload: {content: before + linesToTab + after}
        });

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
        if(!code) return;
        
        dispatch({
            type: 'CHANGES_SAVED',
            payload: {
                saved: false
            }
        })
    }, [code])


    return(
        <div className={styles.container}>
            <LineNumbers code={code}/>
            <HighlightErrors code={code} />            
            <textarea 
                id="textarea"
                className={ChangeStyles(theme, 'textarea', styles)}
                value={code}
                onChange={handleChange}
                ref={textareaRef}
                />
            <HighlightSyntax code={code}/>

        </div>
    )
}

export default JavascriptTextArea;