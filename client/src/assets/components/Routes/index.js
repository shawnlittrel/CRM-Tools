import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { useMediaQuery } from "../../../utils/helpers";
import Auth from "../../../utils/auth";

//import components and pages
import Home from "../../pages/Home";
import Calendar from "../Calendar";
//import Calendar from "../../pages/Calendar";
import Timecard from "../../pages/Timecard";
import Directory from "../../pages/Directory";
import Customers from "../../pages/Clients";
import Inventory from "../../pages/Warehouse";
import Documents from "../../pages/Documents";
import AddWorkOrder from "../../pages/AddWorkOrder";
import Stripe from "../../pages/Stripe.jsx";
import Login from "../../pages/Login";
import AddClient from '../../pages/AddClient';
import AddEmployee from '../../pages/AddEmployee';

function Routes() {
  const loggedIn = Auth.loggedIn();

  if (!loggedIn) {
    return <Login />;
  }

  return (
<Router>
      <div className="pageWrapper" height="100%" background-color="#E0FBFC">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/timecard" component={Timecard} />
          <Route exact path="/schedule" component={Calendar} />
          <Route exact path="/directory" component={Directory} />
          <Route exact path="/clients" component={Customers} />
          <Route exact path="/warehouse" component={Inventory} />
          <Route exact path="/documents" component={Documents} />
          <Route exact path="/addWorkOrder" component={AddWorkOrder} />
          <Route exact path="/stripe" component={Stripe} />
          <Route exact path="/addEmployee" component={AddEmployee} />
          <Route exact path="/addClient" component={AddClient} />
        </Switch>
      </div>
</Router>
  );
}

export default Routes;
