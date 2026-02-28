import React, {useState, ChangeEvent, SubmitEvent, useEffect, useRef} from 'react';
import {v4 as uuid} from 'uuid';
import { useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

function CreateFile() {
    const dispatch = useTypedDispatch();
    const inputRef = useRef<HTMLInputElement>(null);
    const [name, setName] = useState<string>('');

    const checkExtension = () => {
        const ext = name.split('.')[1];

        if(!ext || (!ext.includes('txt') && !ext.includes('js'))){
            dispatch({type: 'DISPLAY_FILE_INPUT', payload: false});
        }
    }

    const handleKey = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        if(keyPressed === 'Enter'){
            dispatch({type: 'ADD_FILE', payload: {name, id: uuid()}})
            dispatch({type: 'DISPLAY_FILE_INPUT', payload: false})
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setName(input);
    }

    const handleSubmit = (e : SubmitEvent) => {
        e.preventDefault();
    }

    const handleBlur = () => {
        if(!name) 
            dispatch({type: 'DISPLAY_FILE_INPUT', payload: false})
        else{
            dispatch({type: 'ADD_FILE', payload: {name, id: uuid()}})
            dispatch({type: 'DISPLAY_FILE_INPUT', payload: false})
        }
    }


    useEffect(() => {
        document.addEventListener('keydown', handleKey);

        return () => {
            document.removeEventListener('keydown', handleKey)
        }
    }, [name])

    useEffect(() => {
        inputRef.current.focus();
    }, [])
    

    return(
        <form className={styles.form} onSubmit={handleSubmit}>
            <input 
                type='text' 
                className={styles.input}
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={inputRef}
                />
        </form>
    )
}

export default CreateFile;