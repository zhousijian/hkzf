import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
// import TabBar from './demo/TabBar'
import Home from './home';
import Citylist from './cityList';
import Map from './map';
function App() {
  return (
    <div className="App">
      {/* <TabBar></TabBar> */}
      <Router>
        <Route exact path='/home' component={Home}></Route>
        <Route path='/'>
          <Redirect to='/home'></Redirect>
        </Route>
        <Route exact path='/cityList' component={Citylist}></Route>
        <Route exact path='/map' component={Map}></Route>
      </Router>
    </div>
  );
}

export default App;
