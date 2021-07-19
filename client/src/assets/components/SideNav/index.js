import {
  Avatar,
  Box,
  Collapse,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  Icon,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useColorModeValue,
  useDisclosure
} from "@chakra-ui/react";
import { FaBell, FaClipboardCheck, FaRss } from "react-icons/fa";
import { AiFillGift } from "react-icons/ai";
import { BsGearFill } from "react-icons/bs";
import {
  FiMenu,
  FiSearch,
  FiCalendar,
  FiPlus,
  FiMonitor,
  FiX,
  FiDollarSign,
  FiFileText,
  FiUsers,
  FiUserPlus,
  FiUserMinus,
  FiUserCheck,
  FiBox
} from "react-icons/fi";
import { RiCustomerService2Fill, RiCustomerServiceFill } from "react-icons/ri";
import { HiCode, HiCollection } from "react-icons/hi";
import { MdHome, MdKeyboardArrowRight } from "react-icons/md";
import { ReactComponent as Shield } from "../../images/shield.svg";
import { useHistory } from "react-router-dom";
import Routes from "../Routes";

export default function App() {
  const sidebar = useDisclosure();
  const integrations = useDisclosure();
  const employeesMenu = useDisclosure();
  const clientsMenu = useDisclosure();
  let history = useHistory();

  // function handleClick(target) {
  //   //console.log("value", target);
  //   history.push(target);
  // }

  const NavItem = props => {
    const { icon, children, ...rest } = props;
    return (
      <Flex
        align="center"
        px="4"
        pl="4"
        py="3"
        cursor="pointer"
        color={useColorModeValue("inherit", "gray.400")}
        _hover={{
          bg: useColorModeValue("gray.100", "gray.900"),
          color: useColorModeValue("gray.900", "gray.200")
        }}
        role="group"
        fontWeight="semibold"
        transition=".15s ease"
        {...rest}
      >
        {icon && (
          <Icon
            mr="2"
            boxSize="4"
            _groupHover={{
              color: "brand.100"
            }}
            as={icon}
          />
        )}
        {children}
      </Flex>
    );
  };

  const SidebarContent = props => (
    <Box
      as="nav"
      pos="fixed"
      top="0"
      left="0"
      zIndex="sticky"
      h="full"
      pb="10"
      overflowX="hidden"
      overflowY="auto"
      bg={useColorModeValue("white", "gray.800")}
      borderColor={useColorModeValue("inherit", "gray.700")}
      borderRightWidth="1px"
      w="60"
      {...props}
    >
      <Flex px="4" py="5" align="center">
        <Shield />
        <Text
          fontSize="2xl"
          ml="2"
          color={useColorModeValue("brand.500", "white")}
          fontWeight="semibold"
        >
          Trade Secret
        </Text>
      </Flex>
      <Flex
        direction="column"
        as="nav"
        fontSize="sm"
        color="gray.600"
        aria-label="Main Navigation"
      >
        <NavItem icon={MdHome} onClick={() => window.location.replace("/")}>
          Home
        </NavItem>
        <NavItem icon={RiCustomerService2Fill} onClick={clientsMenu.onToggle}>
          Clients
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={clientsMenu.isOpen}>
          <NavItem
            pl="12"
            py="2"
            icon={RiCustomerServiceFill}
            onClick={() => window.location.replace("/clients")}
          >
            View Clients
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            icon={FiPlus}
            onClick={() => window.location.replace("/addClient")}
          >
            Create New Client
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            icon={FiX}
            onClick={() => window.location.replace("/editClient")}
          >
            Edit Client
          </NavItem>
        </Collapse>
        <NavItem icon={FiUsers} onClick={employeesMenu.onToggle}>
          Employees
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={employeesMenu.isOpen}>
          <NavItem
            pl="12"
            py="2"
            icon={FiUserCheck}
            onClick={() => window.location.replace("/directory")}
          >
            View Employees
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            icon={FiUserPlus}
            onClick={() => window.location.replace("/addEmployee")}
          >
            Create New Employee
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            icon={FiUserMinus}
            onClick={() => window.location.replace("/editEmployee")}
          >
            Edit Employee
          </NavItem>
        </Collapse>
        <NavItem
          icon={FiCalendar}
          onClick={() => window.location.replace("/schedule")}
        >
          Schedule
        </NavItem>
        <NavItem icon={FiFileText} onClick={integrations.onToggle}>
          Work Orders
          <Icon
            as={MdKeyboardArrowRight}
            ml="auto"
            transform={integrations.isOpen && "rotate(90deg)"}
          />
        </NavItem>
        <Collapse in={integrations.isOpen}>
          <NavItem pl="12" py="2" icon={FiMonitor}>
            View Work Orders
          </NavItem>
          <NavItem
            pl="12"
            py="2"
            icon={FiPlus}
            onClick={() => window.location.replace("/addWorkOrder")}
          >
            Create Work Order
          </NavItem>
          <NavItem pl="12" py="2" icon={FiDollarSign}>
            Invoice Work Orders
          </NavItem>
        </Collapse>
        <NavItem icon={FiBox} onClick={() => history.push("/warehouse")}>
          Warehouse
        </NavItem>
        <NavItem icon={BsGearFill}>Settings</NavItem>
      </Flex>
    </Box>
  );
  return (
    <Box
      as="section"
      bg={useColorModeValue("gray.50", "gray.700")}
      minH="100vh"
    >
      <SidebarContent display={{ base: "none", md: "unset" }} />
      <Drawer
        isOpen={sidebar.isOpen}
        onClose={sidebar.onClose}
        placement="left"
      >
        <DrawerOverlay />
        <DrawerContent>
          <SidebarContent w="full" borderRight="none" />
        </DrawerContent>
      </Drawer>
      <Box ml={{ base: 0, md: 60 }} transition=".3s ease">
        <Flex
          as="header"
          align="center"
          justify="space-between"
          w="full"
          px="4"
          bg={useColorModeValue("white", "gray.800")}
          borderBottomWidth="1px"
          borderColor={useColorModeValue("inherit", "gray.700")}
          h="14"
        >
          <IconButton
            aria-label="Menu"
            display={{ base: "inline-flex", md: "none" }}
            onClick={sidebar.onOpen}
            icon={<FiMenu />}
            size="sm"
          />
        </Flex>

        <Box as="main" p="4">
          <Routes />
        </Box>
      </Box>
    </Box>
  );
}
