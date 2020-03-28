import React, { Component } from "react";
import mapScss from "./index.module.scss";
import { baseURL } from "../../request/axios";

class MapHouseItem extends Component {
    state = {}
    render() {
        const v = this.props.item
        return (
            <div className={mapScss.house_item}>
                <div className={mapScss.house_img}> <img src={baseURL + v.houseImg} alt="" /> </div>
                <div className={mapScss.house_info}>
                    <div className={mapScss.house_list_title}>{v.title}</div>
                    <div className={mapScss.house_desc}>{v.desc}</div>
                    <div className={mapScss.house_tags}>{v.tags.map((vv, ii) => <span key={ii}>{vv}</span>)}</div>
                    <div className={mapScss.house_price_row}> <span>{v.price} 元/月 </span>  </div>
                </div>
            </div>
        );
    }
}

export default MapHouseItem;