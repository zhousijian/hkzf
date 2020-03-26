import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import mapScss from "./index.module.scss";
import { connect } from "react-redux";
import axios,{baseURL} from "../../request/axios";
//AREA|9e787efa-d9fa-0ab2
class Map extends Component {
    constructor() {
        super();
        this.transitions = React.createRef();
      }
    state = {
        list: [],
        isShow : false
    }
    // 返回参数的函数
    getParamsFunc = (function () {
        let arr = [{ num: 0, cls: 'mapText' }, { num: 1, cls: 'mapText' }, { num: 2, cls: 'fang' }]
        let index = -1
        return function () {
            ++index
            return arr[index]
        }
    })()

    async componentDidMount() {
        const { cityName } = this.props

        // 创建地图实例  
        var map = new window.BMap.Map("container");
        // map.centerAndZoom(cityName)
        // map.setCenter(cityName)
        // 填写控件-平移缩放控件
        map.addControl(new window.BMap.NavigationControl());
        map.addControl(new window.BMap.ScaleControl());

        //dragstart
        map.addEventListener("dragstart",()=> {
            this.transitions.current.style.height = 0
            this.setState({
                isShow : false,
            })
        })

        let id = (await axios.get('/area/info?name=' + cityName)).data.body.value
        // console.log(id);

        this.showMap(id, map)

        // let list = (await axios.get('/area/map?id=' + id)).data.body
        // // console.log(list);
        // let arr = []

        // list.forEach(v => {
        //     if (v.label !== '黄埔') {
        //         arr.push({
        //             lng: v.coord.longitude,
        //             lat: v.coord.latitude
        //         })
        //     }
        //     // 创建点坐标  
        //     var point = new window.BMap.Point(v.coord.longitude, v.coord.latitude);
        //     // 初始化地图，设置中心点坐标和地图级别 
        //     // map.centerAndZoom(point, 10)
        //     var opts = {
        //         position: point,    // 指定文本标注所在的地理位置
        //     }
        //     var label = new window.BMap.Label('', opts)  // 创建文本标注对象
        //     label.setStyle({
        //         border: 'none',
        //         backgroundColor: 'none'
        //     });
        //     label.setContent(`<div class=${mapScss.mapText}><span>${v.label}</span><span>${v.count}套</span></div>`)

        //     label.addEventListener('click', () => {
        //         arr = []
        //         setTimeout(() => {
        //             map.clearOverlays()
        //         }, 0);
        //         this.showMap()
        //         // axios.get('/area/map?id=' + v.value).then(res => {
        //         //     console.log(res);
        //         //     const list = res.data.body
        //         //     list.forEach(v => {
        //         //         if (v.label !== '黄埔') {
        //         //             arr.push({
        //         //                 lng: v.coord.longitude,
        //         //                 lat: v.coord.latitude
        //         //             })
        //         //         }
        //         //         // 创建点坐标  
        //         //         var point = new window.BMap.Point(v.coord.longitude, v.coord.latitude);
        //         //         // 初始化地图，设置中心点坐标和地图级别 
        //         //         // map.centerAndZoom(point, 10)
        //         //         var opts = {
        //         //             position: point,    // 指定文本标注所在的地理位置
        //         //         }
        //         //         var label = new window.BMap.Label('', opts)  // 创建文本标注对象
        //         //         label.setStyle({
        //         //             border: 'none',
        //         //             backgroundColor: 'none'
        //         //         });
        //         //         label.setContent(`<div class=${mapScss.mapText}><span>${v.label}</span><span>${v.count}套</span></div>`)
        //         //         map.addOverlay(label);
        //         //         const centerPoint = map.getViewport(arr)
        //         //         // console.log(centerPoint);
        //         //         map.centerAndZoom(centerPoint.center, centerPoint.zoom);
        //         //     })

        //         // })

        //     })

        //     map.addOverlay(label);
        // })

        // const centerPoint = map.getViewport(arr)
        // // console.log(centerPoint);
        // map.centerAndZoom(centerPoint.center, centerPoint.zoom);

    }

    // 函数封装
    showMap = async (id, map) => {
        let getParams = this.getParamsFunc()
        let list = (await axios.get('/area/map?id=' + id)).data.body
        // console.log(list);
        let arr = []

        list.forEach(v => {
            if (v.label !== '黄埔') {
                arr.push({
                    lng: v.coord.longitude,
                    lat: v.coord.latitude
                })
            }
            // 创建点坐标  
            var point = new window.BMap.Point(v.coord.longitude, v.coord.latitude);
            // 初始化地图，设置中心点坐标和地图级别 
            // map.centerAndZoom(point, 10)
            var opts = {
                position: point,    // 指定文本标注所在的地理位置
            }
            var label = new window.BMap.Label('', opts)  // 创建文本标注对象
            label.setStyle({
                border: 'none',
                backgroundColor: 'none'
            });
            label.setContent(`<div class=${mapScss[getParams.cls]}><span>${v.label}</span><span>${v.count}套</span></div>`)

            label.addEventListener('click', (e) => {
                if (getParams.num < 2) {
                    arr = []
                    setTimeout(() => {
                        map.clearOverlays()
                    }, 0);
                    this.showMap(v.value, map)
                } else {
                    // console.log('详情列表由下向上移动');
                    // console.log(v);
                    this.thirdFunc(v.value)
                    this.setState({
                        isShow : true
                    })
                    // console.log(this.transitions.current);
                    this.transitions.current.style.height = '50vh'
                    
                }

            })

            map.addOverlay(label);
        })

        const centerPoint = map.getViewport(arr)
        // console.log(centerPoint);
        map.centerAndZoom(centerPoint.center, centerPoint.zoom);

    }

    // 第三次点击覆盖物的函数
    async thirdFunc(id) {
        let { list } = (await axios.get('/houses?cityId=' + id)).data.body
        // console.log(res);
        this.setState({
            list
        })
    }

    render() {
        return (
            <div className={mapScss.map}>
                {/* 头部 */}
                <div className={mapScss.header_navBar}>
                    <NavBar
                        mode="light"
                        icon={<Icon type="left" />}
                        onLeftClick={() => this.props.history.go(-1)}
                    >地图找房</NavBar>
                </div>
                <div className={mapScss.content}>
                    <div id='container' className={mapScss.container}></div>
                    <div ref={this.transitions} className={mapScss.houses_list}>
                        <div className={mapScss.houses_list_title}>
                            <span>房屋列表</span>
                            <span>更多房源</span>
                        </div>
                        <div className={mapScss.houses_list_content}>
                            {this.state.list.map((v,i) => <div className={mapScss.house_item} key={i}>
                                <div className={mapScss.house_img}> <img src={baseURL+v.houseImg} alt="" /> </div>
                                <div className={mapScss.house_info}>
                            <div className={mapScss.house_list_title}>{v.title}</div>
                                    <div className={mapScss.house_desc}>{v.desc}</div>
                            <div className={mapScss.house_tags}>{v.tags.map((vv,ii)=><span key={ii}>{vv}</span>)}</div>
                                    <div className={mapScss.house_price_row}> <span>{v.price} 元/月 </span>  </div>
                                </div>
                            </div>)}
                        </div>
                    </div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        cityName: '广州',
        pointRedux: state.mapReducer.cityLocation.point
    }
}

export default connect(mapStateToProps)(Map);