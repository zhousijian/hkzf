// 1 自己定义数据
const defaultState = {
    cityLocation: {}
  }
  
  // 2 导出去 函数 固定 
  export default (state=defaultState,action)=>{
      let newState = JSON.parse(JSON.stringify(state))
      switch (action.type) {
          case 'initCity':
              newState.cityLocation = action.value;
              break;
      
          default:
              break;
      }
      
    return newState;
  }