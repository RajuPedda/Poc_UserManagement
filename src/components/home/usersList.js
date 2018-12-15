import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

import User from './user';

export default class UsersList extends Component {

  onSelectUser(user) {

    this.props.onSelectUser(user);

  }
  
  _renderItem = ({item}) => (

    <User 
      id            = {item.id}
      user          = {item}
      userName      = {item.firstName}
      onSelectUser  = {(user) => this.onSelectUser(user)}>
    </User>

  )

  render() {
    return(

    <FlatList 

      data          = {this.props.data}
      extraData     = {this.props}
      keyExtractor  = {user => user.id.toString()}
      renderItem    = {this._renderItem}>
    </FlatList>

    )};
  }
