import 'react-native';
import React from 'react';
import {First} from '../src/first';
import {Second} from '../src/second';
import Counter from '../src/counter';
import {Provider} from 'react-redux';
import {shallow, configure} from 'enzyme';
import thunk from 'redux-thunk';
import Adapter from 'enzyme-adapter-react-16';

import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import {render, cleanup, fireEvent} from '@testing-library/react-native';
configure({adapter: new Adapter()});
afterEach(() => {
  cleanup();
});
jest.setTimeout(10000);

// Note: test renderer must be required after react-native.
// JEST DOCUMENTATION : https://jestjs.io/docs/api

//USE CASES :
// Shallow: create and test component only (no children)
// Mount: same as shallow but mounts with children and parent/host component, allows lifecycle methods
// Render: outputs the html given by the component, including children

describe('<First/>', () => {
  const mockStore = configureStore([]);

  it('snapshot test', () => {
    const tree = render(<First />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('component Did mount', () => {
    const wrapper = shallow(<First />).instance();

    wrapper.state.counter = 1;
    wrapper.componentDidMount();

    expect(wrapper.state.counter).toBe(2);
  });

  it('mocking class functions', () => {
    const wrapper = shallow(<First />).instance();
    const updateCounterMock = jest.spyOn(wrapper, 'updateCounter');
    wrapper.componentDidMount();
    expect(updateCounterMock).toHaveBeenCalledTimes(1);
  });

  it('mocking props', () => {
    const props = {
      increase: function () {},
    };
    const wrapper = shallow(<Second increase={jest.fn()} />).instance();
    wrapper.increaseCounter();
    expect(wrapper.props.increase).toHaveBeenCalledTimes(1);
  });

  it('mocking function with returning value', () => {
    const wrapper = shallow(<Second />).instance();
    wrapper.updateMyValue = jest.fn().mockReturnValue(10);
    expect(wrapper.updateMyValue()).toBe(10);
  });

  it('mocking function with calling value', () => {
    const wrapper = shallow(<Second />).instance();
    const spyFunction = jest.spyOn(wrapper, 'callWithJestFunction');
    wrapper.callWithJestFunction(20);
    expect(spyFunction).toHaveBeenCalledWith(20);
  });

  // Asynchronous calls testing

  it('Asynchronous callbacks testing', done => {
    const wrapper = shallow(<First />).instance();
    wrapper.dummyApi(callback);
    function callback(data) {
      try {
        expect(data).toStrictEqual({
          userId: 1,
          id: 1,
          title: 'delectus aut autem',
          completed: false,
        });
        done();
      } catch (error) {
        done(error);
      }
    }
  });

  // timer functions mocking (setTimeout, setIntervals etc.)
  it('timer mock', () => {
    jest.useFakeTimers();
    const wrapper = shallow(<First />).instance();
    jest.spyOn(global, 'setTimeout');
    wrapper.timerGame();
    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(setTimeout).toHaveBeenLastCalledWith(expect.any(Function), 1000);
  });

  it('should display current count', () => {
    const store = mockStore({count: 5});
    const rendered = render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );
    const textComponent = rendered.getByTestId('text');

    expect(textComponent.props.children).toContain(5);
  });

  it('should dispatch increment action', () => {
    const store = mockStore({count: 5});
    const rendered = render(
      <Provider store={store}>
        <Counter />
      </Provider>,
    );
    const buttonComponent = rendered.getByTestId('button');

    fireEvent(buttonComponent, 'press');
    const actions = store.getActions();
    expect(actions.length).toBe(1);
    expect(actions[0].type).toEqual('INCREMENT');
  });
});
