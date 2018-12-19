
import UserData from '../fake-data/userData.json';
import { AsyncStorage } from "react-native";
import firebase from 'react-native-firebase';
const UserAPIService = {

  _isUpdated : false,

 delayedResponse(ms, value) {
    return new Promise(resolve => {
      setTimeout(() => resolve(value), ms);
    });
  },

  getUpdateUsers(){
    AsyncStorage.getItem('users');
  },
 
  updatedUsers(user) {

    AsyncStorage.getItem('users').then(function(strResult) {
      var result = JSON.parse(strResult) || {};
      Object.assign(result, updatedUser);
      AsyncStorage.setItem('users', JSON.stringify(result));
      });
  },
users() {

  return firebase.firestore().collection('users').onSnapshot(this.onCollectionUpdate)

},
onCollectionUpdate(querySnapshot){
    const users = [];
    querySnapshot.forEach((doc) => {
      const { id, firstName, lastName,phone,email } = doc.data();
      users.push({
        id, // Document ID
        firstName, // DocumentSnapshot
        lastName,
        email,
        phone,
      });
    });
    console.log(users)

    return users;
  },

  getUsers() {
    return firebase.firestore().collection('users').onSnapshot(this.onCollectionUpdate)
    // console.log(UserData);
     
    //  return this.delayedResponse(500, UserData);
    },
   

    getUpdateStatus(){
      return this._isUpdated;
    },

    setStatus(value) {
      this._isUpdated = value;
    },
  
  async setUsers(users) {
    try {
    var users = await AsyncStorage.setItem('users', users);
    console.log(users);
    } catch(e) {
    }
  }

}
export default UserAPIService;