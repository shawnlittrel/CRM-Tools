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
  Button
} from "@chakra-ui/react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CLIENT_NAMES } from "../../database/queries";

function AddWorkOrder() {
  const { loading, data } = useQuery(QUERY_CLIENT_NAMES);

  const [startDate, setStartDate] = useState();
  const [clientState, setClientState] = useState();
  const [descriptionState, SetDescriptionState] = useState();

  const handleClientChange = async event => {
       const updatedClient = event.target.value;
     try {
          setClientState(updatedClient)
          console.log('client', clientState);
     } catch (err) {
          console.log(err);
     }
  };

  const handleDescriptionChange = async event => {
       const updatedDescription = event.target.value;

       try {
            SetDescriptionState(updatedDescription);
            console.log('description', descriptionState);
       } catch (err) {
            console.log(err);
       }
  }

  const handleFormSubmit = event => {
       const workOrderDate = new Date(startDate).getTime()/1000.0;
       const workOrderClient = clientState;
       const workOrderDescription = descriptionState;

       //mutate database on these params
       //return to calendar
       window.location.replace('/schedule');
  }




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
    <Container>
      <Center>Create New Work Order</Center>
      <Divider />
      <FormControl id="workOrderDate">
        <FormLabel>Work Order Date and Time: </FormLabel>
        <DatePicker
          selected={startDate}
          showTimeSelect
          timeFormat="HH:mm"
          timeIntervals={30}
          timeCaption="time"
          dateFormat="MMMM d, yyyy h:mm aa"
          startDate={startDate}
          onChange={(date) => setStartDate(date)}
          value={startDate}
        />
      </FormControl>
      <FormControl id="workOrderClient">
        <FormLabel>Client: </FormLabel>
        <Select placeholder="Select Client" onChange={handleClientChange} value={clientState}>
          {clientList.map(client => (
            <option key={client._id} value={client._id}>
              {client.lastName}, {client.firstName}
            </option>
          ))}
        </Select>
      </FormControl>
      <FormControl>
        <FormLabel>Description: </FormLabel>
        <Textarea placeholder="Work order description" onChange={handleDescriptionChange} value={descriptionState}></Textarea>
      </FormControl>
      <br />
      <Center>
        <Button onClick={handleFormSubmit}>Save Work Order</Button>
      </Center>
    </Container>
  );
}
};

export default AddWorkOrder;
