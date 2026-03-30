import React, {useEffect, useMemo, useState} from 'react';
import {parse, isParseError} from 'meriyah';
import * as acornLoose from 'acorn-loose';
import * as styles from './styles.module.css';

type Props = {
    code: string;
}

type Error = {
    message: string,
    reason: string,
    line: number
}

function HighlightErrors({code}: Props) {
    const [nodes, setNodes] = useState<Array<{start: number, end: number}>>([]);
    const [syntax, setSyntax] = useState<string>(code);

    const getNodes = async () => {
        try{
            const result = acornLoose.parse(code, {
                ecmaVersion: "latest"
            });
            setNodes(result.body.map(node => ({start: node.start, end: node.end})));
        }
        catch(error){ 
            const message = error.message;
            console.log(message);
        }
    }

    const syntaxError = (node : string) : boolean => {
        try{
            parse(node, {
                next: true,
                jsx: true,
                module: true,
            });

            return false

        }
        catch(error){
            if(isParseError(error)){
                const message = error.message;
                const reason = error.description;
            }
            else{
                const message = error.message;
                console.log(message);
            }

            return true;
        }
    }

    useEffect(() => {
        const nodes = async () => {
            setSyntax(code);
            await getNodes();            
        };
        nodes();

    }, [code])


    useEffect(() => {
        nodes.forEach(node => {
            const currentSlice = syntax.slice(node.start, node.end);
            if(syntaxError(currentSlice)){
                const beforeError = code.slice(0, node.start);
                const afterError = code.slice(node.end, code.length);
                setSyntax(`${beforeError} ${<span className={styles.error}>{currentSlice}</span>}${afterError}`)
            }
        })
    }, [nodes])



    return (
        <article className={styles.highlight_errors}>
            {syntax}
        </article>
    )
}

export default HighlightErrors;