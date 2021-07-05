//const faker = require('faker');

const db = require('./connection');
const mongoose = require('mongoose');
const WorkOrder = require('../models/WorkOrder');


db.once('open', async () => {
     //await WorkOrder.deleteMany();

     await WorkOrder.create({
          workOrderDate: Date.now(),
          workOrderDescription: 'some test fields here',
          workOrderNotes: [],
          workOrderParts: [],
          workOrderInvoice: [],
          workOrderBillableTime: []
     })

     // const testWorkOrder = await WorkOrder.insert({
     //      workOrderDate: Date.now(),
     //      workOrderDescription: 'some test fields here',
     //      workOrderNotes: [],
     //      workOrderParts: [],
     //      workOrderInvoice: [],
     //      workOrderBillableTime: []
     // });

     console.log('seed complete');
     process.exit();
})