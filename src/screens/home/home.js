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

  async componentWillMount() {
    const users = await UserAPIService.getUsers();
    console.log(users)
    this.setState({users:users});
  }

  componentWillUpdate() {
    console.log('will update');
  }

  componentDidUpdate() {
    console.log('did update');
  }
  componentWillReceiveProps() {
    console.log('receive props');
  }
  async getUsers() {

    //  UserAPIService.getUsers().then((res) => 
    // {
    //   this.setState({users:res});
    // }
    //  );
    const users = await UserAPIService.getUsers();
    console.log(users)
    this.setState({users:users});
  }

  async setUsers() {

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
    const removingUser = user;
    users.splice(users.findIndex(user => user.id === removingUser.id), 1);
    this.setState({users: users});
  }

importUsers() {
      
  }

componentWillReceiveProps(nextProps) {
  const { navigation } = nextProps;
  const updatedUser = navigation.getParam('updatedUser', 'no user object');
  const isNewUser = navigation.getParam('isNewUser', false);
  let users = this.state.users;
  if(UserAPIService.getUpdateStatus()) {
    UserAPIService.setStatus(false);
    if(isNewUser) {
      users.push(updatedUser);
      
    } else {
      Object.assign(users, users.map(user=> user.id === updatedUser.id? updatedUser : user))
    }

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
