import React, {ChangeEvent, useState, SubmitEvent, useEffect, useRef} from 'react';
import {v4 as uuid} from 'uuid';
import icons from '../icons';
import {useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

function CreateFolder() {
    const [name, setName] = useState<string>('');
    const dispatch = useTypedDispatch();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleKey = (e: KeyboardEvent) => {
        const keyPressed = e.key;

        if(keyPressed === 'Enter'){
            dispatch({type: 'ADD_FOLDER', payload: {name, id: uuid()}})
            dispatch({type: 'CREATE_FOLDER', payload: false})
        }
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
    };

    const handleSubmit = (e : SubmitEvent) => {
        e.preventDefault();
    }

    const handleBlur = () => {
        if(!name) 
            dispatch({type: 'CREATE_FOLDER', payload: false})
        else{
            dispatch({type: 'ADD_FOLDER', payload: {name, id: uuid()}})
            dispatch({type: 'CREATE_FOLDER', payload: false})
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
            <img className={styles.arrow} src={icons['arrow']}/>
            <input 
                className={styles.input}
                type='text'
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={inputRef}
                required
                />
        </form>
    )
}

export default CreateFolder;