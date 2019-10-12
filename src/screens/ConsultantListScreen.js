import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert } from 'react-native';

import * as actions from '../appstate/actions'
import { connect } from 'react-redux'
import ConsultantListScreenHeaderRight from '../components/common/Headers';


import { FlatList } from 'react-native-gesture-handler';
import ConsultantCard from '../components/Cards/ConsultantCard';
import ConsultantFullInfoModal from '../components/Modals/ConsultantFullInfoModal';
import styles from '../Constants/Styles';
import strings from '../Constants/Strings';
import firebase from 'react-native-firebase';

class ConsultantListScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Danışman listesi`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
        headerRight: (
            <ConsultantListScreenHeaderRight navigation={navigation} />
        )
    });

    state = {
        infoModalVisible: false,
        currentConsultant: {},
    }

    componentDidMount() {
    }

    extractKeyForFlatlist = (item, index) => {
        return item.uid
    }

    renderConsultant = ({ item }) => {
        return <ConsultantCard consultant={item} infoPressed={this.infoPressed} />
    }

    infoPressed = (consultant) => {
        this.setState({
            currentConsultant: consultant,
            infoModalVisible: true
        })
    }

    consultMe = (consultant) => {
        this.setState({ openAgreementTextModal: true })

        const user = this.props.user;
        if (user && user.uid) {
            Alert.alert(
                strings.AGREEMENT_POLICY_TITLE,
                strings.AGREEMENT_POLICY,
                [
                    {
                        text: 'Reddet',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    {
                        text: 'Onaylıyorum', onPress: () => {
                            this.props.startConsultancy(this.props.user, consultant, (status) => {
                                if (status == 'new') {

                                } else if (status == 'continue') {

                                }
                                this.props.setSelectedChatId(consultant.uid, true)
                                firebase.database().ref(`users/${consultant.uid}/CCID`).once('value', ccid => {
                                    console.log("CCID of opponent", ccid)
                                    this.props.videoCallOpponentsIds([ccid.val()])
                                })
                                this.props.navigation.navigate('SplashScreen');
                            })

                        }
                    },
                ],
                { cancelable: false }
            )
        } else {
            Alert.alert(
                strings.AGREEMENT_POLICY_NO_USER_TITLE,
                strings.AGREEMENT_POLICY_NO_USER_BODY,
                [
                    {
                        text: 'Daha Sonra',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    {
                        text: 'Şimdi',
                        onPress: () => {
                            this.props.navigation.navigate('LoginScreen')
                            this.setState({
                                infoModalVisible: false
                            })
                        }
                    },
                ],
                { cancelable: false }
            )
        }
    }

    onModalClose = () => {
        this.setState({ infoModalVisible: false })
    }

    render() {
        return (
            <View style={styles.fullScreen}>
                <FlatList
                    data={this.props.consultants}
                    extraData={this.props.consultants}
                    keyExtractor={this.extractKeyForFlatlist}
                    renderItem={this.renderConsultant}
                />
                <ConsultantFullInfoModal visible={this.state.infoModalVisible} consultant={this.state.currentConsultant} consultMe={this.consultMe} onModalClose={this.onModalClose} />
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    const { user } = state.auth;
    const { consultants } = state.app;
    const { consultant_chats } = state.chat



    for (var i = consultants.length - 1; i >= 0; i--) {
        for (var j = 0; j < consultant_chats.length; j++) {
            if (consultants[i] && (consultants[i].uid !== consultant_chats[j].user.uid)) {
                consultants.splice(i, 1);
            }
        }
    }
    return { user, consultants }
}

export default connect(mapStateToProps, actions)(ConsultantListScreen);