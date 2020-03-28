import React, { Component } from "react";
import indexCss from "./index.module.scss";
import { PickerView } from 'antd-mobile';
import { connect } from "react-redux";
import axios from "../../../request/axios";
import SliderBar from "../../../components/sliderBar";

class FilterPanel extends Component {
  state = {
    filterTitle: [
      {
        index: 0,
        text: '区域',
        cols: 3
      },
      {
        index: 1,
        text: '方式',
        cols: 1
      },
      {
        index: 2,
        text: '租金',
        cols: 1
      },
      {
        index: 3,
        text: '筛选',
        cols: 0
      }
    ],
    current: -1,
    filterAllData: [
      // 区域
      [],
      // 方式
      [],
      // 租金
      [],
      // 筛选
      []
    ],
    // sifting: [
    //   {
    //     title: '户型',
    //     info: []
    //   },
    //   {
    //     title: '朝向',
    //     info: []
    //   },
    //   {
    //     title: '楼层',
    //     info: []
    //   },
    //   {
    //     title: '房屋亮点',
    //     info: []
    //   }
    // ]

    // 筛选的条件组合
    screenGroup: [
      // 区域
      [],
      // 方式
      [],
      // 租金
      [],
      // 筛选
      []
    ]
  }

  async componentDidMount() {
    const { cityName } = this.props
    const { filterAllData } = this.state //, sifting
    const id = (await axios.get('/area/info?name=' + cityName)).data.body.value
    const conditions = (await axios.get("/houses/condition?id=" + id)).data.body;
    // console.log(conditions);
    filterAllData[0] = [conditions.area, conditions.subway]
    filterAllData[1] = conditions.rentType
    filterAllData[2] = conditions.price
    filterAllData[3] = [
      {
        title: '户型',
        info: conditions.roomType
      },
      {
        title: '朝向',
        info: conditions.oriented
      },
      {
        title: '楼层',
        info: conditions.floor
      },
      {
        title: '房屋亮点',
        info: conditions.characteristic
      }
    ]

    // 第四个（筛选）
    // sifting[0].info = conditions.roomType
    // sifting[1].info = conditions.oriented
    // sifting[2].info = conditions.floor
    // sifting[3].info = conditions.characteristic
  }

  pickerViewFunc = () => {
    const { filterTitle, current, filterAllData, screenGroup } = this.state //sifting
    if ([0, 1, 2].includes(current)) {
      return <div className={indexCss.pickerView_item}>
        <PickerView
          data={filterAllData[current]}
          cols={filterTitle[current].cols}
          // onChange与value是互相影响缺一不可
          onChange={this.onChangeFunc}
          value={screenGroup[current]}
        />
        <div className={indexCss.pickerView_status}>
          <span onClick={() => this.setState({ current: -1 })}>取消</span>
          <span onClick={this.handleClickConfirm}>确定</span>
        </div>
      </div>
    } else if (current === 3) {
      return <SliderBar>
        <div className={indexCss.sifting}>
          <div className={indexCss.sifting_content}>
            {filterAllData[current].map((v, i) => <div className={indexCss.sifting_type} key={i}>
              <div className={indexCss.sifting_type_title}>{v.title}</div>
              <div className={indexCss.sifting_type_all}>{v.info.map((vv, ii) => <div
                className={[indexCss.sifting_type_item, screenGroup[current].includes(vv.label) ? indexCss.active : ''].join(' ')} key={ii} onClick={this.handleClickScre.bind(this, vv.label)}>{vv.label}</div>)}</div>
            </div>)}
          </div>
          <div className={indexCss.pickerView_status}>
            <span onClick={() => this.setState({ current: -1 })}>清除</span>
            <span onClick={this.handleClickConfirm}>确定</span>
          </div>
        </div>
      </SliderBar>
    } else {
      return <></>
    }
  }

  // pickerview组件的onChange事件
  onChangeFunc = (value) => {
    const { screenGroup, current } = this.state
    // console.clear()
    // console.log(value);
    screenGroup[current] = value
    this.setState({
      screenGroup
    })

    // console.clear()
    // console.log(screenGroup);



    // 错误的想法
    // if (current === 0) {
    //   screenGroup[0][0] = value[0]
    //   screenGroup[0][1] = value[1]
    //   screenGroup[0][2] = value[2]
    //   if ([undefined, 'null'].includes(screenGroup[0][2])) {
    //     screenGroup[0].splice(2, 1)
    //   }
    // } else {
    //   if (current === 1) {
    //     screenGroup[current][0] = 'rentType'
    //   }else {
    //     screenGroup[current][0] = 'price'
    //   }
    //   screenGroup[current][1] = value[0]
    // }

    // // console.log(this.state.screenGroup);
  }


  // 点击第四筛选的条件触发事件
  handleClickScre = (value) => {
    const { screenGroup, current } = this.state
    // console.log(value);
    let index = screenGroup[current].findIndex(v => v === value)
    if (index === -1) {
      screenGroup[current].push(value)
    } else {
      screenGroup[current].splice(index, 1)
    }
    // console.log(screenGroup);
    this.setState({
      screenGroup
    })
  }

  // 点击确定按钮触发的事件
  handleClickConfirm = () => {
    // console.log(this.state.screenGroup);
    const { screenGroup, current } = this.state

    const areaOrSubway = screenGroup[0][0]
    // 是否有第三个数据，如果没有，就取第二个
    const areaOrSubwayValue = screenGroup[0][2] === 'null' ? screenGroup[0][1] : screenGroup[0][2]

    const rentType = screenGroup[1][0]

    const price = screenGroup[2][0]

    const more = screenGroup[3].join(',')

    let filterParams = {
      [areaOrSubway] : areaOrSubwayValue,
      rentType,
      price,
      more
    }
    console.log(filterParams);

  }

  render() {

    const { filterTitle, current } = this.state
    return (
      <div className={indexCss.filter_panel}>

        <div className={current !== 3 ? indexCss.maxFilter : ''}>
          {/* 条件过滤 */}
          <div className={indexCss.filter}>
            {filterTitle.map((v, i) => <div className={[indexCss.filter_item, i === current ? indexCss.active : ''].join(" ")} key={i} onClick={() => this.setState({ current: i })}>{v.text}</div>)}
          </div>

          {/* 条件面板 */}
          <div className={indexCss.pickerView}>
            {this.pickerViewFunc()}
          </div>
        </div>

        {/* 遮罩层 */}
        {[0, 1, 2, 3].includes(current) && <div className={indexCss.masked} onClick={() => this.setState({ current: -1 })}></div>}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  // console.log(state);

  return {
    cityName: state.mapReducer.cityLocation.name
  }
}

export default connect(mapStateToProps)(FilterPanel);