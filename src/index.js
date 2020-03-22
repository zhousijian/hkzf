import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './assets/fonts/iconfont.css'
import App from './App';
// 1 引入仓库
import store from "./store";
// 2 借助 react-redux中的一个组件来实现传递
import { Provider } from "react-redux";

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
