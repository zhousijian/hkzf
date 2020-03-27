import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import CityInput from '../../components/cityInput'
import indexCss from "./index.module.scss";
import FilterPanel from "./filterPanel";

class List extends Component {
    render() {
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

            </div>
        );
    }
}

export default List;