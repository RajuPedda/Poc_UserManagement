import React, { Component } from 'react';
import { View, StyleSheet,ScrollView, Button, Text, TouchableHighlight,Alert} from 'react-native';
import UsersList from '../../components/home/usersList';
import UserAPIService from '../../services/userApiService';
import firebase from 'react-native-firebase';

// import RNFileSelector from 'react-native-file-selector';

class Home extends Component {

  constructor(props){
    super(props)
    this.ref = firebase.firestore().collection('users'), //firestore reference
    this.unsubscribe = null,
    this.state = {
      users: [],
      user: {},
      isUpdated : false,
      isDisabled: true,
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  componentWillUnmount() {
      this.unsubscribe();
  }

  getUsers(){
  this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate)

  }

  onCollectionUpdate = (querySnapshot) => {
    const users = [];
    querySnapshot.forEach((doc) => {
      const { id, firstName,lastName,email,phone } = doc.data();
      users.push({
       id,
        firstName, // DocumentSnapshot
        lastName,
        email,
        phone
      });
    });
    this.setState({ 
      users: users
   });
  }

  //add user navigation
  addUser() {
    this.props.navigation.navigate('AddUser');
  }

  //update user navigation
  updateUser() {
    const {user} = this.state;
    this.props.navigation.navigate('AddUser',{'user': user});
  }

  //on selection of user
  onSelectUserHandler(user,ischecked) {
    if(!ischecked) {
    this.setState({isDisabled: false})

    } else {
      this.setState({isDisabled: true})
    }

    let currentUser       = Object.assign({}, this.state.user);
    currentUser.id        = user.id;
    currentUser.firstName = user.firstName;
    currentUser.lastName  = user.lastName;
    currentUser.email     = user.email;
    currentUser.phone     = user.phone;
    this.setState({user:currentUser});

  }

  //remove user from cloud fire store
  removeUser() {
    const {user,users} = this.state;
    const removingUser = user;
    UserAPIService.removeUser(removingUser);
    this.getUsers();
    // users.splice(users.findIndex(user => user.id === removingUser.id), 1);
    // this.setState({users: users});
  }
 

  componentWillReceiveProps(nextProps) {
    const { navigation } = nextProps;
    const updatedUser = navigation.getParam('updatedUser', 'no user object');
    const isNewUser = navigation.getParam('isNewUser', false);
    let users = this.state.users;
    if(UserAPIService.getUpdateStatus()) {
      UserAPIService.setStatus(false);
      if(isNewUser) {
        UserAPIService.addUser(updatedUser);
        // users.push(updatedUser);
        
      } else {
        UserAPIService.updateUser(updatedUser);
        // Object.assign(users, users.map(user=> user.id === updatedUser.id? updatedUser : user))
      }

      // this.setState({users:users});
      }
    
  }

  render() {

    return(
      <View style={styles.container}>

        <View style= {styles.list}>
          
          <UsersList 
            data         = {this.state.users}
            onSelectUser = {(user,isChecked) => this.onSelectUserHandler(user,isChecked)}>
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

            <TouchableHighlight   style = {styles.buttonUpdate} >

              <Button
                onPress = {() => this.updateUser()}
                title = "Update"
                disabled={this.state.isDisabled}/>

            </TouchableHighlight>

            <TouchableHighlight style = {styles.buttonUpdate} >

              <Button
                onPress = {() => this.removeUser()}
                title = "Remove"
                disabled={this.state.isDisabled}/>

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
