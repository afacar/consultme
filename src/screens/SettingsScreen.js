import React, { Component } from 'react';
import { ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ListItem } from 'react-native-elements';

class SettingsScreen extends Component {
    static navigationOptions = {
        title: 'Ayarlar'
    };

    render() {
        return (
            <ScrollView style={ styles.containerStyle}>
                <TouchableOpacity onPress={() => this.navigateNextScreen('profile')}>
                    <ListItem
                        key='profile'
                        title='Profil Ayarları'
                        titleStyle={{ fontSize: 21 }}
                        onPress={() => this.navigateNextScreen('profile')}
                        leftIcon={{ color: '#0066ff', type: 'font-awesome', name: 'user-md' }}
                        rightIcon={{ type: 'material', name: 'keyboard-arrow-right', size: 33 }}
                        containerStyle={styles.btn}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.navigateNextScreen('wallet')}>
                    <ListItem
                        key='wallet'
                        title='Cüzdanım'
                        titleStyle={{ fontSize: 21 }}
                        onPress={() => this.navigateNextScreen('wallet')}
                        leftIcon={{ color: '#009933', type: 'material', name: 'settings-phone' }}
                        rightIcon={{ type: 'material', name: 'keyboard-arrow-right', size: 33 }}
                        containerStyle={styles.btn}
                    />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.navigateNextScreen('archive')}>
                    <ListItem
                        key='archive'
                        title='Arşiv'
                        titleStyle={{ fontSize: 21 }}
                        onPress={() => this.navigateNextScreen('archive')}
                        leftIcon={{ color: '#cc3300', type: 'material', name: 'archive' }}
                        rightIcon={{ type: 'material', name: 'keyboard-arrow-right', size: 33 }}
                        containerStyle={styles.btn}
                    />
                </TouchableOpacity>
            </ScrollView >
        )
    }

    navigateNextScreen = (screen) => {
        const { navigate } = this.props.navigation;
        if (screen === 'profile') {
            navigate('ProfileScreen', { navigation: this.props.navigation });
        }
        else if (screen === 'wallet') {
            navigate('WalletScreen', { navigation: this.props.navigation });
        }
        else if (screen === 'archive') {
            navigate('ArchivedChatsScreen', { navigation: this.props.navigation });
        }
    }
}
const styles = {
    containerStyle: {
      flex: 1,
      paddingTop: 10,
      backgroundColor: '#f7f7f7',
    },
    btn:{
        borderBottomWidth: 1, 
        borderBottomLeftRadius: 50 ,
        backgroundColor: "#f1f1f1"
    }
  };

export default SettingsScreen