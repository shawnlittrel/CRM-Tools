import { useState } from "react";
import {
  Center,
  Box,
  Grid,
  GridItem,
  Spinner,
  Container,
  Heading
} from "@chakra-ui/react";
import Search from "../components/Search";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_EMPLOYEES_SHORT } from "../../database/queries";

function Employees() {
  //define search area
  const { search } = window.location;
  //query clients list from database
  const { loading, data } = useQuery(QUERY_EMPLOYEES_SHORT);
  let employees;

  if (data) {
    employees = data.employees;
  }

  //search query is whatever is typed into searchbar
  const query = new URLSearchParams(search).get("searchbar");
  //set state of clients
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filterEmployees = (employees, query) => {
    //return entire list if nothing is in search bar
    if (!query) {
      return employees;
    }
    //adjust list based on case-insensitive text
    return employees.filter(employee => {
      const employeeFirstName = employee.firstName.toLowerCase();
      return employeeFirstName.includes(query);
    });
  };

  //filter clients based on search text and populate on page
  const filteredEmployees = filterEmployees(employees, searchQuery);

  //display spinner until data is returned from server
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

  //display page when data is available
  return (
    <>
      <Heading as="h2" size="lg" textAlign="center">
        Employees:
      </Heading>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchCategory="Employees"
        margin="10px"
        key="search"
      />
      <br />
      <Grid gap={4}>
        {filteredEmployees.map(employee => (
          <Center key={`container${employee._id}`}>
            <Box
              as="a"
              backgroundColor="brand.300"
              color="brand.200"
              key={employee._id}
              name={employee._id}
              href={`/employees/${employee._id}`}
              margin="2px"
              w="80%"
            >
              <Grid
                templateRows="repeat(4, 1fr)"
                templateColumns="repeat(12, 1fr)"
                gap={1}
              >
                <GridItem colStart={1} colSpan={12} rowStart={1}>
                  <Box color="brand.100">
                    <strong>
                      {employee.firstName} {employee.lastName}
                    </strong>
                  </Box>
                </GridItem>
                <GridItem colStart={3} colSpan={9} rowStart={2}>
                  <Box fontSize="sm">
                    <strong>A:</strong> {employee.address}
                  </Box>
                </GridItem>
                <GridItem colStart={3} colSpan={9} rowStart={3}>
                  <Box fontSize="sm">
                    <strong>P: </strong> {employee.phone}
                  </Box>
                </GridItem>
                <GridItem colStart={3} colSpan={9} rowStart={4}>
                  <Box fontSize="sm">
                    <strong>E: </strong> {employee.email}
                  </Box>
                </GridItem>
              </Grid>
            </Box>
          </Center>
        ))}
      </Grid>
    </>
  );
}

export default Employees;
