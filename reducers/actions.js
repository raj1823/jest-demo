
import {INCREASE,DECREASE} from './constants'
export const increase = (dispatch) =>{
    return dispatch({
        type: INCREASE,
    })

}
export const decrease = (dispatch) =>{
    return dispatch({
        type: DECREASE,
    })

}