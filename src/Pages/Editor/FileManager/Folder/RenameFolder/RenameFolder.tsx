import React, {useState, ChangeEvent} from 'react';
import icons from '../icons';
import * as styles from './styles.module.css';

function RenameFolder() {
    const [name, setName] = useState<string>('');


    const handleSubmit = () => {

    }

    const handleChange = (e : ChangeEvent<HTMLInputElement>) => {
        const input = e.target.value;
        setName(input);
    }

    const handleBlur = () => {

    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <img className={styles.arrow} src={icons['arrow']}/>
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

export default RenameFolder;