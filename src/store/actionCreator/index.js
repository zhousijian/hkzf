import { mapLocation,mapSwitchAddress } from "../../utils/bdMap";

export const getMapLocation = ()=>{
    return async (dispatch)=>{
        const res = await mapLocation()
        dispatch({
            type : 'initCity',
            value : res
        })
    }
}

export const mapSwitchAddressAction = (actionCity)=>{
    return async (dispatch)=>{
        const res = await mapSwitchAddress(actionCity)
        // console.log(res);
        const value = {
            name : actionCity,
            point : res
        }
        // console.log(value);
        
        dispatch({
            type : 'initCity',
            value
        })
    }
}