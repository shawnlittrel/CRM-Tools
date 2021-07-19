import React, { useState, useEffect } from "react";
import { useMediaQuery } from "../../utils/helpers";
import { Grid, Box, Button, GridItem, Text } from "@chakra-ui/react";
import Login from "./Login";
import Timecard from "./Timecard";
import Calendar from "./Calendar";
import Clients from "./Clients";
import Workorder from "./WorkOrder";
import Resolution from "./Resolution";
import {ReactComponent as Shield } from '../images/shield.svg';
import Auth from '../../utils/auth';
import SideNav from '../components/SideNav';

//temp imports
import AddClient from '../pages/AddClient';
import AddEmployee from '../pages/AddEmployee';
import EditClient from '../pages/EditClient';
import EditEmployee from '../pages/EditEmployee';

function Home() {
 let isPageWide = useMediaQuery('(min-width: 800px)')

  const loggedIn = Auth.loggedIn();
  const handleClick= event => {
       window.location.replace(event.target.value)
  }

  

  if(loggedIn) {
    if (isPageWide) {
          return(
              <EditClient />
          )
      }


    return (
      <Grid
        style={{ height: "90vh", margin: 0, padding: 0 }}
        gap={4}
        templateRows="repeat(16, 1fr)"
        templateColumns="repeat(9, 1fr)"
      >
        <GridItem rowStart={2} rowSpan={2} colStart={1} colSpan={9} backgroundColor="brand.300">
          <Grid templateRows="repeat(3, 1fr)" templateColumns="repeat(10, 1fr)">
              <GridItem color="brand.100" rowStart={1} rowSpan={3} colStart={2} colSpan={2}>
                  <Shield />
              </GridItem>
              <GridItem rowStart={1} colStart={5} colSpan={4}>
                <Text fontSize="2xl" color="brand.100">TRADE SECRET</Text>
              </GridItem>
              <GridItem rowStart={2} colStart={5} colSpan={5} color="brand.200">
                Keeping Your Secrets Safe
              </GridItem>
          </Grid>
        </GridItem>
        <GridItem rowStart={5} rowSpan={4} colStart={2} colSpan={3}>
          <Button backgroundColor="brand.400" color="brand.200" boxShadow="2xl" w="100%" h="100%" value="/timecard" onClick={handleClick}>
            Timecard
          </Button>
        </GridItem>
        <GridItem rowStart={5} rowSpan={2} colStart={6} colSpan={3} bg="white">
          <Button
            width="100%"
            height="100%"
            backgroundColor="brand.300"
            boxShadow="lg"
            color="brand.200"
            value="/directory"
            onClick={handleClick}
          >
            Directory
          </Button>
        </GridItem>
        <GridItem rowStart={7} rowSpan={2} colStart={6} colSpan={3} bg="white">
          <Button
            width="100%"
            height="100%"
            backgroundColor="brand.300"
            color="brand.200"
            boxShadow="lg"
            value="/clients"
            onClick={handleClick}
          >
            Customers
          </Button>
        </GridItem>
        <GridItem rowStart={11} rowSpan={4} colStart={2} colSpan={3}>
          <Button
            width="100%"
            height="100%"
            backgroundColor="brand.400"
            color="brand.200"
            boxShadow="2xl"
            value="/schedule"
            onClick={handleClick}
          >
            Schedule
          </Button>
        </GridItem>
        <GridItem rowStart={11} rowSpan={2} colStart={6} colSpan={3} bg="white">
          <Button
            width="100%"
            height="100%"
            backgroundColor="brand.300"
            color="brand.200"
            boxShadow="lg"
            value="/warehouse"
            onClick={handleClick}
          >
            Inventory
          </Button>
        </GridItem>
        <GridItem rowStart={13} rowSpan={2} colStart={6} colSpan={3} bg="white">
          <Button
            width="100%"
            height="100%"
            backgroundColor="brand.300"
            color="brand.200"
            boxShadow="lg"
            value="/documents"
            onClick={handleClick}
          >
            Documents
          </Button>
        </GridItem>
      </Grid>
    );
  } else {
    return (
      <Login />
    )
  }
  
}

export default Home;
