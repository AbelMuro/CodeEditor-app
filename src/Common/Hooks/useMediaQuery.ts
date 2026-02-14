import React, {useState, useEffect} from 'react';

function useMediaQuery(initialQuery : string){
    const [match, setMatch] = useState<boolean>(false);

    const handleMedia = (match : MediaQueryListEvent) => {
        setMatch(match.matches);
    }

    useEffect(() => {
        const media = window.matchMedia(initialQuery);
        setMatch(media.matches);
        media.addEventListener('change', handleMedia);

        return () => {
            media.removeEventListener('change', handleMedia);
        }
    }, [initialQuery])


    return [match];
}

export default useMediaQuery;