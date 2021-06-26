import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '../utils/helpers';

function Home() {
     let isPageWide = useMediaQuery('(min-width: 800px)')

     if (isPageWide) {
          return(
               <div>
                    Desktop
               </div>
          )
     }

     return (
          <div>
               Mobile
          </div>
     )
     
};

export default Home;