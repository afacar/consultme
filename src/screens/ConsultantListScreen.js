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

// TODO don't show the consultants which the user is having consultation.
// TODO don't show the consultant himself

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
        console.log("Consult me request for ", consultant + " \nfrom " + this.props.state.user);
        this.setState({ openAgreementTextModal: true })
        Alert.alert(
            'Anlaşma metnini kabul ediyor musunuz?',
            strings.AGREEMENT_POLICY,
            [
                {
                    text: 'Reddet',
                    onPress: () => { },
                    style: 'cancel',
                },
                {
                    text: 'Onaylıyorum', onPress: () => this.props.startConsultancy(this.props.state.user, consultant, (status) => {
                        if (status == 'new') {

                        } else if (status == 'continue') {

                        }
                    })
                },
            ]
        )
    }

    onModalClose = () => {
        this.setState({ infoModalVisible: false })
    }

    render() {
        console.log("CONSULTANTS", this.props.state.consultants)
        return (
            <View style={styles.fullScreen}>
                <FlatList
                    data={this.props.state.consultants}
                    extraData={this.props.state.consultants}
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

    console.log("Before splice", consultants)

    console.log("CC", consultant_chats);

    for (var i = consultants.length - 1; i >= 0; i--) {
        for (var j = 0; j < consultant_chats.length; j++) {
            if (consultants[i] && (consultants[i].uid !== consultant_chats[j].user.uid)) {
                consultants.splice(i, 1);
            }
        }
    }
    console.log("After splice", consultants)
    return { state: { user, consultants } }
}

export default connect(mapStateToProps, actions)(ConsultantListScreen);