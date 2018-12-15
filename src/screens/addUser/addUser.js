import React, { Component } from 'react';
import { Text, View, StyleSheet,Alert,Button,TouchableHighlight, AsyncStorage} from 'react-native';
import { Input} from 'react-native-elements';
import {styles} from './styles';
import UserAPIService from '../../services/userApiService';

class AddUser extends Component {

  constructor(props) {
    super(props);
    this.state = { 
    
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        phone: ''
      
    };
  }
  componentWillMount()  {
    const { navigation } = this.props;
    const user = navigation.getParam('user', 'no user Object');
    console.log(user.length);
    this.setState({id:user.id})	 
    this.setState({firstName:user.firstName})	
    this.setState({lastName:user.lastName})	
    this.setState({email:user.email})	
    this.setState({phone:user.phone})
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
      "id":         this.state.id,	    
      "firstName":  this.state.firstName,	      
      "lastName":   this.state.lastName,	   
      "email":      this.state.email,	  
      "phone":      this.state.phone
    };

  /*   AsyncStorage.getItem('users').then(function(strResult) {
            var result = JSON.parse(strResult) || {};
            Object.assign(result, user);
            AsyncStorage.setItem('users', JSON.stringify(result));
    }); */
   UserAPIService.setStatus(true);
    this.props.navigation.navigate('Home',{'updatedUser': user});
  }
  OnCancelButton() {
    this.setState({user: {}});
    this.props.navigation.navigate('Home');
  }
  someFunction() {}
  render() {
    return(
      <View>
        <Input 
          placeholder  = "Id"
          value        = {this.state.id}
          onChangeText = {(id) => this.setState({id: id})}
          inputContainerStyle= {styles.inputItem}/>

        <Input 
          placeholder  = "First Name" 
          value        = {this.state.firstName}
          onChangeText = {(firstName) => this.setState({firstName: firstName})}
          inputContainerStyle= {styles.inputItem}/>

        <Input 
          placeholder  = "Last Name"
          value        = {this.state.lastName}
          onChangeText = {(lastName) => this.setState({lastName: lastName})}
          inputContainerStyle= {styles.inputItem}/>

        <Input 
          placeholder  = "Email"
          value        = {this.state.email}
          onChangeText = {(email) => this.setState({email: email})}
          inputContainerStyle= {styles.inputItem}/>

        <Input 
          placeholder  = "Phone No"
          value        = {this.state.phone}
          onChangeText = {(phone) => this.setState({phone: phone})}
          inputContainerStyle= {styles.inputItem}
        />
        <View style={styles.buttonContainer}>
          <TouchableHighlight   style = {styles.button}>

            <Button 
              title="Save" 
              onPress = {() => this.onSaveButton()}>
            </Button>

          </TouchableHighlight>

          <TouchableHighlight   style = {styles.button}>

           <Button 
            title= "Cancel" 
            style   = {styles.button}
            onPress = {() => this.OnCancelButton()}>
          </Button>

          </TouchableHighlight>

      </View>
    </View>
    )};
    }
  
export default AddUser;