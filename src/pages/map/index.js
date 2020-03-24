import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import mapScss from "./index.module.scss";
import { connect } from "react-redux";

class Map extends Component {
    componentDidMount() {
        // 创建地图实例  
        var map = new window.BMap.Map("container");
        // 创建点坐标  
        var point = new window.BMap.Point(116.404, 39.915);
        // 初始化地图，设置中心点坐标和地图级别 
        map.centerAndZoom(point, 15);
        // 填写控件-平移缩放控件
        map.addControl(new window.BMap.NavigationControl()); 
        map.addControl(new window.BMap.ScaleControl()); 
        map.addControl(new window.BMap.GeolocationControl());      
    }
    render() {
        return (
            <div className={mapScss.map}>
                {/* 头部 */}
                <div className={mapScss.header_navBar}>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                    >地图找房</NavBar>
                </div>
                <div id='container' className={mapScss.container}></div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
      city: state.mapReducer.cityLocation.name
    }  
  }

export default connect(mapStateToProps)(Map);