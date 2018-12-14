import 'react-native';
import React from 'react';
import 'native-base';
import Home from '../src/screens/home/home';
import UserList from '../src/components/home/usersList';
import User from '../src/components/home/user';
import renderer from 'react-test-renderer';

test('Home snapshot', () => {

  const snap = renderer.create(<Home />).toJSON();
  expect(snap).toMatchSnapshot();
  
});