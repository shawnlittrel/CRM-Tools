import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '../../utils/helpers';
import { SimpleGrid, Box } from '@chakra-ui/react';
import Login from './Login';
import Timecard from './Timecard';

function Home() {
     let isPageWide = useMediaQuery('(min-width: 800px)')

     if (isPageWide) {
          return(
               <Login />
          )
     }

     return (
          <div>
               <Timecard />
          </div>

          

     )
     
};

export default Home;