import { useState } from 'react';
import { Center, Box } from '@chakra-ui/react';
import Search from '../components/Search';
import { useQuery } from '@apollo/react-hooks';
import QUERY_CLIENTS_SHORT from '../../database/queries';



function Clients () {
     //define search area
     const { search } = window.location;
     //query clients list from database
     const clients = useQuery(QUERY_CLIENTS_SHORT);
     //search query is whatever is typed into searchbar
     const query = new URLSearchParams(search).get('searchbar');
     //set state of clients
     const [searchQuery, setSearchQuery] = useState(query || '');
     //filter clients based on search text and populate on page
     const filteredClients = filterClients(clients, searchQuery);

     const filterClients = (clients, query) => {
          //return entire list if nothing is in search bar
          if (!query) {
               return clients;
          }
          //adjust list based on case-insensitive text
          return clients.filter((client) => {
               const clientName = client.name.toLowerCase();
               return clientName.includes(query);
          });
     };

     return (
     <>
          <Search
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
          />
          <Center>
               {filteredClients.map(client => (
                    <Box 
                         as="a"
                         backgroundColor="brand.400"
                         color="brand.200"
                         key={client._id}
                         name={client._id}
                         href={`/clients/${client._id}`}
                    >
                         <Box>
                              {client.name}
                         </Box>
                         <Box>
                              {client.address}
                         </Box>
                         </Box>
               ))};   
          </Center>
     </>
     )         
};

export default Clients;