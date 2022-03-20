import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import First from './src/first'
import Second from './src/second'
import React from 'react'
const Stack = createStackNavigator()

const MyStack = ()=>{
  return(
    <Stack.Navigator>
      <Stack.Screen name={'first'} component={First}/>
      <Stack.Screen name={'second'} component={Second}/>
    </Stack.Navigator>
  )
}

export default App = () =>{
  return(
    <NavigationContainer>
     <MyStack/>
    </NavigationContainer>
  )
}