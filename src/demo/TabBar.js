import React from 'react'
import { TabBar } from 'antd-mobile';

class TabBarExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'blueTab',
        hidden: false,
      };
    }
  
    renderContent(pageText) {
      return (
        <div>
            {pageText}
        </div>
      );
    }
  
    render() {
      return (
        <div style={{ position: 'fixed', height: '100%', width: '100%', top: 0 }}>
          <TabBar
            unselectedTintColor="#949494"
            tintColor="rgb(33, 185, 122)"
            barTintColor="white"
            hidden={this.state.hidden}
          >
            <TabBar.Item
              title="首页"
              key="shouye"
              icon={<i className='iconfont icon-ind'></i>}
              selectedIcon={<i className='iconfont icon-ind'></i>}
              selected={this.state.selectedTab === 'blueTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'blueTab',
                });
              }}
            >
              {this.renderContent('Life')}
            </TabBar.Item>
            <TabBar.Item
              icon={<i className='iconfont icon-findHouse'></i>}
              selectedIcon={<i className='iconfont icon-findHouse'></i>}
              title="找房"
              key="zhaofang"
              selected={this.state.selectedTab === 'redTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'redTab',
                });
              }}
            >
              {this.renderContent('Koubei')}
            </TabBar.Item>
            <TabBar.Item
              icon={<i className='iconfont icon-infom'></i>}
              selectedIcon={<i className='iconfont icon-infom'></i>}
              title="咨询"
              key="zixun"
              selected={this.state.selectedTab === 'greenTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'greenTab',
                });
              }}
            >
              {this.renderContent('Friend')}
            </TabBar.Item>
            <TabBar.Item
              icon={<i className='iconfont icon-my'></i>}
              selectedIcon={<i className='iconfont icon-my'></i>}
              title="我的"
              key="wode"
              selected={this.state.selectedTab === 'yellowTab'}
              onPress={() => {
                this.setState({
                  selectedTab: 'yellowTab',
                });
              }}
            >
              {this.renderContent('My')}
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
  }

export default TabBarExample