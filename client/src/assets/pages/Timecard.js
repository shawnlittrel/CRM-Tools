import React, { useState, Redirect } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { Box, Spinner, Container, Button, Flex, Center } from "@chakra-ui/react";
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
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [state, dispatch] = useStoreContext();


  let timecards;

  if (loading) {
    timecards = [];
  } else {
    timecards = data.me.timeCards;
  }

  //TODO: Make error handling more robust -> user needs to know what happened
  const handleClockInSubmit = async event => {
    event.preventDefault();
    const newClockInTime = event.target.value;

    try {
      setClockInTime(newClockInTime);
      setIsClockedIn(true);

      dispatch({
        type: TOGGLE_EMPLOYEE_PUNCH,
        timestamp: clockInTime
      });

      await clockIn({
        variables: { timestamp: clockInTime, status: "Clock In" }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClockOutSubmit = async event => {
    event.preventDefault();
    const newClockOutTime = event.target.value;

    try {
      setClockOutTime(newClockOutTime);
      setIsClockedIn(false);

      dispatch({
        type: TOGGLE_EMPLOYEE_PUNCH,
        timestamp: clockOutTime
      });

      await clockOut({
        variables: { timestamp: clockOutTime, status: "Clock Out" }
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDate = timestamp => {
    let timeStampInt = parseInt(timestamp);
    return new Date(timeStampInt).toLocaleString();
  };

  if(loading) return (
    <Center>
          <Spinner
      thickness="5px"
      emptyColor="brand.300"
      color="brand.100"
      size="xl"
    />
    </Center>
  )

  return (
    <div>
      <Container>
        {timecards ? (
          <div>
            {timecards.map(punch => (
              <Box key={punch._id} _id={punch._id}>
                <Box
                  backgroundColor="brand.300"
                  color="brand.200"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  textTransform="uppercase"
                >
                  {punch.status}
                </Box>
                <Box backgroundColor="brand.300" color="brand.200">
                  {handleDate(punch.timestamp)}
                </Box>
              </Box>
            ))}
          </div>
        ) : null}
      </Container>
      <Flex justifyContent="center" position="fixed" width="100%" bottom="20">
        {isClockedIn ? (
          <Button
            backgroundColor="brand.100"
            color="brand.200"
            value={Date.now()}
            onClick={handleClockOutSubmit}
          >
            Clock Out
          </Button>
        ) : (
          <Button
            backgroundColor="brand.400"
            color="brand.200"
            value={Date.now()}
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
