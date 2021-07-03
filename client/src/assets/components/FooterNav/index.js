import { Box, SimpleGrid } from "@chakra-ui/react";
import * as React from "react";
import { Icon, Button } from "@chakra-ui/react";
import {
  AiFillHome,
  AiOutlineCalendar,
  AiOutlineClockCircle
} from "react-icons/ai";
import Auth from "../../../utils/auth";

function Footer() {
  const handleClick = event => {
    event.preventDefault();
    console.log(event.target.value);
    window.location.replace(event.target.value);
  };

  if (Auth.loggedIn) {
    return (
      <Box as="footer" role="contentinfo" mx="auto" style={{ height: "100%" }}>
        <SimpleGrid
          as="footer"
          columns={3}
          display="flex"
          alignItems="center"
          className="colorPrimary"
          justifyContent="space-around"
          bg="brand.100"
          color="brand.200"
          spacingX="10px"
        >
          <Button
            value="/schedule"
            onClick={handleClick}
            backgroundColor="brand.100"
            w="30%"
          >
            <AiOutlineCalendar />
          </Button>
          <Button
            value="/home"
            onClick={handleClick}
            backgroundColor="brand.100"
            w="30%"
          >
            <AiFillHome />
          </Button>
          <Button
            value="/timecard"
            onClick={handleClick}
            backgroundColor="brand.100"
            w="30%"
          >
            <AiOutlineClockCircle />
          </Button>
        </SimpleGrid>
      </Box>
    );
  } else return <></>;
}

export default Footer;
