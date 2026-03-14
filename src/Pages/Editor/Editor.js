import React, {useEffect} from 'react';
import Split from 'react-split'
import { useMediaQuery } from '~/Hooks';
import {useTypedSelector} from '~/Store'
import TextArea from './TextArea';
import FileManager from './FileManager';
import NoFileSelected from './NoFileSelected';
import * as styles from './styles.module.css';
import icons from './icons';
import './global.css';

function Editor() {
    const currentFile = useTypedSelector(state => state.folderManagement.currentFile);
    const theme = useTypedSelector(state => state.theme.theme);
    const [mobile] = useMediaQuery('(max-width: 530px)');

    useEffect(() => {
        const gutterElement = document.querySelector('.gutter');
        const gutterIconHorizontal = document.querySelector('.gutter.gutter-horizontal');
        const gutterIconVertical = document.querySelector('.gutter.gutter-vertical');       

        if(theme === 'dark'){
            gutterElement.style.backgroundColor = 'rgb(19, 19, 19)';
            gutterIconHorizontal.style.backgroundImage = `url(${icons['darkHandle']})`;
            gutterIconVertical.style.backgroundImage = `url(${icons['darkHandle']})`;
        }
            
        else{
            gutterElement.style.backgroundColor = 'rgb(199, 199, 199)';
            gutterIconHorizontal.style.backgroundImage = `url(${icons['lightHandle']})`;
            gutterIconVertical.style.backgroundImage = `url(${icons['lightHandle']})`
        }
            
    }, [theme])


    return(
        <Split 
            key={mobile ? 'vertical' : 'horizontal'}
            sizes={[30, 70]} 
            minSize={[10, 10]}
            gutterSize={10} 
            cursor={mobile ? "row-resize" : "col-resize"}
            direction={mobile ? 'vertical' : 'horizontal'}
            className={styles.container}
            >
                <FileManager/>
                {currentFile ? <TextArea file={currentFile}/> : <NoFileSelected />}
        </Split>
    )
}

export default Editor;