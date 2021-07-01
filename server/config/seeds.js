// const faker = require("faker");

// const db = require("../config/connection");
// const { Thought, User } = require("../models");

// db.once("open", async () => {
//   await Thought.deleteMany({});
//   await User.deleteMany({});

//   // create user data
//   const userData = [];

//   for (let i = 0; i < 50; i += 1) {
//     const username = faker.internet.userName();
//     const email = faker.internet.email(username);
//     const password = faker.internet.password();

//     userData.push({ username, email, password });
//   }

//   const createdUsers = await User.collection.insertMany(userData);

//   // create friends
//   for (let i = 0; i < 100; i += 1) {
//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { _id: userId } = createdUsers.ops[randomUserIndex];

//     let friendId = userId;

//     while (friendId === userId) {
//       const randomUserIndex = Math.floor(
//         Math.random() * createdUsers.ops.length
//       );
//       friendId = createdUsers.ops[randomUserIndex];
//     }

//     await User.updateOne({ _id: userId }, { $addToSet: { friends: friendId } });
//   }

//   // create thoughts
//   let createdThoughts = [];
//   for (let i = 0; i < 100; i += 1) {
//     const thoughtText = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username, _id: userId } = createdUsers.ops[randomUserIndex];

//     const createdThought = await Thought.create({ thoughtText, username });

//     const updatedUser = await User.updateOne(
//       { _id: userId },
//       { $push: { thoughts: createdThought._id } }
//     );

//     createdThoughts.push(createdThought);
//   }

//   // create reactions
//   for (let i = 0; i < 100; i += 1) {
//     const reactionBody = faker.lorem.words(Math.round(Math.random() * 20) + 1);

//     const randomUserIndex = Math.floor(Math.random() * createdUsers.ops.length);
//     const { username } = createdUsers.ops[randomUserIndex];

//     const randomThoughtIndex = Math.floor(
//       Math.random() * createdThoughts.length
//     );
//     const { _id: thoughtId } = createdThoughts[randomThoughtIndex];

//     await Thought.updateOne(
//       { _id: thoughtId },
//       { $push: { reactions: { reactionBody, username } } },
//       { runValidators: true }
//     );
//   }

//   console.log("all done!");
//   process.exit(0);
// });
const faker = require('faker');

const db = require('./connection');
const {
    Employee
} = require('/..models');

db.once('open', async () => {
    await Employee.deleteMany({});
    await Client.deleteMany({});

    // create employee data
    const employeeData = [];

    for (let i = 0; i < 50; i += 1) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const address = faker.address.streetAddress();
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const phone = faker.phone.phoneNumber();
        // TODO add username and set email as?
        // TODO sort out timecard details

        employeeData.push({
            firstName,
            lastName,
            address,
            // cityName,
            // state,
            // zipCode,
            username,
            email,
            phone
        });
    }

    const createdEmployees = await Employee.collection.insertMany(employeeData);

    // create employees
    for (let i = 0; i < 100; i += 1) {
        const randomEmployeeIndex = Math.floor(Math.random() * createdEmployees.ops.length);
        const {
            _id: userId
        } = createdEmployees.ops[randomEmployeeIndex];

        let employeeId = userId;

        while (employeeId === userId) {
            const randomEmployeeIndex = Math.floor(Math.random() * createdEmployees.ops.length);
            employeeId = createdEmployees.ops[randomEmployeeIndex];
        }

        await Employee.updateOne({
            _id: userId
        }, {
            $addToSet: {
                employees: employeeId
            }
        });
    }

    // create client data
    const clientData = [];

    for (let i = 0; i < 100; i += 1) {
        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const address = faker.address.streetAddress();
        const username = faker.internet.userName();
        const email = faker.internet.email(username);
        const phone = faker.phone.phoneNumber();
        // TODO add username and set email as?
        // TODO sort out timecard details

        clientData.push({
            firstName,
            lastName,
            address,
            // cityName,
            // state,
            // zipCode,
            username,
            email,
            phone
        });
    }

    const createdClients = await Client.collection.insertMany(clientData);
   
    // create clients
    for (let i = 0; i < 50; i += 1) {
        const randomClientIndex = Math.floor(Math.random() * createdClients.ops.length);
        const {
            _id: userId
        } = createdClients.ops[randomClientIndex];

        let clientId = userId;

        while (clientId === userId) {
            const randomClientIndex = Math.floor(Math.random() * createdClients.ops.length);
            clientId = createdClients.ops[randomClientIndex];
        }

        await Client.updateOne({
            _id: userId
        }, {
            $addToSet: {
                clients: clientId
            }
        });
    }

    // create workorders
    let createdWorkOrders = []
    for (let i = 0; i < 100; i += 1) {
        const workOrderDate = faker.date.between('2021-06-28', '2021-08-15');
        const workOrderDescription = faker.lorem.words(Math.round(Math.random() * 10) + 1);
        const workOrderNotes = faker.lorem.words(Math.round(Math.random() * 20) + 1);
        const workOrderParts = [createdParts];
        const workOrderInvoice = [];
        const workOrderTimeClock = [];

        const randomClientIndex = Math.floor(Math.random() * createdClients.ops.length);
        const { username,
            _id: userId
        } = createdClients.ops[randomClientIndex];

        const createdWorkOrder = await WorkOrder.create({ workOrderDate, workOrderDescription, workOrderNotes, workOrderParts, workOrderInvoice, workOrderTimeClock, username });

        const updatedClient = await Client.updateOne(
            { _id: userId },
            { $push: { workOrders: createdWorkOrder._id } }
        );

        createdWorkOrders.push(createdWorkOrder);

        // get random parts
        // link parts to workorder
    }
   
    let createdParts = []
    for (let i = 0; i < 30; i += 1) {
        const partDepartment = faker.commerce.department();
        const partProductName = faker.commerce.productName();
        const partProductDescription = faker.commerce.productDescription();
        const partPrice = faker.commence.price();

        const randomWorkOrdersIndex = Math.floor(Math.random() * createdWorkOrders.ops.length);
        const { username, // Not sure how to link these to workorders
            _id: userId
        } = createdWorkOrders.ops[randomWorkOrdersIndex];

        const createdPart = await Part.create({ partDepartment, partProductName, partProductDescription, partPrice, username });

        const updatedWorkOrder = await Part.updateOne(
            { _id: userId },
            { $push: { Parts: createdPart._id } }
        );

        createdParts.push(createdPart);
    }

    // create invoice


    // const generatewWorkOrderData = clientsIds => {
    //     let workOrderData = [];
    //     let i = 0;

    //     while (i < 100) {
    //         const client_id = faker.random.arrayElement(clientsIds);
    //         const workOrderObject = faker.random.arrayElement(workOrders);
            // const date = faker
            // const description = faker.lorem.words(Math.round(Math.random() * 20) + 1);
    //     }
    // }

    console.log('seeding complete');
    process.exit(0);
})

// employees: {
//     {
//     id,
//     name,
//     address,
//     email,
//     phone,
//     timecard
//     }
//   }
//   clients: {
//     {
//     id,
//     name,
//     address,
//     email,
//     phone,
//     workOrders {
//       id,
//       date,
//       description,
//       notes [],
//       parts [],
//       invoice
//       timeClock {
//         dispatched
//         arrived
//         departed
//       }
//     }
//     }
//   }
//   warehouse {
//   [Parts],
//   [LaborItems]
//   }
//   Parts {
//     id,
//     name,
//     description,
//     purchasePrice,
//     salePrice,
//     quantityOnHand,
//   }
//   LaborItems {
//   id,
//   name,
//   description,
//   rate
//   }
