import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';

class CityList extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    render() {
        return (
            <div>
                <div className="navBar">
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                    >城市选择</NavBar>
                </div>
            </div>
        );
    }
}

export default CityList;