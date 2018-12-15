import React, { Component } from 'react';
import { View, StyleSheet,ScrollView, Button, Text, TouchableHighlight,Alert} from 'react-native';
import UsersList from '../../components/home/usersList';
import UserAPIService from '../../services/userApiService';


// import RNFileSelector from 'react-native-file-selector';

class Home extends Component {

  constructor(props){
    super(props)

    this.state = {
      users: [],
      user: {},
      isUpdated : false
    }
  }

  componentDidMount() {
    this.getUsers();
  }

  getUsers() {

    UserAPIService.getUsers().then((res) => 
    {
      this.setState({users:res});
    }
    );
    
  }

  async setUsers() {
    try {
        var users = await AsyncStorage.setItem('users', this.state.users);
        this.setState({users: users});
    } catch(e) {
    }

     UserAPIService.setStatus(true);
    this.props.navigation.navigate('Home',{'updatedUser': user});
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

  removeUser() {
    const {user,users} = this.state;
    const removinUser = user;
    users.splice(users.findIndex(user => user.id === removinUser.id), 1);
    this.setState({users: users});
  }

importUsers() {
      AsyncStorage.getItem('users').then(function(strResult) {
        var result = JSON.parse(strResult) || {};
    });
  }
update() {
  AsyncStorage.getItem('users').then(function(strResult) {
    var result = JSON.parse(strResult) || {};
    Object.assign(result, user);
    AsyncStorage.setItem('users', JSON.stringify(result));
});
}
componentWillReceiveProps(nextProps) {
  const { navigation } = nextProps;
  const updatedUser = navigation.getParam('updatedUser', 'no user object');

  let users = this.state.users;
  if(UserAPIService.getUpdateStatus()) {
    UserAPIService.setStatus(false);
    Object.assign(users, users.map(user=> user.id === updatedUser.id? updatedUser : user))
    this.setState({users:users});
    }
   
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
