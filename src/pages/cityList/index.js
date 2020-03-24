import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from "react-redux";
import axios from '../../request/axios';
import cityListScss from "./index.module.scss";
import { List } from 'react-virtualized';
import { mapSwitchAddressAction } from "../../store/actionCreator";

class CityList extends Component {
    state = {
        list: [],
        rightData: [],
        currentIndex : 0
    }
    async componentDidMount() {
        // 全部数据
        let allCityData = []
        // 右侧显示栏的信息
        let rightData = ['#', '热']

        // 当前城市
        let { initCity } = this.props
        allCityData.push({
            name: '当前定位',
            values: [{
                name: initCity
            }]
        })
        // 热门城市
        let hostCity = (await axios.get('/area/hot')).data.body
        allCityData.push({
            name: '热门城市',
            values: hostCity.map(v => ({ name: v.label }))
        })

        // 全部城市
        let nationwideCity = (await axios.get('/area/city?level=1')).data.body
        nationwideCity = nationwideCity.map(v => ({ name: v.label, short: v.short }))
        nationwideCity.sort((a, b) => a.short > b.short ? 1 : -1)
        nationwideCity.forEach(v => {
            let shouzimu = v.short[0].toUpperCase()
            // console.log(shouzimu);
            let index = allCityData.findIndex(vv => vv.name === shouzimu)
            if (index === -1) {
                allCityData.push({
                    name: shouzimu,
                    values: [
                        { name: v.name }
                    ]
                })
                rightData.push(shouzimu)
            } else {
                allCityData[index].values.push({
                    name: v.name
                })
            }
        })

        this.setState({
            list: allCityData,
            rightData
        })

    }
    // 循环体
    rowRenderer = ({ key, index, isScrolling, isVisible, style, }) => {
        return (
            // <div key={key} style={style}>
            //     {this.state.list[index].name}
            // </div>
            <div className={cityListScss.types} key={key} style={style}>
                <div className={cityListScss.text}>{this.state.list[index].name}</div>
                {this.state.list[index].values.map((vv, ii) => <div className={cityListScss.city} key={ii} onClick={this.handleClickCity.bind(this,vv.name)}>
                    {vv.name}
                </div>)}
            </div>
        );
    }

    // 行高度
    rowHeight = ({ index }) => {
        return 40 + this.state.list[index].values.length * 40
    }

    // 滚动的函数
    onRowsRendered = ({ startIndex })=>{
        this.setState({
            currentIndex : startIndex
        })
    }

    // 右侧栏item的点击事件
    handleClick= (i)=>{
        this.setState({
            currentIndex : i
        })
    }

    // 左侧城市栏item的点击事件
    handleClickCity = (actionCity)=>{
        this.props.switchAddress(actionCity)
        this.props.history.go(-1)
    }

    render() {
        return (
            <div>
                {/* 顶部navbar */}
                <div className="navBar">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                    >城市选择</NavBar>
                </div>
                {/* 城市列表 */}
                <div className={cityListScss.cityList}>
                    {/* {this.state.list.map((v, i) => <div className={cityListScss.types} key={i}>
                        <div className={cityListScss.text}>{v.name}</div>
                        {v.values.map((vv, ii) => <div className={cityListScss.city} key={ii}>
                            {vv.name}
                        </div>)}
                    </div>)} */}
                    <List
                        width={window.screen.width}
                        height={window.screen.height - 45}
                        rowCount={this.state.list.length}
                        rowHeight={this.rowHeight}
                        rowRenderer={this.rowRenderer}
                        onRowsRendered={this.onRowsRendered}
                        scrollToIndex={this.state.currentIndex}
                        scrollToAlignment='start'
                    />

                    <div className={cityListScss.zimu}>
                        {this.state.rightData.map((v,i) => 
                        <div 
                        className={[cityListScss.zimu_item,
                        this.state.currentIndex === i ? cityListScss.active : ''].join(' ')} 
                        key={v} 
                        onClick={this.handleClick.bind(this,i)}
                        >{v}</div>)}
                    </div>
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

const mapDispatchToProps = (dispatch) => {
    return {
      switchAddress(actionCity){
        dispatch( mapSwitchAddressAction(actionCity) );
      }
    }
  }

export default connect(mapStateToProps,mapDispatchToProps)(CityList);