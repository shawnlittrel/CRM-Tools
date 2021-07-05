import { useState } from "react";
import { Center, Box, Grid, GridItem, Spinner } from "@chakra-ui/react";
import Search from "../components/Search";
import { useQuery, useLazyQuery } from "@apollo/react-hooks";
import { QUERY_EMPLOYEES_SHORT } from "../../database/queries";

function Employees() {
  //define search area
  const { search } = window.location;
  //query clients list from database
  const { loading, data } = useQuery(QUERY_EMPLOYEES_SHORT);
 let employees;

 if(data) {
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
  console.log("query", query);

  //filter clients based on search text and populate on page
  const filteredEmployees = filterEmployees(employees, searchQuery);
  console.log(filteredEmployees);

  if(loading) return (
    <Center>
          <Spinner
      thickness="5px"
      emptyColor="brand.300"
      color="brand.100"
      size="xl"
    />
    </Center>
  )

return (
     <>
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
               templateRows="repeat(5, 1fr)"
               templateColumns="repeat(6, 1fr)"
               gap={1}
             >
               <GridItem colSpan={5} color="brand.100">
                 <strong>{employee.firstName} {employee.lastName}</strong>
               </GridItem>
               <GridItem rowStart={2} colStart={2} colSpan={4}>
                 <strong>A: </strong>
                 {employee.address}
               </GridItem>
               <GridItem rowStart={3} colStart={2} colSpan={4}>
                 <strong>P: </strong>
                 {employee.phone}
               </GridItem>
               <GridItem rowStart={4} colStart={2} colSpan={4}>
                 <strong>E: </strong>
                 {employee.email}
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
