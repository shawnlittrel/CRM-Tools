import { useState } from "react";
import { Box, Grid, GridItem, Center, Spinner, Heading, Container } from "@chakra-ui/react";
import Search from "../components/Search";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CLIENTS_SHORT } from "../../database/queries";

function Clients() {
  //define search area
  const { search } = window.location;
  //query clients list from database
  const { loading, data } = useQuery(QUERY_CLIENTS_SHORT);
  let clients;

  if (data) {
    clients = data.clients;
  }

  //search query is whatever is typed into searchbar
  const query = new URLSearchParams(search).get("searchbar");
  //set state of clients
  const [searchQuery, setSearchQuery] = useState(query || "");
  const filterClients = (clients, query) => {
    //return entire list if nothing is in search bar
    if (!query) {
      return clients;
    }
    //adjust list based on case-insensitive text
    return clients.filter(client => {
      const clientName = client.firstName.toLowerCase();
      return clientName.includes(query);
    });
  };

  //filter clients based on search text and populate on page
  const filteredClients = filterClients(clients, searchQuery);

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

  //display data once available
  return (
    <>
      <Heading as="h2" size="xl" textAlign="center">Clients: </Heading>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchCategory="Clients"
        margin="10px"
      />
      <br />
      <Grid gap={4}>
        {filteredClients.map(client => (
          <Center key={`container${client._id}`}>
            <Box
              as="a"
              backgroundColor="brand.300"
              color="brand.200"
              key={client._id}
              name={client._id}
              href={`/clients/${client._id}`}
              margin="2px"
              w="80%"
            >
              <Grid templateRows="repeat(4, 1fr)" templateColumns="repeat(12, 1fr)" gap={1}>
                <GridItem colStart={1} colSpan={12} rowStart={1}>
                  <Box color="brand.100">
                    <strong>
                      {client.firstName} {client.lastName}
                    </strong>
                  </Box>
                </GridItem>
                <GridItem colStart={4} rowStart={2} colSpan={10}>
                  <Box fontSize="sm">
                    <strong>A: </strong> {client.address}
                  </Box>
                </GridItem>
                <GridItem colStart={4} rowStart={3} colSpan={9}>
                  <Box fontSize="sm">
                    <strong>P: </strong> {client.phone}
                  </Box>
                </GridItem>
                <GridItem colStart={4} rowStart={4} colSpan={8}>
                  <Box fontSize="sm">
                    <strong>E: </strong> {client.email}
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

export default Clients;
