import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View} from 'react-native';


import AppNavigation from './src/screens/appNavigation';

export default class App extends Component {
  render() {
    return (
      <AppNavigation></AppNavigation>
    );
  }
}
