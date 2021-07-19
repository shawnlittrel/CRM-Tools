import { useHistory } from "react-router-dom";
import { ApolloProvider } from "@apollo/react-hooks";
import ApolloClient from "apollo-boost";
import { StoreProvider } from "./state/State";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "./utils/theme";
import { useMediaQuery } from "./utils/helpers";
import {BrowserRouter as Router } from 'react-router-dom';

//import components and pages
import Routes from "./assets/components/Routes";
import SideNav from "./assets/components/SideNav";
import FooterNav from "./assets/components/FooterNav";

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
  //set breakpoint for mobile and desktop apps
  const pageIsWide = useMediaQuery("(min-width: 800px)");
  //manually position footerNav
  const footerStyle = {
    overflow: "hidden",
    position: "fixed",
    bottom: "0",
    width: "100%",
    height: "5vh"
  };

  //render desktop app
  if (pageIsWide) {
    return (
      <ApolloProvider client={client}>
        <ChakraProvider theme={theme}>
          <StoreProvider>
              <SideNav />
          </StoreProvider>
        </ChakraProvider>
      </ApolloProvider>
    );
  }

  //render mobile app
  return (
    <ApolloProvider client={client}>
      <ChakraProvider theme={theme}>
        <StoreProvider>
          <Routes />
          <div style={footerStyle}>
            <FooterNav />
          </div>
        </StoreProvider>
      </ChakraProvider>
    </ApolloProvider>
  );
}

export default App;
