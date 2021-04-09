import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import {ExteriorEstimate} from './components/ExteriorEstimate/ExteriorEstimate'
import {InteriorEstimate} from './components/InteriorEstimate/InteriorEstimate'
import {CabinetEstimate} from './components/CabinetEstimate/CabinetEstimate'
import {CashEntry} from './components/CashEntry/CashEntry'
import {Home} from './components/Home/Home'
import {NoMatch} from './components/NoMatch/NoMatch'
import {NavigationBar} from './components/NavigationBar/NavigationBar'

function App() {
  return (
    <React.Fragment>
      <NavigationBar/>
        <Router>
          <Switch>
            <Route exact path ="/" component={Home} />
            <Route exact path ="/exterior-estimate" component={ExteriorEstimate} />
            <Route exact path ="/interior-estimate" component={InteriorEstimate} />
            <Route exact path ="/cabinet-estimate" component={CabinetEstimate} />
            <Route exact path ="/cash-entry" component={CashEntry} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
