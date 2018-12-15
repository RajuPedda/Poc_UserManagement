import React, { Component } from 'react';
import { View, StyleSheet,ScrollView, Button, Text, TouchableHighlight} from 'react-native';
import UsersList from '../../components/home/usersList';

import  UserApiService  from '../../services/userApiService'

// import RNFileSelector from 'react-native-file-selector';

class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
      users: [],
      user: {}
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {

    var users = UserApiService.getUsers();
    console.log(users);
    
  }

  addUser() {
    this.props.navigation.navigate('AddUser');
  }

  updateUser() {
    const {user} = this.state;
    this.props.navigation.navigate('AddUser',{'user': user});
  }
  onSelectUserHandler(user) {

    let currentUser       = Object.assign({}, this.state.user);
    currentUser.id        = user.id;
    currentUser.firstName = user.firstName;
    currentUser.lastName  = user.lastName;
    currentUser.email     = user.email;
    currentUser.phone     = user.phone;
    this.setState({user:currentUser});

  }

  importUsers() {
   /*  RNFileSelector.Show(
      {
          title: 'Select File',
          onDone: (path) => {
              console.log('file selected: ' + path)
          },
          onCancel: () => {
              console.log('cancelled')
          }
      }
  ) */
  }
  render() {
    return(
      <View style={styles.container}>

        <View style= {styles.list}>
          
          <UsersList 
            data         = {this.state.users}
            onSelectUser = {(user) => this.onSelectUserHandler(user)}>
          </UsersList>

        </View>


        <View style = {styles.footer}>

          <View 
            style = {styles.footerBackground}>

            <TouchableHighlight>

              <Button
              onPress = {() => this.addUser()}
              title = "Add User" />

            </TouchableHighlight>

            <TouchableHighlight   style = {styles.buttonUpdate}>

              <Button
                onPress = {() => this.updateUser()}
                title = "Update"/>

            </TouchableHighlight>

            <TouchableHighlight style = {styles.buttonUpdate} >

              <Button
                onPress = {() => this.removeUser()}
                title = "Remove"/>

            </TouchableHighlight>
            
          </View>

          <View 
            style={styles.footerBackground}>

            <TouchableHighlight   style = {styles.buttonImport}>
               
              <Button
                onPress = {() => this.importUsers()}
                title = "Import Users">
              </Button>

            </TouchableHighlight>
             
          </View>

      </View>

    </View>
    )};
  }

export default Home;

export const styles = StyleSheet.create({

  container:{
    flex: 1
  },

  list: {
    flex: 0.8
  },

  footer: {
    flex:0.2,
  },

  footerBackground: {
    flexDirection: 'row',
    justifyContent:'center',
    marginTop: 10
 
  },

  buttonUpdate: {
    marginLeft: 10
  },

  buttonImport: {
    width: 250,
    justifyContent:'center'
  },

});