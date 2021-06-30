import { useState, useContext } from "react";
import { Box, Button, Center, Grid, GridItem, Input, Container, Divider, Textarea } from "@chakra-ui/react";
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

function WorkOrder() {
  const [currentWorkOrder, setCurrentWorkOrder] = useState();
  const [dispatchedTime, setDispatchedTime] = useState();
  const [arrivedTime, setArrivedTime] = useState();
  const [departedTime, setDepartedTime] = useState();
  const [isDeparted, setIsDeparted] = useState(false);
  const [recordDispatchToDB, { error1 }] = useMutation(DISPATCH_TO_DB);
  const [recordArriveToDB, { error2 }] = useMutation(ARRIVE_TO_DB);
  const [recordDepartToDB, { error3 }] = useMutation(DEPART_TO_DB);
  const workOrderDescription = "test 123 here is some test data";
  const [state, dispatch] = useStoreContext();

  const handleDispatch = async event => {
    event.preventDefault();
    const dispatchTime = event.target.value;

    try {
      //await recordDispatchToDB(dispatchTime);

      setDispatchedTime(dispatchTime);

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
    const arriveTime = event.target.value;

    try {
      //await recordArriveToDB(arriveTime);

      setArrivedTime(arriveTime);

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
    const departTime = event.target.value;
    console.log(departTime);

    try {
      //await recordDepartToDB(departTime
      setDepartedTime(departTime);
      setIsDeparted(true);

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
        <Input>{dispatchedTime}</Input>
      </GridItem>
      <GridItem colStart={4} colEnd={5} key="dispatchButton">
        <Button value={Date.now()} onClick={handleDispatch}>
          Dispatch
        </Button>
      </GridItem>
      <GridItem colSpan={2} key="arriveTimeInput">
        <Input>{arrivedTime}</Input>
      </GridItem>
      <GridItem colStart={4} colEnd={5} key="arriveButton">
        <Button value={Date.now()} onClick={handleArrive}>
          Arrive
        </Button>
      </GridItem>
      <GridItem colSpan={2} key="departTimeInput">
        <Input>{departedTime}</Input>
      </GridItem>
      <GridItem colStart={4} colEnd={5} key="departButton">
        <Button value={Date.now()} onClick={handleDepart}>
          Depart
        </Button>
      </GridItem>
    </Grid> 
    <Divider />
          <Textarea placeholder={workOrderDescription}>
          </Textarea>
       </Container>

  );
};

export default WorkOrder;
