import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert } from 'react-native';
import { CheckBox } from 'react-native-elements'

export default class User extends Component {
  constructor(props) {
    super (props)
    this.state = {
      checked: false
    }
  }
  
  selectUser(user) {
    this.setState({checked: !this.state.checked})
    this.props.onSelectUser(user);

  }

  render(){

    const  {user} = this.props;

    return(
      <View style={styles.container}>

        {/* <CheckBox
          value         = {this.state.checked}
          onValueChange = {() => this.selectUser(user)}
          style         = {styles.checkBox}/> */}
        <CheckBox
          containerStyle = {styles.checkBox}
          checked={this.state.checked}
          onPress={() => this.selectUser(user)}
          checkedIcon='dot-circle-o'
          uncheckedIcon='circle-o'/>

        <Text style={styles.user_text}>{user.firstName}&nbsp;{user.lastName}</Text>

      </View>
    )};
  }

  
export const styles = StyleSheet.create({

  container : {
    flex: 1, flexDirection: 'row',
    borderBottomColor: 'black',
    borderBottomWidth: 0.5,
    marginTop: 20,
  },

  checkBox : {
    backgroundColor: 'transparent'
  },

  user_text: {
    marginTop: 15
  }

  });
