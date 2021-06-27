import React, { useState, useEffect } from 'react';
import { useMediaQuery } from '../../utils/helpers';
import { SimpleGrid, Box } from '@chakra-ui/react';
import Footer from '../components/FooterNav'

function Home() {
     let isPageWide = useMediaQuery('(min-width: 800px)')

     if (isPageWide) {
          return(
               <Box bg="brand.300">
                    Desktop
               </Box>
          )
     }

     return (
          <div>
               Mobile
          </div>

          

     )
     
};

export default Home;