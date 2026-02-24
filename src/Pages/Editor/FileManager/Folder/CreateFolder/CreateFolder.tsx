import React, {ChangeEvent, useState} from 'react';
import { useTypedSelector, useTypedDispatch } from '~/Store';
import * as styles from './styles.module.css';

type Props = {
    directory: Array<string>
}

function CreateFolder({directory} : Props) {
    const [name, setName] = useState<string>('');
    const dispatch = useTypedDispatch();
    const open = useTypedSelector<boolean>(state => state.folderManagement.creatingFolder)
    const currentDirectory = useTypedSelector<Array<string>>(state => state.folderManagement.currentDirectory);

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setName(value);
    };

    const handleBlur = () => {
        if(!name) 
            dispatch({type: 'CREATE_FOLDER', payload: false})
        else
            dispatch({type: 'ADD_FOLDER', payload: {name}})
        
    }

    return (open && (currentDirectory.join('/') === directory.join('/'))) && (
        <form className={styles.form}>
            <input 
                className={styles.input}
                type='text'
                value={name}
                onChange={handleChange}
                onBlur={handleBlur}
                required
                />
        </form>
    )
}

export default CreateFolder;