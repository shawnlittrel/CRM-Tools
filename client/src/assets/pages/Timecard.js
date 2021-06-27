import React, { useState, Redirect } from "react";
import { useQuery } from "@apollo/react-hooks";
import { useMutation } from "@apollo/client";
import { Box, Spinner, Container, Button } from "@chakra-ui/react";
import Auth from "../../../utils/auth";
import { QUERY_TIMECARD } from "../../database/queries";
import { CLOCK_IN, CLOCK_OUT } from "../../database/mutations";
import { useStoreContext } from "../../state/State";

function TimeCard() {
  //PULL TIME PUNCHES FOR WEEK FROM DB
  //RENDER PUNCHES IN CARDS
  //RENDER BUTTONS FOR CLOCK IN, CLOCK OUT

  const { loading, data } = useQuery(QUERY_TIMECARD);
  const [clockIn, { clockInError }] = useMutation(CLOCK_IN);
  const [clockOut, { clockOutError }] = useMutation(CLOCK_OUT);
  const [clockInTime, setClockInTime] = useState({});
  const [clockOutTime, setClockOutTime] = useState({});
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [state, dispatch] = useStoreContext();

  //TODO: Make error handling more robust -> user needs to know what happened
  const handleClockInSubmit = async event => {
    event.preventDefault();
    const newClockInTime = event.target.value;

    try {
      await clockIn(newClockInTime);

      setClockInTime(newClockInTime);
      setIsClockedIn(true);

      dispatch({
        type: CLOCK_IN,
        timestamp: clockInTime
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleClockOutSubmit = async event => {
    event.preventDefault();
    const newClockOutTime = event.target.value;

    try {
      await clockOut(newClockOutTime);

      setClockOutTime(newClockOutTime);
      setIsClockedIn(false);

      dispatch({
        type: CLOCK_OUT,
        timestamp: clockOutTime
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (Auth.loggedIn) {
    if (loading) {
      return <Spinner color="brand.400" />;
    } else {
      return (
        <div>
          <Container centerContent>
            {data.map(punch => (
              <Box key={punch._id} _id={punch._id}>
                <Box
                  backgroundColor="brand.300"
                  color="brand.200"
                  fontWeight="semibold"
                  LetterSpacing="wide"
                  textTransform="uppercase"
                >
                  {punch.type}
                </Box>
                <Box backgroundColor="brand.300" color="brand.200">
                  {punch.timestamp}
                </Box>
              </Box>
            ))}
          </Container>
          <div>
            {isClockedIn ? (
              <Button
                backgroundColor="brand.100"
                color="brand.100"
                value={Date.now()}
                onClick={handleClockOutSubmit}
              >
                Clock Out
              </Button>
            ) : (
              <Button
                backgroundColor="brand.400"
                color="brand.100"
                value={Date.now()}
                onClick={handleClockInSubmit}
              >
                Clock In
              </Button>
            )}
          </div>
        </div>
      );
    }
  } else {
    return <Redirect to="/login" />;
  }
}

export default TimeCard;
