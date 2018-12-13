
import * as UserData from '../fake-data/userData.json';

const UserAPIService = {

 delayedResponse(ms, value) {
    return new Promise(resolve => {
      setTimeout(() => resolve(value), ms);
    });
  },
  
   getUsers() {

    
   
      // new: fake data
      return this.delayedResponse(500, [
        {
          id:'0',
          firstName: 'Tejaswi',
          lastName: 'Chava',
          email:'tejaswi.chava@omniwyse.com',
          phone: '8186869897'
        },
        {
          id:'1',
          firstName: 'Rajesh',
          lastName: 'Chava',
          email:'rajeshchava@gmail.com',
          phone: '8186869897'
        },
        {
          id:'2',
          firstName: 'Anvesh',
          lastName: 'Chava',
          email:'anveshchava@gmail.com',
          phone: '8186869897'
        }
      ]);
  }

}
export default UserAPIService;