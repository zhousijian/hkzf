import React from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
// import TabBar from './demo/TabBar'
import Home from './pages/home';
import Citylist from './pages/cityList';
import Map from './pages/map';
function App() {
  return (
    <div className="App">
      {/* <TabBar></TabBar> */}
      <Router>
        <Route path='/home' component={Home}></Route>
        <Route exact path='/'>
          <Redirect to='/home'></Redirect>
        </Route>
        <Route exact path='/cityList' component={Citylist}></Route>
        <Route exact path='/map' component={Map}></Route>
      </Router>
    </div>
  );
}

export default App;
