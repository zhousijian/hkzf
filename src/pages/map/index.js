import React, { Component } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import mapScss from "./index.module.scss";
import { connect } from "react-redux";
import axios from "../../request/axios";
//AREA|9e787efa-d9fa-0ab2
class Map extends Component {
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

            label.addEventListener('click', () => {
                if (getParams.num < 2) {
                    arr = []
                    setTimeout(() => {
                        map.clearOverlays()
                    }, 0);
                    this.showMap(v.value, map)
                }else {
                    console.log('详情列表由下向上移动');
                    
                }

            })

            map.addOverlay(label);
        })

        const centerPoint = map.getViewport(arr)
        // console.log(centerPoint);
        map.centerAndZoom(centerPoint.center, centerPoint.zoom);

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
                <div id='container' className={mapScss.container}></div>
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