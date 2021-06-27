import { Box, SimpleGrid } from '@chakra-ui/react'
import * as React from 'react'
import { Icon } from '@chakra-ui/react';
import { AiFillHome, AiOutlineCalendar, AiOutlineClockCircle } from 'react-icons/ai';
import Auth from '../../../utils/auth';

function Footer() {

     if(Auth.loggedIn) {
           return (
          <Box
          as="footer"
          role="contentinfo"
          mx="auto"
          h="10%"
        >
          <SimpleGrid 
               as="footer"
               columns={3}  
               display="flex"
               alignItems="center"
               className="colorPrimary"
               justifyContent="space-around"
               bg="brand.100"
               color="brand.200"
               spacingX="10px"
          >
             <Icon as={AiOutlineCalendar} />
             <Icon as={AiFillHome} />
             <Icon as={AiOutlineClockCircle} />

          </SimpleGrid>
        </Box>
      )
     }
     else return (
          <>
          </>
     )
};

export default Footer;

