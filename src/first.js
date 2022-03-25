import React from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import axios from 'axios';
import {increase, decrease} from '../reducers/actions';
const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export class First extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 1,
    };
  }
  timerGame(callback) {
    console.log('Ready....go!');
    setTimeout(() => {
      console.log("Time's up -- stop!");
      callback && callback();
    }, 1000);
  }

  componentDidMount() {
    this.updateCounter();
  }
  updateCounter = () => {
    this.setState({counter: this.state.counter + 1});
  };

  dummyApi = async callback => {
    const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
    if (res) callback && callback(res.data);
    else callback && callback(res);
  };

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
          <Text
            testID="text"
            style={{fontSize: 30, marginVertical: 30, color: '#000'}}>
            {`Counter: ${this.props.counter}`}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity
              testID="increase-button"
              onPress={() => {
                this.props.increase();
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
          onPress={() => this.props.navigation.navigate('second')}
          style={{
            height: 70,
            width: 120,
            backgroundColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{fontSize: 20, color: '#fff'}}>{'Next'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  counter: state.CounterReducer.counter,
});
const mapDispatchToProps = dispatch => ({
  increase: () => increase(dispatch),
  decrease: () => decrease(dispatch),
});
export default connect(mapStateToProps, mapDispatchToProps)(First);
