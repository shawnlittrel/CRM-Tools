import { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_CLIENTS_SHORT } from "../../database/queries";
import { EDIT_CLIENT, DELETE_CLIENT } from "../../database/mutations";
import {
  Center,
  Spinner,
  Button,
  Grid,
  GridItem,
  FormControl,
  FormLabel,
  FormHelperText,
  Input,
  Heading,
  Box,
  Select,
  useControllableState,
  useToast,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverCloseButton,
  PopoverArrow,
  PopoverHeader,
  PopoverBody,
  PopoverFooter
} from "@chakra-ui/react";

function EditClient() {
  //define queries and mutations
  const { loading, data } = useQuery(QUERY_CLIENTS_SHORT);
  const [
    saveUpdatedClient,
    { loading: updateLoading, error: updateError }
  ] = useMutation(EDIT_CLIENT);

  const [
    deleteClient,
    { loading: deleteLoading, error: deleteError }
  ] = useMutation(DELETE_CLIENT);

  //track state
  const [clientIdState, setClientIdState] = useState();

  //track form state
  const [clientFirstNameState, setClientFirstNameState] = useControllableState({
    defaultValue: "First Name"
  });
  const [clientLastNameState, setClientLastNameState] = useControllableState({
    defaultValue: "Last Name"
  });
  const [clientAddressState, setClientAddressState] = useControllableState({
    defaultValue: "Address"
  });
  const [clientPhoneState, setClientPhoneState] = useControllableState({
    defaultValue: "Phone Number"
  });
  const [clientEmailState, setClientEmailState] = useControllableState({
    defaultValue: "Email Address"
  });

  //define toasts
  const successToast = useToast();
  const errorToast = useToast();

  //repopulate client info based on selected client
  const handleClientChange = async event => {
    //find appropriate info from selected entry
    let container = document.getElementById("selectBox");
    let index = container.options[container.selectedIndex];
    let id = index.getAttribute("dataid");
    let firstName = index.getAttribute("datafirstname");
    let lastName = index.getAttribute("datalastname");
    let address = index.getAttribute("dataaddress");
    let phone = index.getAttribute("dataphone");
    let email = index.getAttribute("dataemail");

    //track which client we are updating
    setClientIdState(id);
    //populate selected info into text boxes
    document.getElementById("firstNameBox").value = firstName;
    document.getElementById("lastNameBox").value = lastName;
    document.getElementById("addressBox").value = address;
    document.getElementById("phoneBox").value = phone;
    document.getElementById("emailBox").value = email;
  };

  //run on update click
  const handleSubmit = async event => {
    event.preventDefault();

    const clientId = clientIdState;
    const firstName = clientFirstNameState;
    const lastName = clientLastNameState;
    const address = clientAddressState;
    const phone = clientPhoneState;
    const email = clientEmailState;

    try {
      await saveUpdatedClient({
        variables: {
          clientId,
          firstName,
          lastName,
          address,
          email,
          phone,
        }
      });
    } catch (err) {
      console.error(err);
      return;
    }

    console.log("submitted");
    //pop success toast on mutation complete
    successToast({
      title: "Client Edited",
      description: "Client has been successfully edited.",
      status: "success",
      duration: 3000,
      isClosable: true
    });
  };

  //run on delete click
  const handleDelete = async event => {
    const clientId = clientIdState;

    console.log("id", clientId);
    try {
      await deleteClient({
        variables: {
          clientId
        }
      });

      successToast({
        title: "Client Deleted",
        description: "Client has been successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: false
      });
    } catch (err) {
      console.error(err);
    }
  };

  //track status of all text boxes for later mutation
  const handleFormChange = async event => {
    setClientFirstNameState(document.getElementById("firstNameBox").value);
    setClientLastNameState(document.getElementById("lastNameBox").value);
    setClientAddressState(document.getElementById("addressBox").value);
    setClientPhoneState(document.getElementById("phoneBox").value);
    setClientEmailState(document.getElementById("emailBox").value);
  };

  //show spinner until query completes
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

  //on data retrieval
  if (data) {
    //populate select box
    const clientList = data.clients;

    //render page
    return (
      <Box>
        <Center>
          <Heading as="h2">Edit A Client</Heading>
        </Center>
        <Center>
          <FormControl id="workOrderClient">
            <FormLabel>Select a Client to Edit: </FormLabel>
            <Select
              placeholder="Select Client"
              onChange={handleClientChange}
              value={clientIdState}
              id="selectBox"
            >
              {clientList.map(client => (
                <option
                  key={client._id}
                  value={client._id}
                  dataid={client._id}
                  datafirstname={client.firstName}
                  datalastname={client.lastName}
                  dataemail={client.email}
                  dataaddress={client.address}
                  dataphone={client.phone}
                >
                  {client.lastName}, {client.firstName}
                </option>
              ))}
            </Select>
          </FormControl>
        </Center>
        <Grid
          templateColumns="repeat(12, 1fr)"
          templateRows="repeat(10, 1fr)"
          gap={4}
          h="80vh"
        >
          <GridItem colStart={3} colEnd={7} rowStart={2}>
            <FormControl id="first-name" isRequired>
              <FormLabel>Client First Name</FormLabel>
              <Input
                className="inputBox"
                onChange={handleFormChange}
                placeholder="First Name"
                id="firstNameBox"
              />
            </FormControl>
          </GridItem>
          <GridItem colStart={7} colEnd={11} rowStart={2}>
            <FormControl id="last-name" isRequired>
              <FormLabel>Client Last Name</FormLabel>
              <Input
                placeholder="Last name"
                onChange={handleFormChange}
                id="lastNameBox"
              />
            </FormControl>
          </GridItem>
          <GridItem rowStart={3} colStart={3} colEnd={7}>
            <FormControl id="address" isRequired>
              <FormLabel>Client Address</FormLabel>
              <Input
                placeholder="Address"
                onChange={handleFormChange}
                id="addressBox"
              />
            </FormControl>
          </GridItem>
          <GridItem rowStart={3} colStart={7} colEnd={11}>
            <FormControl id="email" isRequired>
              <FormLabel>Client Email</FormLabel>
              <Input
                placeholder="Email"
                onChange={handleFormChange}
                id="emailBox"
              />
            </FormControl>
          </GridItem>
          <GridItem rowStart={4} colStart={3} colEnd={7}>
            <FormControl id="phone-number" isRequired>
              <FormLabel>Client Phone Number</FormLabel>
              <Input
                placeholder="XXX-XXX-XXXX"
                onChange={handleFormChange}
                id="phoneBox"
              />
              <FormHelperText>Please use XXX-XXX-XXXX format.</FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem rowStart={6} colStart={3} colEnd={7}>
            {deleteLoading ? (
              <Button
                isLoading
                w="150px"
                loadingText="Submitting"
                color="brand.100"
                variant="outline"
              >
                LOADING
              </Button>
            ) : (
              <Popover>
                <PopoverTrigger>
                  <Button w="150px" colorScheme="red">
                    DELETE CLIENT
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>WARNING:</PopoverHeader>
                  <PopoverBody>
                    This action cannot be undone. Are you sure you want to
                    delete this client?
                  </PopoverBody>
                  <PopoverFooter>
                    <Center>
                      <Button colorScheme="red" onClick={handleDelete}>
                        DELETE
                      </Button>
                    </Center>
                  </PopoverFooter>
                </PopoverContent>
              </Popover>
            )}
          </GridItem>
          <GridItem rowStart={6} colStart={7} colEnd={11}>
            {updateLoading ? (
              <Button
                isLoading
                w="150px"
                loadingText="Submitting"
                color="brand.100"
                variant="outline"
              >
                LOADING
              </Button>
            ) : (
              <Button
                w="150px"
                color="brand.200"
                backgroundColor="brand.400"
                onClick={handleSubmit}
              >
                Update Client
              </Button>
            )}
          </GridItem>
        </Grid>
      </Box>
    );
  }
}

export default EditClient;
