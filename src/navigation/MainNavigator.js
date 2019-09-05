import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ConsultantListScreen from '../screens/ConsultantListScreen';
import SettingsNavigator from './SettingStack';

export default MainNavigator = createStackNavigator({
    HomeScreen,
    ConsultantListScreen,
    SettingsNavigator,
}, {
        initialRouteName: 'HomeScreen'
    }
);