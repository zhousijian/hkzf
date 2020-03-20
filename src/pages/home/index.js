import React from 'react'
import { TabBar } from 'antd-mobile';
import { Route } from "react-router-dom";
import Index from "../index/index";
import List from "../list";
import News from "../news";
import Mind from "../mind";
class Home extends React.Component {
    // constructor(props) {
    //     super(props);
    //     if (this.props.location.pathname === '/home') {
    //         this.props.history.push('/home/index')
    //     }
    // }

    render() {
        const { location, history } = this.props
        // console.log(this.props)
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
                        selected={location.pathname === '/home'}
                        onPress={() => history.push('/home')}
                    >
                        <Route path='/home' component={Index}></Route>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className='iconfont icon-findHouse'></i>}
                        selectedIcon={<i className='iconfont icon-findHouse'></i>}
                        title="找房"
                        key="zhaofang"
                        selected={location.pathname === '/home/list'}
                        onPress={() => history.push('/home/list')}
                    >
                        <Route path='/home/list' component={List}></Route>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className='iconfont icon-infom'></i>}
                        selectedIcon={<i className='iconfont icon-infom'></i>}
                        title="咨询"
                        key="zixun"
                        selected={location.pathname === '/home/news'}
                        onPress={() => history.push('/home/news')}
                    >
                        <Route path='/home/news' component={News}></Route>
                    </TabBar.Item>
                    <TabBar.Item
                        icon={<i className='iconfont icon-my'></i>}
                        selectedIcon={<i className='iconfont icon-my'></i>}
                        title="我的"
                        key="wode"
                        selected={location.pathname === '/home/mind'}
                        onPress={() => history.push('/home/mind')}
                    >
                        <Route path='/home/mind' component={Mind}></Route>
                    </TabBar.Item>
                </TabBar>
            </div>
        );
    }
}

export default Home