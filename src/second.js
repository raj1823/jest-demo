import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Image,
  Animated,
  PanResponder,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {increase, decrease} from '../reducers/actions';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export class Second extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
    };
  }
  increaseCounter = () => {
    this.props.increase();
  };

  callWithJestFunction = (value = 10) => {};

  render() {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          //justifyContent: 'center',
          backgroundColor: '#fff',
        }}>
        <View style={{alignItems: 'center'}}>
          <Text style={{fontSize: 30, marginVertical: 30}}>
            {`Counter: ${this.props.counter}`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              onPress={() => {
                this.increaseCounter();
              }}
              style={{
                backgroundColor: 'green',
                height: 40,
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 15,
              }}>
              <Text style={{fontSize: 15, color: '#fff'}}>{'Increase'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.props.decrease();
              }}
              style={{
                backgroundColor: 'green',
                height: 40,
                width: 80,
                justifyContent: 'center',
                alignItems: 'center',
                margin: 15,
              }}>
              <Text style={{fontSize: 15, color: '#fff'}}>{'Decrease'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{
            height: 70,
            width: 120,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#fff'}}>{'Previous'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  counter: state.CounterReducer.counter,
});
const mapDispatchToProps = dispatch => ({
  increase: () => dispatch(increase),
  decrease: () => dispatch(decrease),
});
export default connect(mapStateToProps, mapDispatchToProps)(Second);
