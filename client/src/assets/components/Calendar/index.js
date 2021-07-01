import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMediaQuery } from '../../../utils/helpers';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useQuery } from '@apollo/react-hooks';
import { QUERY_APPOINTMENTS } from '../../../database/queries';


//TODO: Render appointments in Calendar, figure out how to interact with appointments.  
//fullcalendar.io
function Calendar(props) {
  //const { user } = useStoreContext(user);
  let isPageWide = useMediaQuery('(min-width: 800px)');
  const data = useQuery(QUERY_APPOINTMENTS);
  //const events = data.clients.workorders; //TODO: Is this path right????
  //const myEvents = events.filter(user.id === event.employee.id)  //TODO: Check logic when data has been imported
  const handleDateClick = () => {
    
    //TODO: Redirect to single appointment detail page
    <Link to={`workorder/:id`} />
  };

    if (isPageWide) {
          return (
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        headerToolbar={{
          left: 'prev, next, today',
          center: 'title',
          right: 'dayGridMonth, timeGridWeek, timeGridDay'
        }}
        editable={true}
        selectable={true}
        weekends={true}
        //events={events}
      />
    


    )
  } else {

    return (
      <FullCalendar
        plugins={[timeGridPlugin]}
        initialView="timeGridDay"
        //dateClick={handleDateClick}
        //events={myEvents}

        />
    )
  }
};
  export default Calendar;