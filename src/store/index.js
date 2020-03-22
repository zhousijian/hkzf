import reducer from "./reducer";
// 1 引 入  thunk 用来实现异步action
import thunk from "redux-thunk";
// 2 引入 redux的中间件 加载器 
import {createStore,applyMiddleware  } from "redux";
export default createStore(reducer,applyMiddleware(thunk));