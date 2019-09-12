import React, { Component } from 'react';
import { View, TouchableOpacity, PermissionsAndroid } from 'react-native';

import { Icon } from 'react-native-elements';

import * as actions from '../appstate/actions'
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

    /*
    item:{
        chats:{
            lastMessage:{

            },
            id:{
                text: '',
                audio: '',
                image: '',
                createdAt: '',
                user:{
                    name: '',
                    uid: id,
                    avatar: '',
                }
            }
        }
        user:{
            name: '',
            uid: id,
            avatar: '',
            }    
        } 
    */
    onChatItemPress = ({ item }) => {
        this.props.setSelectedChatId(item.user.uid, this.state.consultantsSelected)
        this.props.navigation.navigate('ChatScreen', {
            title: item.user.name,
        });
    }


    async componentDidMount() {
        // preparation for Audio
        this.checkPermission().then(async hasPermission => {
            this.setState({ hasPermission });
            if (!hasPermission) return;

        });
    }

    checkPermission() {
        if (Platform.OS !== "android") {
            return Promise.resolve(true);
        }
        const rationale = {
            title: "Microphone Permission",
            message:
                "AudioExample needs access to your microphone so you can record audio."
        };
        return PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
            rationale
        ).then(result => {
            return result === true || result === PermissionsAndroid.RESULTS.GRANTED;
        });
    }F

render() {
    return (
        <View style={{ flex: 1 }}>
            <HomeScreenBody changeTab={this.changeTab} consultantsSelected={this.state.consultantsSelected}
                user={this.props.user} consultant_chats={this.props.consultant_chats} user_chats={this.props.user_chats}
                onChatItemPress={this.onChatItemPress} />
        </View>
    )
}
}

const mapStateToProps = ({ auth, chat }) => {
    const { user } = auth
    const { consultant_chats, user_chats } = chat
    return { user, consultant_chats, user_chats }
}
export default connect(mapStateToProps, actions)(HomeScreen);
