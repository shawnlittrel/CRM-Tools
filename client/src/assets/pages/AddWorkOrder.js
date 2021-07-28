import { useState, useRef } from "react";
import {
  Center,
  FormControl,
  FormLabel,
  Select,
  Spinner,
  Textarea,
  Container,
  Divider,
  Button,
  Heading,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_CLIENT_NAMES } from "../../database/queries";
import { ADD_WORK_ORDER } from "../../database/mutations";

function AddWorkOrder() {
  //queries and mutations
  const { loading, data } = useQuery(QUERY_CLIENT_NAMES);
  const [saveWorkOrder, { saveWorkOrderError }] = useMutation(ADD_WORK_ORDER);

  //state management
  const [startDate, setStartDate] = useState(new Date());
  const [clientIdState, setClientIdState] = useState();
  const [clientNameState, setClientNameState] = useState();
  const [descriptionState, setDescriptionState] = useState();
  const [alertIsOpen, setAlertIsOpen] = useState(false);

  //ref
  const stayRef = useRef();

  //close modal when stay button is clicked or close button pressed
  const onClose = () => {
    setAlertIsOpen(false);
    setDescriptionState('');
    setClientIdState('');
    setClientNameState('');
  }
  
  const handleRedirect = () => window.location.replace('/schedule');

  //update data when selected client changes
  const handleClientChange = async event => {
    let container = document.getElementById("selectBox");
    let index = container.options[container.selectedIndex];
    let selectedClientId = index.getAttribute("dataid");
    let selectedClientName = index.getAttribute('dataname');

    try {
      setClientIdState(selectedClientId);
      setClientNameState(selectedClientName);
    } catch (err) {
      console.log(err);
    }
  };


  //update state when description changes
  const handleDescriptionChange = async event => {
    const updatedDescription = event.target.value;

    try {
      setDescriptionState(updatedDescription);
    } catch (err) {
      console.log(err);
    }
  };

  //submit data to backend when submit button is clicked
  const handleFormSubmit = async event => {
    event.preventDefault();

    const workOrderDateInt = startDate.getTime();
    const workOrderDate = workOrderDateInt.toString();
    const clientId = clientIdState;
    const workOrderDescription = descriptionState;
    const workOrderClient = clientNameState;

    //mutate database on these params
    try {

      await saveWorkOrder({
        variables: {
          workOrderDate,
          workOrderClient,
          workOrderDescription,
          clientId
        }
      });

      console.log('query sent to backend');
    } catch (err) {
      console.error(saveWorkOrderError);
      console.log("err", err);
    }

    //pop alert modal offering to go back to schedule
    setAlertIsOpen(true);
  };

  //return spinner while data loads
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

  //display form when data is returned
  if (data) {
    const clientList = data.clients;

    return (
      <Container marginTop="30px">
        <Center>
          <Heading as="h2">Create New Work Order</Heading>
        </Center>
        <Divider color="brand.300" />
        <FormControl id="workOrderDate">
          <FormLabel marginTop="10px">Work Order Date and Time: </FormLabel>
          <DatePicker
            selected={startDate}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            timeCaption="time"
            dateFormat="MMMM d, yyyy h:mm aa"
            startDate={startDate}
            onChange={date => setStartDate(date)}
            value={startDate}
          />
        </FormControl>
        <FormControl id="workOrderClient">
          <FormLabel>Client: </FormLabel>
          <Select
            id="selectBox"
            placeholder="Select Client"
            onChange={handleClientChange}
            value={clientIdState}
          >
            {clientList.map(client => (
              <option
                key={client._id}
                value={client._id}
                dataname={`${client.firstName} ${client.lastName}`}
                dataid={client._id}
              >
                {client.lastName}, {client.firstName}
              </option>
            ))}
          </Select>
        </FormControl>
        <FormControl>
          <FormLabel>Description: </FormLabel>
          <Textarea
            placeholder="Work order description"
            onChange={handleDescriptionChange}
            value={descriptionState}
          ></Textarea>
        </FormControl>
        <br />
        <Center>
          <Button 
          onClick={handleFormSubmit}
          color="brand.200"
          backgroundColor="brand.400"
          >
            Save Work Order
          </Button>
        </Center>
        <AlertDialog
          isOpen={alertIsOpen}
          leastDestructiveRef={stayRef}
          onClose={onClose}
        >
          <AlertDialogOverlay>
            <AlertDialogContent>
              <AlertDialogHeader fontSize="lg">
                Work Order Created!
              </AlertDialogHeader>

              <AlertDialogBody>
                Stay on this page or return to Schedule?
              </AlertDialogBody>
              <AlertDialogFooter>
                <Button 
                ref={stayRef}
                color="brand.200"
                backgroundColor="brand.300"
                onClick={onClose}
                >
                  Stay
                </Button>
                <Button 
                color="brand.200"
                backgroundColor="brand.400" 
                onClick={handleRedirect}
                >
                  Back to Schedule
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialogOverlay>
        </AlertDialog>
      </Container>
    );
  }
}

export default AddWorkOrder;
