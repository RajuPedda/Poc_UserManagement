import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { FlatList } from 'react-native';

import User from './user';

export default class UsersList extends Component {

  onSelectUser(user,checked) {

    this.props.onSelectUser(user,checked);

  }
  
  _renderItem = ({item}) => (

    <User 
      id            = {item.id}
      user          = {item}
      userName      = {item.firstName}
      onSelectUser  = {(user,checked) => this.onSelectUser(user,checked)}>
    </User>

  )

  render() {
    return(
    <View style={styles.container}>
      <FlatList 

        data          = {this.props.data}
        extraData     = {this.props}
        keyExtractor  = {user => user.id}
        renderItem    = {this._renderItem}>

      </FlatList>
    </View>


    )};
  }
export const styles = StyleSheet.create({

  container : {
    marginTop: 30,
  }


  });