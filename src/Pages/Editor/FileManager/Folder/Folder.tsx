import React, { ReactElement } from 'react';
import {motion, useCycle, LayoutGroup} from 'framer-motion';
import icons from './icons';
import * as styles from './styles.module.css';

type Props = {
    name: string,
    children: ReactElement
}

function Folder({name, children} : Props) {
    const [isOpen, setOpen] = useCycle(false, true);

    const handleOpen = () => {
        setOpen();
    }

    return(
            <motion.section
                layout
                className={styles.folder}
                onClick={handleOpen}
                >
                    <motion.div layout className={styles.folder_header}>
                        <motion.img 
                            layout
                            key={name}
                            className={styles.arrow} 
                            src={icons['arrow']}
                            initial={false}
                            animate={isOpen ? {rotate: '90deg'} : {rotate: '0deg'}}
                            />
                        {name}                    
                    </motion.div>

                    {
                        isOpen && 
                        <motion.div layout className={styles.fake_content}>

                        </motion.div>
                    }
            </motion.section>            
    )
}

export default Folder;