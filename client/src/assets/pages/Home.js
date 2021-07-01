import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '../../utils/helpers';
import { SimpleGrid, Box } from '@chakra-ui/react';
import Login from './Login';
import Timecard from './Timecard';
import Calendar from  '../components/Calendar';
import Clients from './Clients';
import Workorder from './WorkOrder';
import Resolution from './Resolution';

function Home() {
     let isPageWide = useMediaQuery('(min-width: 800px)')

     if (isPageWide) {
          return(
               //<Login />
               //<Calendar />
               //<Clients />
               //<Workorder />
               <Resolution />
          )
     }

     return (
          <div>
               
               <Calendar />
          </div>

          

     )
     
};

export default Home;