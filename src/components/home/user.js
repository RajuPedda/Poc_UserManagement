import React, { Component } from 'react';
import { Text, View, StyleSheet, Alert, CheckBox } from 'react-native';
import { styles } from './styles';

class User extends Component {
  constructor(props) {
    super (props)
    this.state = {
      checked: false
    }
  }
selectUser(user) {
this.setState({checked: !this.state.checked});
this.props.onSelectUser(user);
}
render(){
  const  {user} = this.props;
return(
  <View style={styles.container}>
  
    <CheckBox
      value={this.state.checked}
      onValueChange={() => this.selectUser(user)}
      style={styles.checkBox}
    />
      <Text style={styles.user_text}>{user.firstName}&nbsp;{user.lastName}</Text>
  </View>

)
}

}

export default User;