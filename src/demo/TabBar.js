import React from 'react'
import { TabBar } from 'antd-mobile';
import { Route } from "react-router-dom";
import Index from "../index/index";
import List from "../list";
import News from "../news";
import Mind from "../mind";
class TabBarExample extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        selectedTab: 'blueTab',
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
              {/* {this.renderContent('Life')} */}
              <Route path='/home' component={Index}></Route>
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
              {/* {this.renderContent('Koubei')} */}
              <Route path='/home/list' component={List}></Route>
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
              {/* {this.renderContent('Friend')} */}
              <Route path='/home/news' component={News}></Route>
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
              {/* {this.renderContent('My')} */}
              <Route path='/home/mind' component={Mind}></Route>
            </TabBar.Item>
          </TabBar>
        </div>
      );
    }
  }

export default TabBarExample