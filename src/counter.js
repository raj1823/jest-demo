import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector(state => state.count);

  return (
    <>
      <Text testID={'text'}>You pressed the button {count} times</Text>
      <TouchableOpacity
        testID={'button'}
        onPress={() => dispatch({type: 'INCREMENT'})}>
        +1
      </TouchableOpacity>
    </>
  );
};

export default Counter;
