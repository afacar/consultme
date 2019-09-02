import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ConsultantListScreen from '../screens/ConsultantListScreen';


export default MainNavigator = createStackNavigator({
    ConsultantListScreen,
    LoginScreen
}, {
        initialRouteName: 'ConsultantListScreen'
    }
);