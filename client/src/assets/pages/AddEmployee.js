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
import { ADD_EMPLOYEE } from "../../database/mutations";

function AddEmployee() {
  //track state of input forms
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [address, setAddress] = useState();
  const [email, setEmail] = useState();
  const [phone, setPhone] = useState();
  const [password, setPassword] = useState();

  //toasts
  const successToast = useToast();
  const errorToast = useToast();

  //database mutations //return spinner button on mutation loading //return error toast on error
  const [
    saveEmployee,
    { loading: mutationLoading, error: mutationError }
  ] = useMutation(ADD_EMPLOYEE);

  //update state of form
  const handleFormChange = async event => {
    let id = event.target.id;
    let value = event.target.value;

    switch (id) {
      case "first-name":
        setFirstName(value);
        break;
      case "last-name":
        setLastName(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone-number":
        setPhone(value);
        break;
      case "password":
        setPassword(value);
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
        description: "Please enter a first name for the employee.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!lastName) {
      errorToast({
        title: "Last Name Missing",
        description: "Please enter a last name for the employee.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!address) {
      errorToast({
        title: "Address Missing",
        description: "Please enter an address for the employee.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!email) {
      errorToast({
        title: "Email Missing",
        description: "Please enter an email address for the employee.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!phone) {
      errorToast({
        title: "Phone Number Missing",
        description: "Please enter a phone number for the employee.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    } else if (!password) {
      errorToast({
        title: "Password Missing",
        description: "Please enter a default password for the employee.",
        status: "error",
        duration: "3000",
        isClosable: true
      });
      return;
    }

    try {
      //send mutation for add Employee
      await saveEmployee({
        variables: {
          firstName,
          lastName,
          email,
          phone,
          address,
          password
        }
      });

      if (mutationError) {
        console.log('MUTATION ERROR', mutationError);
      }
    } catch (err) {
      console.error("try/catch error:", err);
    }

    //pop success toast on mutation complete
    successToast({
      title: "Employee created.",
      description:
        "Employee created!  Data can now be accessed from the View Employees menu.",
      status: "success",
      duration: 9000,
      isClosable: true
    });
  };

  return (
    <Box>
      <Center>
        <Heading as="h2">Add An Employee</Heading>
      </Center>

      <Grid
        templateColumns="repeat(12, 1fr)"
        templateRows="repeat(10, 1fr)"
        gap={4}
        h="80vh"
      >
        <GridItem colStart={3} colEnd={7} rowStart={2}>
          <FormControl id="first-name" isRequired>
            <FormLabel>Employee First Name</FormLabel>
            <Input placeholder="First name" onChange={handleFormChange} />
          </FormControl>
        </GridItem>
        <GridItem colStart={7} colEnd={11} rowStart={2}>
          <FormControl id="last-name" isRequired>
            <FormLabel>Employee Last Name</FormLabel>
            <Input placeholder="Last name" onChange={handleFormChange} />
          </FormControl>
        </GridItem>
        <GridItem rowStart={3} colStart={5} colSpan={4}>
          <FormControl id="address" isRequired>
            <FormLabel>Employee Address</FormLabel>
            <Input placeholder="Address" onChange={handleFormChange} />
          </FormControl>
        </GridItem>
        <GridItem rowStart={4} colStart={5} colSpan={4}>
          <FormControl id="email" isRequired>
            <FormLabel>Employee Email</FormLabel>
            <Input placeholder="Email" onChange={handleFormChange} />
          </FormControl>
        </GridItem>
        <GridItem rowStart={5} colStart={5} colSpan={4}>
          <FormControl id="phone-number" isRequired>
            <FormLabel>Employee Phone Number</FormLabel>
            <Input placeholder="XXX-XXX-XXXX" onChange={handleFormChange} />
            <FormHelperText>Please use XXX-XXX-XXXX format.</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem rowStart={6} colStart={5} colSpan={4}>
          <FormControl id="password" isRequired>
            <FormLabel>Employee Password</FormLabel>
            <Input placeholder="XXXXXX" onChange={handleFormChange} type="password" />
            <FormHelperText>Passwords must be at least 6 characters.</FormHelperText>
          </FormControl>
        </GridItem>
        <GridItem rowStart={7} colStart={6} colSpan={4}>
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
              Add Employee
            </Button>
          )}
        </GridItem>
      </Grid>
    </Box>
  );
}

export default AddEmployee;
