import React from 'react';
import * as styles from './styles.module.css';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";


function HighlightSyntax({code}) {
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


    return(
        <article className={styles.highlight_syntax}>
            <SyntaxHighlighter language='javascript' customStyle={containerStyles} style={myTheme}>
                {code}
            </SyntaxHighlighter>
        </article>

    )
}

export default HighlightSyntax;