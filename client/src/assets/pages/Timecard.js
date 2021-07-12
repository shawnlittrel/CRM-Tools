import React, { useState, Redirect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import {
  Box,
  Spinner,
  Button,
  Flex,
  Center,
  Grid,
  GridItem,
  Container,
  Heading
} from "@chakra-ui/react";
import Auth from "../../utils/auth";
import { QUERY_ME } from "../../database/queries";
import { CLOCK_IN, CLOCK_OUT } from "../../database/mutations";
import { useStoreContext } from "../../state/State";
import { TOGGLE_EMPLOYEE_PUNCH } from "../../state/reducers/actions";

function TimeCard() {
  //PULL TIME PUNCHES FOR WEEK FROM DB
  //RENDER PUNCHES IN CARDS
  //RENDER BUTTONS FOR CLOCK IN, CLOCK OUT

  const { loading, data } = useQuery(QUERY_ME);
  const [clockIn, { clockInError }] = useMutation(CLOCK_IN);
  const [clockOut, { clockOutError }] = useMutation(CLOCK_OUT);
  const [clockInTime, setClockInTime] = useState({});
  const [clockOutTime, setClockOutTime] = useState({});
  const [isClockedIn, setIsClockedIn] = useState();
  const [state, dispatch] = useStoreContext();
  let timecards;

  if (loading) {
    timecards = [];
  } else {
    let arr = data.me.timeCards;
    timecards = arr.slice(Math.max(arr.length - 10, 0));
  }

  //TODO: Make error handling more robust -> user needs to know what happened
  const handleClockInSubmit = async event => {
    let newClockInTime = Date.now();

    try {
      setClockInTime(newClockInTime);
      setIsClockedIn(true);

      dispatch({
        type: TOGGLE_EMPLOYEE_PUNCH,
        timestamp: clockInTime
      });

      console.log('clock in' , clockInTime);
      await clockIn({
        variables: { timestamp: clockInTime.toString(), status: "Clock In" }
      });

    } catch (err) {
      console.error(err);
    }
  };

  console.log('state', state);

  const handleClockOutSubmit = async event => {
    let newClockOutTime = Date.now();

    try {
      setClockOutTime(newClockOutTime);
      setIsClockedIn(false);

      dispatch({
        type: TOGGLE_EMPLOYEE_PUNCH,
        timestamp: clockOutTime
      });

      console.log('clock out', clockOutTime);
      await clockOut({
        variables: { timestamp: clockOutTime.toString(), status: "Clock Out" }
      });

    } catch (err) {
      console.error(err);
    }
  };

  const handleDate = timestamp => {
    let timeStampInt = parseInt(timestamp);
    return new Date(timeStampInt).toLocaleString();
  };

  if (loading)
    return (
      <Center>
        <Spinner
          thickness="5px"
          emptyColor="brand.300"
          color="brand.100"
          size="xl"
        />
      </Center>
    );

  return (
    <div>
      <Heading
        as="h2"
        size="lg"
        className="timeCardHeader"
        align="center"
        paddingTop="10px"
      >
        Timecard for {data.me.firstName} {data.me.lastName}
      </Heading>

      {timecards ? (
        <Container paddingTop="15px">
          <Grid gap={4}>
            {timecards.map(punch => (
              <GridItem key={punch._id} _id={punch._id}>
                <Box
                  backgroundColor="brand.300"
                  color="brand.200"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  textTransform="uppercase"
                  paddingLeft="5px"
                >
                  {punch.status}
                </Box>
                <Box
                  backgroundColor="brand.300"
                  color="brand.200"
                  paddingLeft="15px"
                >
                  {handleDate(punch.timestamp)}
                </Box>
              </GridItem>
            ))}
          </Grid>
        </Container>
      ) : null}

      <Flex justifyContent="center" position="fixed" width="100%" bottom="20">
        {state.isClockedIn ? (
          <Button
            backgroundColor="brand.100"
            color="brand.200"
            onClick={handleClockOutSubmit}
          >
            Clock Out
          </Button>
        ) : (
          <Button
            backgroundColor="brand.400"
            color="brand.200"
            onClick={handleClockInSubmit}
            w="60%"
          >
            Clock In
          </Button>
        )}
      </Flex>
    </div>
  );
}

export default TimeCard;
