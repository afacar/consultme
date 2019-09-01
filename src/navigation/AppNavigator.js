import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import SplashScreen from '../screens/SplashScreen';
import MainNavigator from './MainNavigator';
import FirstTimeNavigator from './FirstTimeNavigator';

const AppNavigator = createSwitchNavigator({

    SplashScreen,
    MainNavigator,
    FirstTimeNavigator
},
    {
        initialRouteName: 'SplashScreen'
    }
)

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;