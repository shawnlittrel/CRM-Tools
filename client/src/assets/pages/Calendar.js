//DEPRECATED

// import { useState } from "react";
// import { Center, Box, Grid, GridItem, Spinner } from "@chakra-ui/react";
// import Search from "../components/Search";
// import { useQuery } from "@apollo/react-hooks";
// import { QUERY_APPOINTMENTS } from "../../database/queries";

// function Calendar() {
//   //define search area
//   const { search } = window.location;
//   //query appointment list from database
//   const { loading, data } = useQuery(QUERY_APPOINTMENTS);
//   const workOrders = [];
//   let consolidatedWorkOrders = [];

//   if (data) {
//     data.clients.map(client => {
//       if (client.workOrders.length) {
//         console.log("wo", client.workOrders);
//         workOrders.push(
//           client.workOrders.map(workOrder => {
//             return {
//               workOrderId: workOrder._id,
//               clientName: workOrder.workOrderClient,
//               workOrderDate: workOrder.workOrderDate,
//               workOrderDescription: workOrder.workOrderDescription
//             };
//           })
//         );
//       }
//     });
//     for (let i = 0; i < workOrders.length; i++) {
//       let innerArrayLength = workOrders[i].length;

//       for (let j = 0; j < innerArrayLength; j++) {
//         consolidatedWorkOrders.push(workOrders[i][j]);
//       }
//     }
//     console.log('wo', consolidatedWorkOrders);
//   }

//     //search query is whatever is typed into searchbar
//     const query = new URLSearchParams(search).get("searchbar");
//     //set state of clients
//     const [searchQuery, setSearchQuery] = useState(query || "");
//     const filterWorkOrders = (workOrders, query) => {
//       //return entire list if nothing is in search bar
//       if (!query) {
//         return workOrders;
//       }
//       //adjust list based on case-insensitive text
//       return workOrders.filter(workOrder => {
//         const clientQuery = workOrder.clientName.toLowerCase();
//         return clientQuery.includes(query);
//       });
//     };

//     //filter clients based on search text and populate on page
//     const filteredWorkOrders = filterWorkOrders(consolidatedWorkOrders, searchQuery);

//     if(loading) return (
//       <Center>
//             <Spinner
//         thickness="5px"
//         emptyColor="brand.300"
//         color="brand.100"
//         size="xl"
//       />
//       </Center>
//     )

//   return (
//        <>
//        <Search
//          searchQuery={searchQuery}
//          setSearchQuery={setSearchQuery}
//          searchCategory="Employees"
//          margin="10px"
//          key="search"
//        />
//        <br />
//        <Grid gap={4}>
//          {filteredWorkOrders.map(workOrder => (
//            <Center key={`container${workOrder.workOrderId}`}>
//              <Box
//                as="a"
//                backgroundColor="brand.300"
//                color="brand.200"
//                key={workOrder.workOrderId}
//                name={workOrder.workOrderId}
//                href={`/workorders/${workOrder.workOrderId}}`}
//                margin="2px"
//                w="80%"
//              >
//                <Grid
//                  templateRows="repeat(5, 1fr)"
//                  templateColumns="repeat(6, 1fr)"
//                  gap={1}
//                >
//                  <GridItem colSpan={5} color="brand.100">
//                    <strong>{workOrder.clientName}</strong>
//                  </GridItem>
//                  <GridItem rowStart={2} colStart={2} colSpan={4}>
//                    <strong>Date: </strong>
//                    {workOrder.workOrderDate}
//                  </GridItem>
//                  <GridItem rowStart={3} colStart={2} colSpan={4}>
//                    <strong>Description </strong>
//                    {workOrder.workOrderDescription}
//                  </GridItem>
//                </Grid>
//              </Box>
//            </Center>
//          ))}
//        </Grid>
//      </>
//       );
// }

// export default Calendar;
