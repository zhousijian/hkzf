import React, { Component } from "react";
import indexCss from "./index.module.scss";
import { PickerView } from 'antd-mobile';
import { connect } from "react-redux";
import axios from "../../../request/axios";
import SliderBar from "../../../components/sliderBar";

class FilterPanel extends Component {
  constructor() {
    super();
    this.quxiao = React.createRef();
  }
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
  }

  async componentDidMount() {
    const { cityName } = this.props
    const { filterAllData, sifting } = this.state
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
    const { filterTitle, current, filterAllData, sifting } = this.state
    if ([0, 1, 2].includes(current)) {
      return <div className={indexCss.pickerView_item}>
        <PickerView
          data={filterAllData[current]}
          cols={filterTitle[current].cols}
        />
        <div className={indexCss.pickerView_status}>
          <span onClick={() => this.setState({ current: -1 })}>取消</span>
          <span>确定</span>
        </div>
      </div>
    } else if (current === 3) {
      return <SliderBar>
        <div ref={this.quxiao} className={indexCss.sifting}>
          <div className={indexCss.sifting_content}>
            {filterAllData[current].map((v, i) => <div className={indexCss.sifting_type} key={i}>
              <div className={indexCss.sifting_type_title}>{v.title}</div>
              <div className={indexCss.sifting_type_all}>{v.info.map((vv, ii) => <div className={indexCss.sifting_type_item} key={ii}>{vv.label}</div>)}</div>
            </div>)}
          </div>
          <div className={indexCss.pickerView_status}>
            <span onClick={() => this.setState({ current: -1 })}>清除</span>
            <span>确定</span>
          </div>
        </div>
      </SliderBar>
    } else {
      return <></>
    }
  }

  render() {

    const { filterTitle, current } = this.state
    return (
      <div className={indexCss.filter_panel}>
        {/* 条件过滤 */}
        <div className={indexCss.filter}>
          {filterTitle.map((v, i) => <div className={[indexCss.filter_item, i === current ? indexCss.active : ''].join(" ")} key={i} onClick={() => this.setState({ current: i })}>{v.text}</div>)}
        </div>

        {/* 条件面板 */}
        <div className={indexCss.pickerView}>
          {this.pickerViewFunc()}
        </div>
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