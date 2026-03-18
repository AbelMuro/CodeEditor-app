import React, {useMemo} from 'react';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { oneDark, oneLight} from "react-syntax-highlighter/dist/esm/styles/prism";
import * as styles from './styles.module.css';
import { useTypedSelector } from '~/Store';

type Props = {
    code: string,
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


function HighlightSyntax({code} : Props) {
    const theme = useTypedSelector(state => state.theme.theme);

    const syntaxTheme = useMemo(() => {
        return {
            ...oneDark,
            'code[class*="language-"]': { 
                fontFamily: 'SnPro',
                fontSize: '1.5rem',
                fontWeight: '500',
                lineHeight: '140%',
                letterSpacing: '0px',
                ...(theme === 'dark' ? {color: 'white'} : {color: 'black'}),
            }, 
            'pre[class*="language-"]': { 
                fontFamily: 'SnPro',
                fontSize: '1.5rem',
                fontWeight: '500',
                lineHeight: '140%',
                letterSpacing: '0px',
                 ...(theme === 'dark' ? {color: 'white'} : {color: 'black'}),
            }, 
        }
    }, [theme])



    return(
        <article className={styles.highlight_syntax}>
            <SyntaxHighlighter 
                key={theme}
                wrapLines={true}
                language='javascript' 
                customStyle={containerStyles} 
                style={syntaxTheme}>
                    {code}
            </SyntaxHighlighter> 
        </article>

    )
}

export default HighlightSyntax;