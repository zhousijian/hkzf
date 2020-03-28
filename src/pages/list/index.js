import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import CityInput from '../../components/cityInput'
import indexCss from "./index.module.scss";
import FilterPanel from "./filterPanel";
import axios from "../../request/axios";
import { connect } from "react-redux";
import Maphouseitem from "../../components/mapHouseItem";
import { List } from 'react-virtualized';

class Lists extends Component {
    state = {
        list: [],
    }
    // 请求参数
    Params = {
        // 城市的id
        cityId: -1,
        // 开始的条数
        start: 1,
        // 结束的条数
        end: 20
    }
    //  筛选参数对象
    FilterParams = {}
    // 总条数
    Count = -1;
    // 是否正在发送请求
    ssLoadding = false;

    // 获取数据
    getData = async () => {
        let res = (await axios.get('/houses', { params: { ...this.Params, ...this.FilterParams } }))
        // console.log(res);
        this.Count = res.data.body.count
        this.setState({
            list: [...this.state.list, ...res.data.body.list]
        })
        this.ssLoadding = false
    }

    componentDidMount = async () => {
        const { cityName } = this.props;
        this.Params.cityId = (await axios.get("/area/info?name=" + cityName)).data.body.value;
        this.getData()
    }

    // 循环体
    rowRenderer = ({ key, index, isScrolling, isVisible, style, }) => {
        return (
            <div style={style} key={key}><Maphouseitem item={this.state.list[index]}></Maphouseitem></div>
        );
    }

    // 可视区域插件滚动事件
    onScroll = async ({ clientHeight, scrollHeight, scrollTop }) => {
        // console.clear()
        // console.log(clientHeight);
        // console.log(scrollHeight);
        // console.log(scrollTop);

        if (scrollHeight - clientHeight - scrollTop < 5) {
            if (this.state.list.length !== 0) {
                if (!this.ssLoadding) {
                    if (this.state.list.length < this.Count) {
                        this.ssLoadding = true
                        this.Params.start += 20
                        this.Params.end += 20
                        this.getData()
                    }
                }

            }


        }

    }

    render() {
        const { list } = this.state
        return (
            <div className={indexCss.found_list}>
                {/* 头部 */}
                <div className={indexCss.header}>
                    <NavBar
                        style={{ backgroundColor: '#ddd' }}
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                    >NavBar</NavBar>
                    <div className={indexCss.city_input}>
                        <CityInput></CityInput>
                    </div>
                </div>

                {/* filter过滤条件和PickerView 选择器 */}
                <div className={indexCss.filterPicker}>
                    <FilterPanel></FilterPanel>
                </div>


                {/* 房源信息 */}
                <div className={indexCss.foundInfo}>
                    {/* {list.map((v,i)=><div key={i}><Maphouseitem item={v}></Maphouseitem></div>)} */}
                    <List
                        width={window.screen.width}
                        height={window.screen.height - 132}
                        rowCount={list.length}
                        rowHeight={120}
                        rowRenderer={this.rowRenderer}
                        onScroll={this.onScroll}
                    />
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    cityName: state.mapReducer.cityLocation.name
})

export default connect(mapStateToProps)(Lists);