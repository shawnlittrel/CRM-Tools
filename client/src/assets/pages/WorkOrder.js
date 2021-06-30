import { useState, useContext } from "react";
import {
  Box,
  Button,
  Center,
  Grid,
  GridItem,
  Input,
  Container,
  Divider,
  Textarea
} from "@chakra-ui/react";
import { useStoreContext } from "../../state/State";
import { useMutation } from "@apollo/client";
import {
  ARRIVE_WORK_ORDER,
  DEPART_WORK_ORDER,
  DISPATCH_WORK_ORDER
} from "../../state/reducers/actions";
import {
  DISPATCH_TO_DB,
  ARRIVE_TO_DB,
  DEPART_TO_DB
} from "../../database/mutations";
import dateFormat from "dateformat";

function WorkOrder() {
  const [currentWorkOrder, setCurrentWorkOrder] = useState();
  const [dispatchedTime, setDispatchedTime] = useState();
  const [arrivedTime, setArrivedTime] = useState();
  const [departedTime, setDepartedTime] = useState();
  const [isDeparted, setIsDeparted] = useState(false);
  const [dispatchString, setDispatchString] = useState("");
  const [arriveString, setArriveString] = useState("");
  const [departString, setDepartString] = useState("");
  const [recordDispatchToDB, { error1 }] = useMutation(DISPATCH_TO_DB);
  const [recordArriveToDB, { error2 }] = useMutation(ARRIVE_TO_DB);
  const [recordDepartToDB, { error3 }] = useMutation(DEPART_TO_DB);
  const workOrderDescription = "test 123 here is some test data";
  const [state, dispatch] = useStoreContext();

  const handleDispatch = async event => {
    event.preventDefault();
    const dispatchTime = Date.now();

    setDispatchString(dateFormat(dispatchTime, "mm/dd/yy | hh:MM tt"));
    setDispatchedTime(dispatchTime);

    try {
      //await recordDispatchToDB(dispatchTime);
      //dispatch({
      //type: DISPATCH_WORK_ORDER,
      //timestamp: dispatchTime
      //});
    } catch (err) {
      console.error(err);
    }
  };

  const handleArrive = async event => {
    event.preventDefault();
    const arriveTime = Date.now();
    setArriveString(dateFormat(arriveTime, "mm/dd/yy | hh:MM tt"));
    setArrivedTime(arriveTime);

    try {
      //await recordArriveToDB(arriveTime);
      //  dispatch({
      //    type: ARRIVE_WORK_ORDER,
      //    timestamp: arriveTime
      //  });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDepart = async event => {
    event.preventDefault();
    const departTime = Date.now();
    setDepartString(dateFormat(departTime, "mm/dd/yy | hh:MM tt"));
    setDepartedTime(departTime);
    setIsDeparted(true);

    try {
      //await recordDepartToDB(departTime
      //  dispatch({
      //    type: DEPART_WORK_ORDER,
      //    timestamp: departTime
      //  });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Grid
        gap={6}
        templateRows="repeat(3, 1fr)"
        templateColumns="repeat(5, 1fr)"
      >
        <GridItem colSpan={2} key="dispatchTimeInput">
          <Box>{dispatchString}</Box>
        </GridItem>
        <GridItem colStart={4} colEnd={5} key="dispatchButton">
          <Button onClick={handleDispatch}>Dispatch</Button>
        </GridItem>
        <GridItem colSpan={2} key="arriveTimeInput">
          <Box>{arriveString}</Box>
        </GridItem>
        <GridItem colStart={4} colEnd={5} key="arriveButton">
          <Button onClick={handleArrive}>Arrive</Button>
        </GridItem>
        <GridItem colSpan={2} key="departTimeInput">
          <Box>{departString}</Box>
        </GridItem>
        <GridItem colStart={4} colEnd={5} key="departButton">
          <Button onClick={handleDepart}>Depart</Button>
        </GridItem>
      </Grid>
      <Divider />
      <br />
      <br />
      <Box>{workOrderDescription}</Box>
    </Container>
  );
}

export default WorkOrder;
