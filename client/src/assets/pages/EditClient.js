import { useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { QUERY_CLIENTS_SHORT } from '../../database/queries';
import { EDIT_CLIENT, DELETE_CLIENT } from '../../database/mutations';
import {
     Center,
     Spinner,
     Button,
     Grid,
     GridItem,
     TextArea
} from '@chakra-ui/react';

function EditClient() {
     //define queries and mutations
     const { loading, data } = useQuery(QUERY_CLIENTS_SHORT);
     const [saveUpdatedClient, { loading: updateLoading, error: updateError }] = useMutation(EDIT_CLIENT);

     const [deleteEmployee, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_CLIENT);

     //set up list of clients for search/manipulation
     let clients;
     if(data) {
          clients = data.clients;
     }

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

     return (
          <Box>
            <Center>
              <Heading as="h2">Edit An Employee</Heading>
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
              <GridItem rowStart={3} colStart={3} colEnd={7}>
                <FormControl id="address" isRequired>
                  <FormLabel>Employee Address</FormLabel>
                  <Input placeholder="Address" onChange={handleFormChange} />
                </FormControl>
              </GridItem>
              <GridItem rowStart={3} colStart={7} colEnd={11}>
                <FormControl id="email" isRequired>
                  <FormLabel>Employee Email</FormLabel>
                  <Input placeholder="Email" onChange={handleFormChange} />
                </FormControl>
              </GridItem>
              <GridItem rowStart={4} colStart={3} colEnd={7}>
                <FormControl id="phone-number" isRequired>
                  <FormLabel>Employee Phone Number</FormLabel>
                  <Input placeholder="XXX-XXX-XXXX" onChange={handleFormChange} />
                  <FormHelperText>Please use XXX-XXX-XXXX format.</FormHelperText>
                </FormControl>
              </GridItem>
              <GridItem rowStart={6} colStart={3} colEnd={7}>
                {mutationLoading ? (
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
                    colorScheme="error"
                    onClick={handleDelete}
                  >
                    DELETE CLIENT
                  </Button>
                )}
              </GridItem>
              <GridItem rowStart={6} colStart={7} colEnd={11}>
                {mutationLoading ? (
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
};

export default EditClient;