import React, {ChangeEvent, useState, useEffect, useRef} from 'react';
import * as styles from './styles.module.css';

const fullCode = `
        import React, {useState} from 'react';
        import AllProjects from './AllProjects';
        import {useScroll, useMotionValueEvent, AnimatePresence} from 'framer-motion';
        import * as styles from './styles.module.css';


        function ProjectSection() {
            const [mount, setMount] = useState(false);
            const {scrollY} = useScroll();

            useMotionValueEvent(scrollY, 'change', (value) => {
                if(value < 17800)
                    setMount(false);
                else
                    setMount(true);
            });


            return(
                <AnimatePresence>
                    {
                        mount &&
                            <article className={styles.container}>
                                <AllProjects />
                            </article>
                    }
                </AnimatePresence>
            )
        }

        export default ProjectSection;
`

function Header() {
    const [code, setCode] = useState('');
    const index = useRef<number>(0)

    const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const input = e.target.value;
        setCode(input);
    }


    useEffect(() => {
        const interval = setInterval(() => {
            setCode((prevCode) => {
                if(!fullCode[index.current]){
                    clearInterval(interval);
                    return;
                }
                else
                    return prevCode + fullCode[index.current++];
            })
        }, 15)
    }, [])

    return(
        <header className={styles.header}>
            <textarea
                className={styles.textarea}
                value={code}
                onChange={handleChange}
            />
        </header>
    )
}

export default Header;