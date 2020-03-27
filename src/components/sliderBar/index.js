import React,{ Component } from "react";
import indexCss from "./index.module.scss";

class SliderBar extends Component {
    // static defaultProps = {
    //     show : true
    // }
    state = {  }
    render() { 
        const indexOut = indexCss.index_out
        const indexIn = indexCss.index_in
        return ( 
            <div className={[indexCss.index,indexOut,indexIn].join(' ')}>
                {this.props.children}
            </div>
         );
    }
}
 
export default SliderBar;