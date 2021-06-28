import { useState } from 'react';
import { Center, Box, SimpleGrid } from '@chakra-ui/react';
import Search from '../components/Search';
import { useQuery } from '@apollo/react-hooks';
import QUERY_WAREHOUSE_SHORT from '../../database/queries';



function Warehouse () {
     //define search area
     const { search } = window.location;
     //query warehouse list from database
     const warehouse = useQuery(QUERY_WAREHOUSE_SHORT);

     //search query is whatever is typed into searchbar
     const query = new URLSearchParams(search).get('searchbar');
     //set state of warehouse
     const [searchQuery, setSearchQuery] = useState(query || '');
     const filterWarehouse = (warehouse, query) => {
          //return entire list if nothing is in search bar
          if (!query) {
               return warehouse;
          }
          //adjust list based on case-insensitive text
          return warehouse.filter((product) => {
               const productName = product.name.toLowerCase();
               return productName.includes(query);
          });
     };
     console.log('query', query);
     
     //filter warehouse based on search text and populate on page
     const filteredWarehouse = filterWarehouse(warehouse, searchQuery);
     console.log(filteredWarehouse);
     return (
     <>
          <Search
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
               searchCategory= "warehouse"
          />
          <Center>
               <SimpleGrid>
                    {filteredWarehouse.map(product => (
                    <Box 
                         as="a"
                         backgroundColor="brand.400"
                         color="brand.200"
                         key={product._id}
                         name={product._id}
                         href={`/warehouse/${product._id}`}
                    >
                         <Box>
                              {product.name}
                         </Box>
                         <Box>
                              {product.description}
                         </Box>
                         </Box>
               ))}  
               </SimpleGrid>
 
          </Center>
     </>
     )         
};

export default Warehouse;