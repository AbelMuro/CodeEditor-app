import {useEffect} from 'react';
import { useTypedSelector } from '~/Store';
import { useBlocker } from 'react-router-dom';


function useBlockNavigation(shouldBlock : boolean) {
    const block = useBlocker(shouldBlock);
    const changesSaved = useTypedSelector(state => state.folderManagement.changesSaved);

    useEffect(() => {
        if(block.state !== 'blocked') return;
        if(changesSaved){
            block.proceed();
            return;
        }
        
        const confirmed = confirm('You have unsaved changes, are you sure you wish to leave?');

        if(confirmed)
            block.proceed();
        else
            block.reset();

    }, [block.state, changesSaved])

    return block;
}

export default useBlockNavigation;