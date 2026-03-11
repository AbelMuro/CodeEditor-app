import {useState, useEffect} from 'react';

function useMediaQuery(initialQuery) {
    const [matches, setMatches] = useState(false);

    const handleChange = (media) => {
        setMatches(media.matches);
    }

    useEffect(() => {   
        const media = window.matchMedia(initialQuery);
        setMatches(media.matches);
    
        media.addEventListener("change", handleChange);
        return () => {
            media.removeEventListener("change", handleChange);
        };
    }, [initialQuery]);

    return [matches];
}

export default useMediaQuery;