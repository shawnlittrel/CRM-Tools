import { useState } from "react";
import { useQuery, useMutation } from "@apollo/react-hooks";
import { QUERY_EMPLOYEES_SHORT } from "../../database/queries";
import { EDIT_EMPLOYEE, DELETE_EMPLOYEE } from "../../database/mutations";
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

function EditEmployee() {
  //define queries and mutations
  const { loading, data } = useQuery(QUERY_EMPLOYEES_SHORT);
  const [saveUpdatedEmployee, { loading: updateLoading }] = useMutation(
    EDIT_EMPLOYEE
  );

  const [deleteEmployee, { loading: deleteLoading }] = useMutation(
    DELETE_EMPLOYEE
  );

  //track state
  const [employeeIdState, setEmployeeIdState] = useState();

  //track form state
  const [
    employeeFirstNameState,
    setEmployeeFirstNameState
  ] = useControllableState({
    defaultValue: "First Name"
  });
  const [
    employeeLastNameState,
    setEmployeeLastNameState
  ] = useControllableState({
    defaultValue: "Last Name"
  });
  const [employeeAddressState, setEmployeeAddressState] = useControllableState({
    defaultValue: "Address"
  });
  const [employeePhoneState, setEmployeePhoneState] = useControllableState({
    defaultValue: "Phone Number"
  });
  const [employeeEmailState, setEmployeeEmailState] = useControllableState({
    defaultValue: "Email Address"
  });
  const [
    employeePasswordState,
    setEmployeePasswordState
  ] = useControllableState({
    defaultValue: "Password"
  });

  //define toasts
  const successToast = useToast();

  //repopulate employee info based on selected employee
  const handleEmployeeChange = async event => {
    //find appropriate info from selected entry
    let container = document.getElementById("selectBox");
    let index = container.options[container.selectedIndex];
    let id = index.getAttribute("dataid");
    let firstName = index.getAttribute("datafirstname");
    let lastName = index.getAttribute("datalastname");
    let address = index.getAttribute("dataaddress");
    let phone = index.getAttribute("dataphone");
    let email = index.getAttribute("dataemail");
    let password = index.getAttribute("datapassword");

    //track which employee we are updating
    setEmployeeIdState(id);
    //populate selected info into text boxes
    document.getElementById("firstNameBox").value = firstName;
    document.getElementById("lastNameBox").value = lastName;
    document.getElementById("addressBox").value = address;
    document.getElementById("phoneBox").value = phone;
    document.getElementById("emailBox").value = email;
    document.getElementById("passwordBox").value = password;
  };

  //run on update click
  const handleSubmit = async event => {
    event.preventDefault();

    const employeeId = employeeIdState;
    const firstName = employeeFirstNameState;
    const lastName = employeeLastNameState;
    const address = employeeAddressState;
    const phone = employeePhoneState;
    const email = employeeEmailState;
    const password = employeePasswordState;

    try {
      await saveUpdatedEmployee({
        variables: {
          employeeId,
          firstName,
          lastName,
          address,
          email,
          phone,
          password
        }
      });
    } catch (err) {
      console.error(err);
    }

    console.log("submitted");
    //pop success toast on mutation complete
    successToast({
      title: "Employee Edited",
      description: "Employee has been successfully edited.",
      status: "success",
      duration: 3000,
      isClosable: true
    });
  };

  //run on delete click
  const handleDelete = async event => {
    const employeeId = employeeIdState;

    console.log("id", employeeId);
    try {
      await deleteEmployee({
        variables: {
          employeeId
        }
      });

      successToast({
        title: "Employee Deleted",
        description: "Employee has been successfully deleted.",
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
    setEmployeeFirstNameState(document.getElementById("firstNameBox").value);
    setEmployeeLastNameState(document.getElementById("lastNameBox").value);
    setEmployeeAddressState(document.getElementById("addressBox").value);
    setEmployeePhoneState(document.getElementById("phoneBox").value);
    setEmployeeEmailState(document.getElementById("emailBox").value);
    setEmployeePasswordState(document.getElementById("passwordBox").value);
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
    const employeeList = data.employees;

    //render page
    return (
      <Box>
        <Center>
          <Heading as="h2">Edit An Employee</Heading>
        </Center>
        <Center>
          <FormControl id="employeeSelect">
            <FormLabel>Select an Employee to Edit: </FormLabel>
            <Select
              placeholder="Select Employee"
              onChange={handleEmployeeChange}
              value={employeeIdState}
              id="selectBox"
            >
              {employeeList.map(employee => (
                <option
                  key={employee._id}
                  value={employee._id}
                  dataid={employee._id}
                  datafirstname={employee.firstName}
                  datalastname={employee.lastName}
                  dataemail={employee.email}
                  dataaddress={employee.address}
                  dataphone={employee.phone}
                >
                  {employee.lastName}, {employee.firstName}
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
              <FormLabel>Employee First Name</FormLabel>
              <Input
                onChange={handleFormChange}
                placeholder="First Name"
                id="firstNameBox"
              />
            </FormControl>
          </GridItem>
          <GridItem colStart={7} colEnd={11} rowStart={2}>
            <FormControl id="last-name" isRequired>
              <FormLabel>Employee Last Name</FormLabel>
              <Input
                placeholder="Last name"
                onChange={handleFormChange}
                id="lastNameBox"
              />
            </FormControl>
          </GridItem>
          <GridItem rowStart={3} colStart={3} colEnd={7}>
            <FormControl id="address" isRequired>
              <FormLabel>Employee Address</FormLabel>
              <Input
                placeholder="Address"
                onChange={handleFormChange}
                id="addressBox"
              />
            </FormControl>
          </GridItem>
          <GridItem rowStart={3} colStart={7} colEnd={11}>
            <FormControl id="email" isRequired>
              <FormLabel>Employee Email</FormLabel>
              <Input
                placeholder="Email"
                onChange={handleFormChange}
                id="emailBox"
              />
            </FormControl>
          </GridItem>
          <GridItem rowStart={4} colStart={3} colEnd={7}>
            <FormControl id="phone-number" isRequired>
              <FormLabel>Employee Phone Number</FormLabel>
              <Input
                placeholder="XXX-XXX-XXXX"
                onChange={handleFormChange}
                id="phoneBox"
              />
              <FormHelperText>Please use XXX-XXX-XXXX format.</FormHelperText>
            </FormControl>
          </GridItem>
          <GridItem rowStart={4} colStart={7} colEnd={11}>
            <FormControl id="password" isRequired>
              <FormLabel>Employee Password</FormLabel>
              <Input
                type="password"
                onChange={handleFormChange}
                id="passwordBox"
              />
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
                    DELETE EMPLOYEE
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <PopoverArrow />
                  <PopoverCloseButton />
                  <PopoverHeader>WARNING:</PopoverHeader>
                  <PopoverBody>
                    This action cannot be undone. Are you sure you want to
                    delete this employee?
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
                Update Employee
              </Button>
            )}
          </GridItem>
        </Grid>
      </Box>
    );
  }
}

export default EditEmployee;
