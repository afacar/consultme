import { createStackNavigator } from 'react-navigation';

import HomeScreen from '../screens/HomeScreen';
import ConsultantListScreen from '../screens/ConsultantListScreen';
import SettingsScreen from '../screens/SettingsScreen';
import ConsultantApplicationScreen from '../screens/ConsultantApplicationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ArchivedChatsScreen from '../screens/ArchivedChatsScreen';
import WalletScreen from '../screens/WalletScreen';
import ChatScreen from '../screens/ChatScreen';

export default MainNavigator = createStackNavigator({
    HomeScreen,
    ConsultantListScreen,
    SettingsScreen,
    ConsultantApplicationScreen,
    ProfileScreen,
    ArchivedChatsScreen,
    WalletScreen,
    ChatScreen
}, {
        initialRouteName: 'HomeScreen'
    }
);