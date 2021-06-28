import React from 'react'
import FullCalendar from '@fullcalendar/react' // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid' // a plugin!

//TODO: Render appointments in Calendar, figure out how to interact with appointments.
//fullcalendar.io
function Calendar() {
    return (
      <FullCalendar
        plugins={[ dayGridPlugin ]}
        initialView="dayGridMonth"
        events={[
             { title: 'event 1', date: '2021-06-27'}
        ]}
      />
    )
  }

  export default Calendar;