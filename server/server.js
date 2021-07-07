const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const path = require('path');

const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware
});

server.applyMiddleware({ app });

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Serve up static assets
app.use('/images', express.static(path.join(__dirname, '../client/images')));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
    console.log(`Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`);
  });
});


// // This is your real test secret API key.
// const stripe = require("stripe")(sk_test_51J9IXHF9OL10HIOg6r2H0mwKo4ZrYMnJv65Oqc9UU9XXgPWxaQ3Fb7Th2k0M3Ewvadvt9QEwTMoFlWcmI4jhUD5M00cAiiuIYB);

// app.use(express.static("."));
// app.use(express.json());

// const calculateOrderAmount = invoice => {
//   // Replace this constant with a calculation of the order's amount
//   // Calculate the order total on the server to prevent
//   // people from directly manipulating the amount on the client
//   return 1400;
// };

// app.post("/create-payment-intent", async (req, res) => {
//   const { invoice } = req.body;
//   // Create a PaymentIntent with the order amount and currency
//   const paymentIntent = await stripe.paymentIntents.create({
//    amount: 1000,
//     currency: "usd"
//   });

//   res.send({
//     clientSecret: paymentIntent.client_secret
//   });
// });

// app.listen(4242, () => console.log('Node server listening on port 4242!'));
