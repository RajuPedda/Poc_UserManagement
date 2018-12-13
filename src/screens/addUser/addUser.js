import React, { Component } from 'react';
import { Text, View, StyleSheet,Alert } from 'react-native';
import { Container, Header, Left, 
  Body, Right, Button, Icon, Title, Content , 
  Input,Item, Form, Footer, FooterTab,
  } from 'native-base';
import {styles} from './styles';

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      }
    };
  }
  componentWillMount()  {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'no user Object');
    if(user!== this.state.user)
    this.setState({user:user})
  }
  onChangeTextHandler(key, textValue) {
    let currentUser = Object.assign({}, this.state.user);
    switch(key){
      case 'id': {
        currentUser.id = textValue;
        this.setState({user:currentUser});
        break;
      }
      case 'firstName': {
        currentUser.firstName = textValue;
        this.setState({user:currentUser});
        break;
      }
      case 'lastName': {
        currentUser.lastName = textValue;
        this.setState({user:currentUser});
        break;
      }
      case 'email': {
        currentUser.email = textValue;
        this.setState({user:currentUser});
        break;
      }
      case 'phone': {
        currentUser.phone = textValue;
        this.setState({user:currentUser});
        break;
      }
      default:  return value
    }
  }
  onSaveButton() {

    const user = {
      "id":         this.state.user.id,
      "firstName":  this.state.user.firstName,
      "lastName":   this.state.user.lastName,
      "email":      this.state.user.email,
      "phone":      this.state.user.phone
    };
    this.props.navigation.navigate('Home');
  }
  OnCancelButton() {
    this.setState({user: {}});
    this.props.navigation.navigate('Home');
  }
  render() {
    return(
      <View>
        <Form>

          <Item>
            <Input 
              placeholder  = "Id"
              value        = {this.state.user.id}
              onChangeText = {(id) => this.onChangeTextHandler('id', id)}/>
          </Item>

          <Item style = {styles.inputItem}>
            <Input 
              placeholder  = "First Name" 
              value        = {this.state.user.firstName}
              onChangeText = {(firstName) => this.onChangeTextHandler('firstName', firstName)}/>
          </Item>

          <Item style={styles.inputItem}>
            <Input 
              placeholder  = "Last Name"
              value        = {this.state.user.lastName}
              onChangeText = {(lastName) => this.onChangeTextHandler('lastName', lastName)}/>
          </Item>

          <Item style={styles.inputItem}>
            <Input 
              placeholder  = "Email"
              value        = {this.state.user.email}
              onChangeText = {(email) => this.onChangeTextHandler('email', email)}/>
          </Item>

          <Item style={styles.inputItem}>
            <Input 
              placeholder  = "Phone No"
              value        = {this.state.user.phone}
              onChangeText = {(phone) => this.onChangeTextHandler('phone', phone)}
            />
          </Item>

          <View style={styles.buttonContainer}>

            <Button 
              block 
              style   = {styles.button}
              onPress = {() => this.onSaveButton()}>
              <Text style={styles.buttonText}>SAVE</Text>
            </Button>

            <Button 
              block 
              style   = {styles.button}
              onPress = {() => this.OnCancelButton()}>
              <Text style={styles.buttonText}>CANCEL</Text>
            </Button>

          </View>

        </Form>
      </View>
    )};
  }
export default AddUser;