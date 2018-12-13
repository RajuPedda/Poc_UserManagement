import React, { Component } from 'react';
import { View } from 'react-native';
import { Container, Button, Footer, Content, Text} from 'native-base';
import UsersList from '../../components/home/usersList';

import  UserApiService  from '../../services/userApiService'

import {styles} from './styles'
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

    UserApiService.getUsers().then((res) => this.setState({users:res})
    );
    
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
      <Container>

        <Content>
          
          <View>

            <UsersList 
              data         = {this.state.users}
              onSelectUser = {(user) => this.onSelectUserHandler(user)}>
            </UsersList>

          </View>

        </Content>

        <Footer 
          style = {styles.footerBackground}>

          <Button
            onPress = {() => this.addUser()}>
            <Text>Add User</Text>
          </Button>

          <Button
            onPress = {() => this.updateUser()}
            style   = {styles.buttonUpdate}>
            <Text>Update</Text>
          </Button>

          <Button
            onPress = {() => this.removeUser()}
            style   = {styles.buttonUpdate}>
            <Text>Remove</Text>
          </Button>

        </Footer>

        <Footer 
          style={styles.footerBackground}>

          <Button
            onPress = {() => this.importUsers()}
            style   = {styles.buttonImport}>
            <Text>Import Users</Text>
          </Button>

        </Footer>

      </Container>
    )};
  }

export default Home;
