
import UserData from '../fake-data/userData.json';

const UserAPIService = {

 delayedResponse(ms, value) {
    return new Promise(resolve => {
      setTimeout(() => resolve(value), ms);
    });
  },
  
  getUsers() {
    return this.delayedResponse(500, UserData);
  }

}
export default UserAPIService;