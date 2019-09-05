import { createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import ConsultantListScreen from '../screens/ConsultantListScreen';
import ConsultantApplicationScreen from '../screens/ConsultantApplicationScreen';


export default MainNavigator = createStackNavigator({
    ConsultantListScreen,
    LoginScreen,
    ConsultantApplicationScreen
}, {
        initialRouteName: 'ConsultantListScreen'
    }
);