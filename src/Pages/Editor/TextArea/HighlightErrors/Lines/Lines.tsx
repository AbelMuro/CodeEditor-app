import React, {useEffect, useState, MouseEvent} from 'react';
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

    const handleClick = (e: MouseEvent) => {
        const textarea = document.getElementById('textarea');
        textarea?.focus();
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

    return (
        <p 
            onClick={handleClick}
            title={error ? error.reason : ''} 
            style={error ? {position: 'relative', zIndex: 100, pointerEvents: 'all'} : {}}
            className={error ? [styles.line, styles.error].join(' ') : styles.line}>
                {line}
        </p>
    );
}

export default Lines;