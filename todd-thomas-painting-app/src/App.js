import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ExteriorEstimate } from "./components/ExteriorEstimate/ExteriorEstimate";
import { ServiceEstimate } from "./components/ServiceEstimate/ServiceEstimate";
import { CabinetEstimate } from "./components/CabinetEstimate/CabinetEstimate";
import { CashEntry } from "./components/CashEntry/CashEntry";
import { PastEstimates } from "./components/PastEstimates/PastEstimates";
import { Invoice } from "./components/Invoice/Invoice";
import Map from "./components/Map/Map";
import { Home } from "./components/Home/Home";
import { NoMatch } from "./components/NoMatch/NoMatch";
import { NavigationBar } from "./components/NavigationBar/NavigationBar";


function App() {
  return (
    <React.Fragment>
      <NavigationBar />
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/exterior-estimate" component={ExteriorEstimate} />
          <Route exact path="/service-estimate" component={ServiceEstimate} />
          <Route exact path="/cabinet-estimate" component={CabinetEstimate} />
          <Route exact path="/invoice" component={Invoice} />
          <Route exact path="/cash-entry" component={CashEntry} />
          <Route exact path="/past-estimates" component={PastEstimates} />
          <Route exact path="/map" component={Map} />
          <Route component={NoMatch} />
        </Switch>
      </Router>
    </React.Fragment>
  );
}

export default App;
