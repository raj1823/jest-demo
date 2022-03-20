import {DECREASE,INCREASE} from './constants'

const initialState = {
        counter: 0
};

const CounterReducer = (state = initialState, action) => {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1,
      };
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1,
      };

    default:
      return state;
  }
};

export default CounterReducer;
