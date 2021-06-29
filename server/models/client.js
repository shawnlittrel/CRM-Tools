const { Schema, model } = require("mongoose");
const dateFormat = require("../utils/dateFormat");



clients: {
  {
  id,
  name,
  address,
  email,
  phone,
  workOrders {
    id,
    date,
    description,
    notes [],
    parts [],
    invoice
    timeClock {
      dispatched
      arrived
      departed
    }
  }
  }