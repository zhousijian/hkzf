import React, { Component } from 'react';
import { Carousel } from 'antd-mobile';
import axios, { baseURL } from '../../request/axios'
import index from './index.module.scss'
import nav1 from '../../assets/images/nav-1.png'
import nav2 from '../../assets/images/nav-2.png'
import nav3 from '../../assets/images/nav-3.png'
import nav4 from '../../assets/images/nav-4.png'
class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            groupsImg: []
        }
    }
    componentDidMount() {
        axios({
            url: '/home/swiper'
        }).then(res => {
            // console.log(res);
            const { body } = res.data
            this.setState({
                data: body
            })
        })
        axios({
            url: '/home/groups'
        }).then(res => {
            // console.log(res);
            const { body } = res.data
            this.setState({
                groupsImg: body
            })
        })
    }
    render() {
        return (
            <div className={index.home_index}>
                {/* 轮播图 */}
                <div className={index.carousel}>
                    {this.state.data.length && <Carousel
                        autoplay
                        infinite
                    >
                        {this.state.data.map(val => (
                            <img
                                key={val.id}
                                src={baseURL + val.imgSrc}
                                alt=""
                                style={{ width: '100%', verticalAlign: 'top' }}
                            />
                        ))}
                    </Carousel>}
                </div>
                {/* 租聘方式和找房 */}
                <div className={index.mode}>
                    <div>
                        <img src={nav1} alt="" />
                        <span>整租</span>
                    </div>
                    <div>
                        <img src={nav2} alt="" />
                        <span>合租</span>
                    </div>
                    <div>
                        <img src={nav3} alt="" />
                        <span>地图找房</span>
                    </div>
                    <div>
                        <img src={nav4} alt="" />
                        <span>去出租</span>
                    </div>
                </div>
                {/* 租房小组 */}
                <div className={index.groups}>
                    <div className={index.title}>
                        <h3>租房小组</h3>
                        <span>更多</span>
                    </div>
                    <div className={index.content}>
                        {this.state.groupsImg.map(v => {
                            return <div className={index.content_item} key={v.id}>
                                <div className={index.content_item_left}>
                                    <strong>{v.title}</strong>
                                    <p></p>
                                    <span>{v.desc}</span>
                                </div>
                                <div className={index.content_item_right}>
                                    <img src={baseURL+v.imgSrc} alt="" />
                                </div>
                            </div>
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default Index;