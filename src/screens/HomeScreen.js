import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
import { Icon } from 'react-native-elements';

import * as actions from '../appstate/actions/auth_actions'
import { connect } from 'react-redux'

class HomeScreen extends Component {
    static navigationOptions = ({ navigation }) => ({
        title: `Consult Me`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },

        headerRight: (
            <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
                <TouchableOpacity onPress={() => navigation.navigate('SettingsScreen')}>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                        <Icon
                            type='material-community'
                            name='settings-outline' />
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {
                    navigation.setParams('user', navigation.getParam('user'))
                    navigation.navigate('ConsultantListScreen')}
                    }>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end', alignItems: 'center', marginRight: 10 }}>
                        <Icon
                            type='material-community'
                            name='account-search' />
                    </View>
                </TouchableOpacity>
            </View>
        )
    });
    state = {
        chats: [
            /*
            {
 
            },
            {
 
            }...
            */
        ],
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
            </View>
        )
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth
    return user
}
export default connect(mapStateToProps, actions)(HomeScreen);
