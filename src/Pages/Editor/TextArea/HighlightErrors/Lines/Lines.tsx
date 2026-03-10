import React, {useEffect, useState, useRef} from 'react';
import {parse, isParseError} from 'meriyah';
import * as styles from './styles.module.css';

type Props = {
    line: string,
}

type Error = {
    message: string,
    reason: string
}

function Lines({line} : Props) {
    const [error, setError] = useState<Error | null>(null);
    const lineElement = useRef<HTMLParagraphElement>(null);

    const mousemove = (e : MouseEvent) => {
        const top = document.elementFromPoint(e.clientX, e.clientY);
        console.log(top);

        if (top.contains(lineElement.current)) {
            console.log("Mouse is over the p element (even if covered)");
        }
    }

    const validate = () => {
        try{
            parse(line, {
                next: true,
                jsx: true,
                module: true,
            });
            setError(null);
        }
        catch(error){ 
            if(isParseError(error)){
                const newError : Error = {
                    message: error.message,
                    reason: error.description
                }
                setError(newError);               
            }
            else{
                const message = error.message;
                console.log(message);
            }
        }
    }

    useEffect(() => {
        validate();
    }, [line])

    useEffect(() => {
        document.addEventListener('mousemove', mousemove);
    }, [])


    return (
        <p 
            ref={lineElement}
            title={error ? error.reason : ''} 
            className={error ? [styles.line, styles.error].join(' ') : styles.line}>
                {line}
        </p>
    );
}

export default Lines;