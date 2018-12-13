//libs
import { StackNavigator, DrawerNavigator } from "react-navigation";

import Home from './home/home';
import AddUser from './addUser/addUser';

const App = StackNavigator({
  Home: {screen: Home },
  AddUser: {screen: AddUser}
},
{
  initialRouteName: "Home",
  headerMode: "none"
}

);
export default App;