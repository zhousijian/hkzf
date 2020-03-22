// 1 引入其他小的管理员
import mapReducer from "./mapReducer";
// 2 引入管理员合并器 合并工具 合并函数
import { combineReducers } from "redux";
// 3 合并并导出
export default combineReducers({mapReducer})