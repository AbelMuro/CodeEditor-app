import React, {useState, useEffect, useRef} from 'react';
import * as styles from './styles.module.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import * as acorn from 'acorn';

type Props = {
    code: string
}
type Error = {
    message: string | null,
    line: number | null,
    column: number | null
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
    const [error, setError] = useState<Error>({message: null, line: null, column: null});
    const lines = useRef(1);

    const validate = () => {
        try{
            acorn.parse(code , {ecmaVersion: 'latest'});
            setError({message: null, line: null, column: null })
        }
        catch(error){
            setError({
                message: error.message,
                line: error.loc.line,
                column: error.loc.column
            });
        }
    }

    useEffect(() => {
        validate();
    }, [code])


    return(
        <article className={styles.highlight_syntax}>
            <SyntaxHighlighter 
                wrapLines
                lineProps={(line) => {
                    return {
                       id: `${line}`
                    }
                }}
                language='javascript' 
                customStyle={containerStyles} 
                style={myTheme}>
                    {code}
            </SyntaxHighlighter>
        </article>

    )
}

export default HighlightSyntax;