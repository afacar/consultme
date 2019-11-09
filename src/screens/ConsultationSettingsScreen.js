import React, { Component } from 'react';
import { ScrollView, Text } from 'react-native';

import * as actions from '../appstate/actions';
import { connect } from 'react-redux';

import styles from '../Constants/Styles';
import ConsultantPricingForm from '../components/common/ConsultantPricingForm';
import { Card } from 'react-native-elements';

import { SaveButton } from '../components/common/Buttons';

class ConsultationSettingsScreen extends Component {

    static navigationOptions = {
        title: 'Ücretlendirme ayarları'
    };

    state = {
        changesMade: false,
        disabled: false,
        consultationDetails: {
            /* subscriptionPrice,
                audioPrice,
                textPrice,
                videoPrice
            */
        }
    }

    mounted = false;

    componentDidMount = () => {
        this.mounted = true;
    }

    static getDerivedStateFromProps = (nextProps, prevState) => {
        console.log("props in css", nextProps)
        if (nextProps.user) {
            return ({ consultationDetails: nextProps.user.consultationDetails })
        }
        return prevState
    }

    componentWillUnmount = () => {
        this.mounted = false
    }

    onSubscriptionPriceChanged = (price) => {
        var { consultationDetails } = this.state;
        consultationDetails.subscriptionPrice = price;
        this.setState({
            changesMade: true,
            consultationDetails
        })
    }

    onTextPriceChanged = (price) => {
        var { consultationDetails } = this.state;
        consultationDetails.textPrice = price;
        this.setState({
            changesMade: true,
            consultationDetails
        })
    }

    onAudioPriceChanged = (price) => {
        var { consultationDetails } = this.state;
        consultationDetails.audioPrice = price;
        this.setState({
            changesMade: true,
            consultationDetails
        })
    }

    onVideoPriceChanged = (price) => {
        var { consultationDetails } = this.state;
        consultationDetails.videoPrice = price;
        this.setState({
            changesMade: true,
            consultationDetails
        })
    }

    onSaveButtonPressed = async () => {
        this.setState({
            disabled: true
        })
        await this.props.updateConsultationDetails(this.props.user, this.state.consultationDetails)
        this.setState({
            disabled: false,
            changesMade: false
        })
    }

    render() {
        return (
            <ScrollView style={styles.fullScreen}>
                <Card >
                    <ConsultantPricingForm onSubscriptionPriceChanged={this.onSubscriptionPriceChanged} onTextPriceChanged={this.onTextPriceChanged}
                        onAudioPriceChanged={this.onAudioPriceChanged} onVideoPriceChanged={this.onVideoPriceChanged} consultationDetails={this.state.consultationDetails}
                        changesMade={this.state.changesMade} />
                </Card>
                {this.state.changesMade && (
                    <SaveButton onPress={() => { this.onSaveButtonPressed() }} disabled={this.state.disabled} />
                )}
            </ScrollView>
        )
    }
}

mapStateToProps = (state) => {
    return ({ user: state.auth.user })
}

export default connect(mapStateToProps, actions)(ConsultationSettingsScreen);