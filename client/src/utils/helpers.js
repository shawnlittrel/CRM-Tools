import { useState, useEffect } from 'react';


//determine which site to return based on size of user's screen
export function useMediaQuery(query) {
     //set state for window size
     const [matches, setMatches] = useState(false);

     //run useEffect when matches or query changes
     useEffect(() => {
          const media = window.matchMedia(query);

          if (media.matches !== matches) {
               setMatches(media.matches);
          }

          //keep state in sync with window size changes
          const listener = () => {
               setMatches(media.matches);
          };

          media.addListener(listener);
          return () => media.removeListener(listener);
     }, [matches, query]);

     return matches;
}