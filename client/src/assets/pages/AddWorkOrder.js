import { useState } from "react";
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
  Heading
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_CLIENT_NAMES } from "../../database/queries";
import { ADD_WORK_ORDER } from "../../database/mutations";

function AddWorkOrder() {
  const { loading, data } = useQuery(QUERY_CLIENT_NAMES);
  const [saveWorkOrder, { saveWorkOrderError }] = useMutation(ADD_WORK_ORDER);

  const [startDate, setStartDate] = useState(new Date());
  const [clientState, setClientState] = useState();
  const [clientNameState, setClientNameState] = useState();
  const [descriptionState, SetDescriptionState] = useState();

  const handleClientChange = async event => {
    const updatedClient = event.target.value;
    const updatedClientName = event.target.dataName;
    try {
      setClientState(updatedClient);
      setClientNameState(updatedClientName);
    } catch (err) {
      console.log(err);
    }
  };

  const handleDescriptionChange = async event => {
    const updatedDescription = event.target.value;

    try {
      SetDescriptionState(updatedDescription);
    } catch (err) {
      console.log(err);
    }
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const workOrderDateInt = startDate.getTime();
    const workOrderDate = workOrderDateInt.toString();
    const clientId = clientState;
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
    } catch (err) {
      console.error(saveWorkOrderError);
      console.log("err", err);
    }

    //return to calendar
    window.location.replace("/schedule");
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
            placeholder="Select Client"
            onChange={handleClientChange}
            value={clientState}
          >
            {clientList.map(client => (
              <option
                key={client._id}
                value={client._id}
                dataName={`${client.firstName} ${client.lastName}`}
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
          <Button onClick={handleFormSubmit}>Save Work Order</Button>
        </Center>
      </Container>
    );
  }
}

export default AddWorkOrder;
