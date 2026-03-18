import React, {useEffect} from 'react';
import Split from 'react-split'
import { useMediaQuery } from '~/Hooks';
import {useTypedSelector} from '~/Store'
import DisplayFile from './DisplayFile';
import FileManager from './FileManager';
import NoFileSelected from './NoFileSelected';
import {ChangeStyles} from '~/Common/Functions';
import { useBlockNavigation } from '~/Common/Hooks';
import * as styles from './styles.module.css';
import icons from './icons';
import './global.css';

function Editor() {
    const currentFile = useTypedSelector(state => state.folderManagement.currentFile);
    const theme = useTypedSelector(state => state.theme.theme);
    const [mobile] = useMediaQuery('(max-width: 530px)');
    const blocker = useBlockNavigation(true);

    useEffect(() => {
        const gutterElement = document.querySelector('.gutter');
        const gutterIconHorizontal = document.querySelector('.gutter.gutter-horizontal');
        const gutterIconVertical = document.querySelector('.gutter.gutter-vertical');       

        if(theme === 'dark'){
            gutterElement.style.backgroundColor = 'rgb(19, 19, 19)';
            if(gutterIconHorizontal)
                gutterIconHorizontal.style.backgroundImage = `url(${icons['darkHandle']})`;
            if(gutterIconVertical)
                gutterIconVertical.style.backgroundImage = `url(${icons['darkHandle']})`;
        }
            
        else{
            gutterElement.style.backgroundColor = 'rgb(199, 199, 199)';
            if(gutterIconHorizontal)
                gutterIconHorizontal.style.backgroundImage = `url(${icons['lightHandle']})`;
            if(gutterIconVertical)
                gutterIconVertical.style.backgroundImage = `url(${icons['lightHandle']})`
        }
            
    }, [theme, mobile])


    return(
        <Split 
            key={mobile ? 'vertical' : 'horizontal'}
            sizes={[30, 70]} 
            minSize={[10, 10]}
            gutterSize={10} 
            cursor={mobile ? "row-resize" : "col-resize"}
            direction={mobile ? 'vertical' : 'horizontal'}
            className={ChangeStyles(theme, 'container', styles)}
            >
                <FileManager/>
                {currentFile ? <DisplayFile /> : <NoFileSelected />}
        </Split>
    )
}

export default Editor;