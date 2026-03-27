import React, {useState, useRef, useEffect, SubmitEvent, ChangeEvent} from 'react';
import { useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

type Props = {
    id: string,
    setRename : Function
}

function RenameFile({id, setRename} : Props) {
    const [name, setName] = useState<string>('');
    const inputRef = useRef<HTMLInputElement>(null);
    const dispatch = useTypedDispatch();

    const handleEnter = (e: KeyboardEvent) => {
        const key = e.key;

        if(key !== 'Enter') return;
        if(!name) {
            setRename(false);
            return;
        }
        else{
            dispatch({type: 'RENAME_FILE', payload: {id, name}})
            setRename(false);
        } 
    }

    const handleSubmit = (e: SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setName(input);
    }

    const handleBlur = () => {
        if(!name){
            setRename(false);
            return;
        } 
        else{
            dispatch({type: 'RENAME_FILE', payload: {id, name}});
            setRename(false);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleEnter);

        return () => {
            document.removeEventListener('keydown', handleEnter);
        }
    });

    useEffect(() => {
        inputRef.current.focus();
    }, [])

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <input 
                className={styles.input}
                type='text'
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                ref={inputRef}
                />
        </form>
    )
}

export default RenameFile;