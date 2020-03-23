import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import { connect } from "react-redux";
import axios from '../../request/axios';
import cityListScss from "./index.module.scss";

class CityList extends Component {
    state = {
        list: []
    }
    async componentDidMount() {
        let allCityData = []

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
            } else {
                allCityData[index].values.push({
                    name: v.name
                })
            }
        })

        this.setState({
            list: allCityData
        })

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
                {this.props.initCity && <div className={cityListScss.cityList}>
                    {this.state.list.map((v, i) => <div className={cityListScss.types} key={i}>
                        <span>{v.name}</span>
                        {v.values.map((vv, ii) => <div className={cityListScss.city} key={ii}>
                            {vv.name}
                        </div>)}
                    </div>)}
                </div>}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        initCity: state.mapReducer.cityLocation.name
    }
}

export default connect(mapStateToProps)(CityList);