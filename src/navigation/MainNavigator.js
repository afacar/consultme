import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ConsulterListScreen from '../screens/ConsulterListScreen';
import SettingsScreen from '../screens/SettingsScreen';

export default MainNavigator = createStackNavigator({
    HomeScreen,
    ConsulterListScreen,
    SettingsScreen,
}, {
        initialRouteName: 'HomeScreen'
    }
);