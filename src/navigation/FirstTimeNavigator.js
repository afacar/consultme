import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ConsulterListScreen from '../screens/ConsulterListScreen';


export default MainNavigator = createStackNavigator({
    ConsulterListScreen,
    LoginScreen
}, {
        initialRouteName: 'ConsulterListScreen'
    }
);