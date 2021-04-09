import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom' 
import {ExteriorEstimate} from './components/ExteriorEstimate/ExteriorEstimate'
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
            <Route component={NoMatch} />
          </Switch>
        </Router>
    </React.Fragment>
  );
}

export default App;
