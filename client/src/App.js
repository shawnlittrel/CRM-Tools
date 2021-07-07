import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { StoreProvider } from "./state/State";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./utils/theme";
import Auth from './utils/auth';

//import components and pages
import Home from "./assets/pages/Home";
import Register from "./assets/pages/Register";
import Login from "./assets/pages/Login";
import Footer from "./assets/components/FooterNav";
import Schedule from './assets/components/Calendar';
import Timecard from './assets/pages/Timecard';
import Directory from './assets/pages/Directory';
import Customers from './assets/pages/Clients';
import Inventory from './assets/pages/Warehouse';
import Documents from './assets/pages/Documents';
import Stripe from './assets/pages/Stripe'
import AddWorkOrder from './assets/pages/AddWorkOrder';

const client = new ApolloClient({
  request: operation => {
    const token = localStorage.getItem("id_token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : ""
      }
    });
  },
  uri: "/graphql"
});

function App() {
  document.body.style = "background: #E0FBFC";

  const footerStyle = {
    overflow: "hidden",
    position: "fixed",
    bottom: "0",
    width: "100%",
    height: "5vh"
  };

  //const loggedIn = Auth.loggedIn();

    return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <Router>
          <StoreProvider>
            <div
              className="pageWrapper"
              height="100%"
              background-color="#E0FBFC"
              zIndex="-1"
            >
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/timecard" component={Timecard} />
                <Route exact path="/schedule" component={Schedule} />
                <Route exact path="/directory" component={Directory} />
                <Route exact path="/clients" component={Customers} />
                <Route exact path="/warehouse" component={Inventory} />
                <Route exact path="/documents" component={Documents} />
                <Route exact path= "/stripe" component={Stripe} />
                <Route exact path="/addWorkOrder" component={AddWorkOrder} />
              </Switch>
            </div>      
            <div style={footerStyle}>
              <Footer />
            </div>
          </StoreProvider>
        </Router>
      </ChakraProvider>
    </ApolloProvider>
  );
} 

export default App;
