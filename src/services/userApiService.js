
import UserData from '../fake-data/userData.json';
import { AsyncStorage } from "react-native"
const UserAPIService = {

 delayedResponse(ms, value) {
   console.log(value);
    return new Promise(resolve => {
      setTimeout(() => resolve(value), ms);
    });
  },
  myfunction (result){
    return this.delayedResponse(500, JSON.parse(result));
  },

  getUsers() {
    this.setUsers();
   

    AsyncStorage.getItem('users').then(function(strResult) {
      var result = JSON.parse(strResult) || {};
      console.log(result);
      return result;
      });
    },
  
async setUsers() {
  try {
  var users = await AsyncStorage.setItem('users', UserData);
  console.log(users);
  } catch(e) {
  }
  }

}
export default UserAPIService;