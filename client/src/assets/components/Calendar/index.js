import { useContext } from "react";
import { Link, useParams } from "react-router-dom";
import { useMediaQuery } from "../../../utils/helpers";
import FullCalendar from "@fullcalendar/react"; // must go before plugins
import dayGridPlugin from "@fullcalendar/daygrid"; // a plugin!
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { useQuery } from "@apollo/react-hooks";
import { QUERY_APPOINTMENTS } from "../../../database/queries";
import { Box, Button, Spinner, Center } from "@chakra-ui/react";

//TODO: Render appointments in Calendar, figure out how to interact with appointments.
//fullcalendar.io
function Calendar(props) {
  //const { user } = useStoreContext(user);
  let isPageWide = useMediaQuery("(min-width: 800px)");
  const workOrders = [];
  const events = [];
  const { loading, data } = useQuery(QUERY_APPOINTMENTS);

  const handleDateClick = (clickInfo) => {
    //TODO: Redirect to single appointment detail page

    console.log('id', clickInfo.event.id)
    //<Link to={`workorder/:${clickInfo.event.id}} />;
  };

  if (data) {
    data.clients.map(client => {
      if (client.workOrders.length) {
        workOrders.push(
          client.workOrders.map(workOrder => {
            return {
              id: workOrder._id,
              title: workOrder.workOrderClient,
              start: new Date(parseInt(workOrder.workOrderDate)).toISOString().replace(/T.*$/, ''),
              workOrderDescription: workOrder.workOrderDescription
            };
          })
        );
      }
    });
    for (let i = 0; i < workOrders.length; i++) {
      let innerArrayLength = workOrders[i].length;

      for (let j = 0; j < innerArrayLength; j++) {
        events.push(workOrders[i][j]);
      }
    }
  }


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

  if (data) {

    try {
      // const myEventsObj = data.clients.map(client => (
      //   client.workOrders.map(wo => (
      //       {
      //         id: wo._id,
      //         title: `${client.firstName} ${client.lastName}`,
      //         start: `${wo.workOrderDate.toLocaleString()}`,
      //         description: wo.workOrderDescription
      //       }, 
      console.log('events', events)


      //console.log(myEventsArr);
    } catch (err) {
      console.log(err);
    }

    return (
      <>
        <Box h="85vh" overflow="hidden">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: "prev, next, today, addWorkOrder",
              center: "title",
              right: "dayGridMonth, timeGridWeek, timeGridDay"
            }}
            editable={true}
            initialEvents={events}
            selectable={true}
            weekends={true}
            eventClick={handleDateClick}
            customButtons={{
              addWorkOrder: {
                text: 'New Work Order',
                click: function() {
                  window.location.replace('/addWorkOrder')}
                }
              }
            }
            //events={events}
          />
        </Box>
      </>
    );
  } else {
    return (
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        //dateClick={handleDateClick}
        //events={myEvents}
      />
    );
  }
}
export default Calendar;