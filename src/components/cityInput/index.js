import React, { Component } from 'react';
import indexCss from "./index.module.scss";
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
 
class CityInput extends Component {
  
    state = {  }
    render() { 
      const { history } = this.props
      
        return (
            <div className={indexCss.city_input}>
              <div className={indexCss.input_wrap}>
                <div
                  onClick={()=>history.push('/cityList')}
                  className={indexCss.city_label}>
                  <span>{this.props.initCity}</span>
                  <i className={
                    [
                      "iconfont",
                      "icon-arrow",
                      indexCss["icon-arrow"]
                    ].join(" ")
                  }></i>
                </div>
                <div className={indexCss.city_address}>
                  {/*  iconfont icon-seach 不能改 图标就无法显示 */}
                  {/*  */}
                  <i className={
                    [
                      "iconfont",
                      "icon-seach",
                      indexCss["icon-seach"]
                    ].join(" ")
                  }></i>
                  <span>请输入小区或地址</span>
                </div>
              </div>
              <div className={indexCss.map_point} onClick={()=>history.push('/map')}
              >
                <i className={
                  [
                    "iconfont",
                    "icon-map",
                    indexCss["icon-map"]
                  ].join(" ")
                }></i>
              </div>
            </div>
          );
    }
}

const mapStateToProps = (state) => {
  return {
    initCity: state.mapReducer.cityLocation.name
  }  
}
const connFunc = connect(mapStateToProps)
export default connFunc(withRouter(CityInput))