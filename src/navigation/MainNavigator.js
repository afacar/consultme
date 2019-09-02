import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ConsultantListScreen from '../screens/ConsultantListScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default MainNavigator = createStackNavigator({
    HomeScreen,
    ConsultantListScreen,
    SettingsScreen,
}, {
        initialRouteName: 'HomeScreen'
    }
);