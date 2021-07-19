import { useState } from "react";
import {
  Box,
  Button,
  Grid,
  GridItem,
  useToast,
  FormControl,
  FormLabel,
  FormHelperText,
  Center,
  Input,
  Heading
} from "@chakra-ui/react";
import { useMutation } from "@apollo/react-hooks";
import { ADD_CLIENT } from "../../database/mutations";

function AddClient() {
  //track state of input forms
  const [firstName, setClientFirstName] = useState();
  const [lastName, setClientLastName] = useState();
  const [address, setClientAddress] = useState();
  const [email, setClientEmail] = useState();
  const [phone, setClientPhone] = useState();

  //toasts
  const successToast = useToast();
  const errorToast = useToast();

  //database mutations //return spinner button on mutation loading //return error toast on error
  const [
    saveClient,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_CLIENT);

  //update state of form
  const handleFormChange = async event => {
    let id = event.target.id;
    let value = event.target.value;

    switch (id) {
      case "first-name":
        setClientFirstName(value);
        break;
      case "last-name":
        setClientLastName(value);
        break;
      case "address":
        setClientAddress(value);
        break;
      case "email":
        setClientEmail(value);
        break;
      case "phone-number":
        setClientPhone(value);
        break;
      default:
        console.log("DEFAULT", value);
    }
  };

  //run mutation and pop toast on success
  const handleSubmit = async event => {
    event.preventDefault();

    //verify form is complete and provide direction on how to correct
    if (!firstName) {
      errorToast({
        title: "First Name Missing",
        description: "Please enter a first name for the client.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!lastName) {
      errorToast({
        title: "Last Name Missing",
        description: "Please enter a last name for the client.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!address) {
      errorToast({
        title: "Address Missing",
        description: "Please enter an address for the client.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!email) {
      errorToast({
        title: "Email Missing",
        description: "Please enter an email address for the client.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!phone) {
      errorToast({
        title: "Phone Number Missing",
        description: "Please enter a phone number for the client.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    }

    try {
      //send mutation for add Client
      await saveClient({
        variables: {
          firstName,
          lastName,
          address,
          email,
          phone
        }
      });

      if (mutationError) {
        console.log(mutationError);
      }
    } catch (err) {
      console.error("try/catch error:", err);
      errorToast({
        title: "ERROR!",
        description: err,
        status: "error",
        duration: "5000",
        isClosable: false
      });
    }

    //pop success toast on mutation complete
    successToast({
      title: "Client created.",
      description:
        "Client created!  Data can now be accessed from the View Clients menu.",
      status: "success",
      duration: 9000,
      isClosable: true
    });
  };

  return (
    <Box>
      <Center>
        <Heading as="h2">Add A Client</Heading>
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
            <Input placeholder="First name" onChange={handleFormChange} />
          </FormControl>
        </GridItem>
        <GridItem colStart={7} colEnd={11} rowStart={2}>
          <FormControl id="last-name" isRequired>
            <FormLabel>Client Last Name</FormLabel>
            <Input placeholder="Last name" onChange={handleFormChange} />
          </FormControl>
        </GridItem>
        <GridItem rowStart={3} colStart={5} colSpan={4}>
          <FormControl id="address" isRequired>
            <FormLabel>Client Address</FormLabel>
            <Input placeholder="Address" onChange={handleFormChange} />
          </FormControl>
        </GridItem>
        <GridItem rowStart={4} colStart={5} colSpan={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Client Email</FormLabel>
            <Input placeholder="Email" onChange={handleFormChange} />
          </FormControl>
        </GridItem>
        <GridItem rowStart={5} colStart={5} colSpan={4}>
          <FormControl id="phone-number" isRequired>
            <FormLabel>Client Phone Number</FormLabel>
            <Input placeholder="XXX-XXX-XXXX" onChange={handleFormChange} />
            <FormHelperText>Please use XXX-XXX-XXXX format.</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem rowStart={6} colStart={6} colSpan={4}>
          {mutationLoading ? (
            <Button
              isLoading
              w="200px"
              loadingText="Submitting"
              color="brand.100"
              variant="outline"
            >
              LOADING
            </Button>
          ) : (
            <Button
              w="200px"
              color="brand.200"
              backgroundColor="brand.400"
              onClick={handleSubmit}
            >
              Add Client
            </Button>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default AddClient;
