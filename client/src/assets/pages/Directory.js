import { useState } from 'react';
import { Center, Box, SimpleGrid } from '@chakra-ui/react';
import Search from '../components/Search';
import { useQuery } from '@apollo/react-hooks';
import QUERY_EMPLOYEES_SHORT from '../../database/queries';



function Employees () {
     //define search area
     const { search } = window.location;
     //query clients list from database
     const employees = useQuery(QUERY_EMPLOYEES_SHORT);

     
     // const employees = [
     //      {
     //           _id: 1,
     //           name: 'test1',
     //           address: '123 Test',
     //           email: 'test@test.com',
     //           phone: '555-555-5555'
     //      },
     //      {
     //           _id: 2,
     //           name: 'test2',
     //           address: '123 Test',
     //           email: 'test1@test.com',
     //           phone: '555-555-5554'
     //      }
     // ]
     //search query is whatever is typed into searchbar
     const query = new URLSearchParams(search).get('searchbar');
     //set state of clients
     const [searchQuery, setSearchQuery] = useState(query || '');
     const filterEmployees = (employees, query) => {
          //return entire list if nothing is in search bar
          if (!query) {
               return employees;
          }
          //adjust list based on case-insensitive text
          return employees.filter((employee) => {
               const employeeName = employee.name.toLowerCase();
               return employeeName.includes(query);
          });
     };
     console.log('query', query);
     
     //filter clients based on search text and populate on page
     const filteredEmployees = filterEmployees(employees, searchQuery);
     console.log(filteredEmployees);
     return (
     <>
          <Search
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
               searchCategory= "employees"
          />
          <Center>
               <SimpleGrid>
                    {filteredEmployees.map(employee => (
                    <Box 
                         as="a"
                         backgroundColor="brand.400"
                         color="brand.200"
                         key={employee._id}
                         name={employee._id}
                         href={`/clients/${employee._id}`}
                    >
                         <Box>
                              {employee.name}
                         </Box>
                         <Box>
                              {employee.email}
                         </Box>
                         </Box>
               ))}  
               </SimpleGrid>
 
          </Center>
     </>
     )         
};

export default Employees;