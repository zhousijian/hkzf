import React,{Component} from 'react';
import { HashRouter as Router, Route, Redirect } from 'react-router-dom';
// import TabBar from './demo/TabBar'
import Home from './pages/home';
import Citylist from './pages/cityList';
import Map from './pages/map';
import { getMapLocation } from './store/actionCreator'
import {connect} from "react-redux";

class App extends Component {
  state = {  }
  componentDidMount(){
    this.props.initCity()
  }
  render() { 
    return ( 
      <div className="App">
      {/* <TabBar></TabBar> */}
      {this.props.city && 
      <Router>
        <Route path='/home' component={Home}></Route>
        <Route exact path='/'>
          <Redirect to='/home'></Redirect>
        </Route>
        <Route exact path='/cityList' component={Citylist}></Route>
        <Route exact path='/map' component={Map}></Route>
      </Router>
      }
    </div>
     );
  }
}

const mapStateToProps = (state) => {
  return {
    city: state.mapReducer.cityLocation.name
  }  
}

// 操作全局数据
const mapDispatchToProps = (dispatch) => {
  return {
    initCity() {
      dispatch(getMapLocation());
    }
  }
}

const conFunc = connect(mapStateToProps,mapDispatchToProps)

export default conFunc(App);
