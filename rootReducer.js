
   
import {combineReducers,createStore,applyMiddleware} from 'redux'
import CounterReducer from './reducers/counter-reducer'

import thunk from 'redux-thunk'

const reducer= combineReducers({CounterReducer})

const store= createStore(reducer,applyMiddleware(thunk))
export default store