import { useState } from 'react';
import { Center, Box, SimpleGrid } from '@chakra-ui/react';
import Search from '../components/Search';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_DOCUMENTS_SHORT } from '../../database/queries';



function Documents () {
     //define search area
     const { search } = window.location;
     //query clients list from database
     const documents = useQuery(QUERY_DOCUMENTS_SHORT);


     //search query is whatever is typed into searchbar
     const query = new URLSearchParams(search).get('searchbar');
     //set state of clients
     const [searchQuery, setSearchQuery] = useState(query || '');
     const filterDocuments = (documents, query) => {
          //return entire list if nothing is in search bar
          if (!query) {
               return documents;
          }
          //adjust list based on case-insensitive text
          return documents.filter((document) => {
               const documentName = document.name.toLowerCase();
               return documentName.includes(query);
          });
     };
     
     //filter clients based on search text and populate on page
     const filteredDocuments = filterDocuments(documents, searchQuery);
     console.log(filteredDocuments);
     return (
     <>
          <Search
               searchQuery={searchQuery}
               setSearchQuery={setSearchQuery}
               searchCategory= "documents"
          />
          <Center>
               <SimpleGrid>
                    {filteredDocuments.map(document => (
                    <Box 
                         as="a"
                         backgroundColor="brand.400"
                         color="brand.200"
                         key={document._id}
                         name={document._id}
                         href={`/documents/${document._id}`}
                    >
                         <Box>
                              {document.name}
                         </Box>
                         <Box>
                              {document.description}
                         </Box>
                         </Box>
               ))}  
               </SimpleGrid>
 
          </Center>
     </>
     )         
};

export default Documents;