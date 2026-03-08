import React, {useState, useEffect, useRef} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import {parse, isParseError} from 'meriyah';
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as styles from './styles.module.css';
import './global.css';

type Props = {
    code: string
}

type Error = {
    message: string,
    line: number | null,
    reason: string
}

const containerStyles = {
    padding: '0px',
    margin: '0px',
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
    fontFamily: 'SnPro',
    fontSize: '1.5rem',
    fontWeight: '500',
    lineHeight: '140%',
    letterSpacing: '0px',
}

const myTheme = { 
    ...oneDark,
    'code[class*="language-"]': { 
        fontFamily: 'SnPro',
        fontSize: '1.5rem',
        fontWeight: '500',
        lineHeight: '140%',
        letterSpacing: '0px',
    }, 
    'pre[class*="language-"]': { 
        fontFamily: 'SnPro',
        fontSize: '1.5rem',
        fontWeight: '500',
        lineHeight: '140%',
        letterSpacing: '0px',
    }, 
};

function HighlightSyntax({code} : Props) {
    const [errors, setErrors] = useState<Array<Error>>([]);
    const codeRef = useRef<HTMLElement | null>(null);

    const validate = () => {
        try{
            parse(code, {
                next: true,
                jsx: true,
                module: true,
            });
        }
        catch(error){ 
            if(isParseError(error)){
                const newError : Error = {
                    message: error.message,
                    line: error.loc.start.line,
                    reason: error.description
                }
                setErrors([...errors, newError]);               
            }
            else{
                const message = error.message;
                console.log(message);
            }
        }
    }

    useEffect(() => {
        const codeElement = document.querySelector('code');
        codeRef.current = codeElement;
    }, [])

    useEffect(() => {
        validate();
    }, [code])

    useEffect(() => {
        const codeElement = codeRef.current;
        const lineElements = codeElement.children;
        for(let i = 0; i < lineElements.length; i++)
            lineElements[i].setAttribute('id', `${i + 1}`);
    }, [code])

    useEffect(() => {
        console.log(errors);
    }, [errors])


    useEffect(() => {
        if(!errors.length){
            const allLineElements = codeRef.current.children;
            for(let i = 0; i < allLineElements.length; i++){
                allLineElements[i].setAttribute('style', '');
                allLineElements[i].setAttribute('title', '');
            }
            return;
        }

        errors.forEach((error) => {
            const lineElement = codeRef.current.children[error.line - 1];
            lineElement.setAttribute('style', `text-decoration-line: underline`) 
            lineElement.setAttribute('title', error.message);            
        })


    }, [errors])


    return(
        <article className={styles.highlight_syntax}>
            <SyntaxHighlighter 
                wrapLines
                language='javascript' 
                customStyle={containerStyles} 
                style={myTheme}>
                    {code}
            </SyntaxHighlighter>
        </article>

    )
}

export default HighlightSyntax;