import React, { Component } from 'react';
import { View, TouchableOpacity, FlatList } from 'react-native';

import { Icon } from 'react-native-elements';

import * as actions from '../appstate/actions/auth_actions'
import { connect } from 'react-redux'

import { HomeScreenBody } from '../components/ScreenParts/HomeScreenBody';

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
                    navigation.navigate('ConsultantListScreen')
                }
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
        consultant_chats: [
            /*
            {
 
            },
            {
 
            }...
            */
        ],
        user_chats: [

        ],
        consultantsSelected: true,
    }

    changeTab = (tabName) => {
        if (tabName === 'consultingFrom') {
            this.setState({
                consultantsSelected: true,
            })
        } else if (tabName === 'consultingTo') {
            this.setState({
                consultantsSelected: false,
            })
        }
    }

    
    render() {
        return (
            <View style={{ flex: 1 }}>
                <HomeScreenBody changeTab={this.changeTab} consultantsSelected={this.state.consultantsSelected} user={this.props.user}  consultant_chats={this.props.consultant_chats} user_chats={this.props.user_chats}/>
            </View>
        )
    }
}

const mapStateToProps = ({ auth, chat }) => {
    console.log("Home screen chats", chat)
    const { user } = auth
    const { consultant_chats, user_chats } = chat
    return { user, consultant_chats, user_chats }
}
export default connect(mapStateToProps, actions)(HomeScreen);
