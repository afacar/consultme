import { createStackNavigator } from 'react-navigation';

import SettingsScreen from '../screens/SettingsScreen';
import ConsultantApplicationScreen from '../screens/ConsultantApplicationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArchivedChatsScreen from '../screens/ArchivedChatsScreen';
import WalletScreen from '../screens/WalletScreen'

export default SettingsNavigator = createStackNavigator({
    SettingsScreen,
    ConsultantApplicationScreen,
    ProfileScreen,
    ArchivedChatsScreen,
    WalletScreen
}, {
        initialRouteName: 'SettingsScreen'
    }
);