import { mapLocation } from "../../utils/bdMap";

export const getMapLocation = ()=>{
    return async (dispatch)=>{
        const res = await mapLocation()
        dispatch({
            type : 'initCity',
            value : res
        })
    }
}