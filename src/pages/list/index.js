import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import CityInput from '../../components/cityInput'
import indexCss from "./index.module.scss";

class List extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div className={indexCss.found_list}>
                {/* 头部 */}
                <div className={indexCss.header}>
                    <NavBar
                        style={{backgroundColor:'#ddd'}}
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                    >NavBar</NavBar>
                    <div className={indexCss.city_input}>
                        <CityInput></CityInput>
                    </div>
                </div>
                {/*  */}
            </div>
        );
    }
}

export default List;