import { useState } from "react";
import { Box, Grid, GridItem, Center } from "@chakra-ui/react";
import Search from "../components/Search";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_CLIENTS_SHORT } from "../../database/queries";

function Clients() {
  //define search area
  const { search } = window.location;
  //query clients list from database
  //const clients = useQuery(QUERY_CLIENTS_SHORT)

  const clients = [
    {
      _id: 1,
      name: "test1",
      address: "123 Test",
      email: "test@test.com",
      phone: "555-555-5555"
    },
    {
      _id: 2,
      name: "test2",
      address: "123 Test",
      email: "test1@test.com",
      phone: "555-555-5554"
    }
  ];
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
      const clientName = client.name.toLowerCase();
      return clientName.includes(query);
    });
  };
  console.log("query", query);

  //filter clients based on search text and populate on page
  const filteredClients = filterClients(clients, searchQuery);
  console.log(filteredClients);
  return (
    <>
      <Search
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        searchCategory="Clients"
        margin="10px"
      />
      <br />
      <Grid gap={4}>
        {filteredClients.map(client => (
          <Center>
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
              <Grid
                templateRows="repeat(5, 1fr)"
                templateColumns="repeat(6, 1fr)"
                gap={1}
              >
                <GridItem colSpan={5} color="brand.100">
                  <strong>{client.name}</strong>
                </GridItem>
                <GridItem rowStart={2} colStart={2} colSpan={4}>
                  <strong>A: </strong>
                  {client.address}
                </GridItem>
                <GridItem rowStart={3} colStart={2} colSpan={4}>
                  <strong>P: </strong>
                  {client.phone}
                </GridItem>
                <GridItem rowStart={4} colStart={2} colSpan={4}>
                  <strong>E: </strong>
                  {client.email}
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
