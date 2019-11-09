import React, { Component } from 'react';
import { ScrollView, Alert, ActivityIndicator, KeyboardAvoidingView } from 'react-native';

import { connect } from 'react-redux';

import * as actions from '../appstate/actions/index';
import styles from '../Constants/Styles';

import { ApplicationFirstComponent, ApplicationSecondComponent, ApplicationThirdComponent } from '../components/common';

class ConsultantApplicationScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        header: null
    });

    state = {
        branch: '',
        subBranch: '',
        interest: '',
        address: '',
        addressEmpty: false,
        errorMessage: '',
        firstComponentCompleted: false,
        secondComponentCompleted: false,

        consultationDetails: {
            subscriptionPrice: '',
            textPrice: '',
            videoPrice: '',
            audioPrice: '',
        },
        subscriptionOpened: false,
        sessionOpened: false,
        footerText: 'Ücretlendirme şekli seçin'
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    selectBranch = (selectedValue) => {
        this.setState({ branch: selectedValue.branch, errorMessage: '' })
    }

    onSubBranchChange = (subBranch) => {
        this.setState({ subBranch })
    }

    onInterestChange = (interest) => {
        this.setState({ interest, })
    }

    onAddressChange = (address) => {
        this.setState({ address, errorMessage: '', addressEmpty: false })
    }

    onFirstComponentCompleted = () => {
        if (!this.state.branch) {
            this._isMounted && this.setState({
                errorMessage: 'Branş boş bırakılamaz*'
            })
        } else if (!this.state.address) {
            this.setState({
                addressEmpty: true,
                errorMessage: 'Adres boş bırakılamaz*'
            })
        } else {
            this.setState({
                firstComponentCompleted: true
            })
        }
    }

    backPressedOnFirst = () => {
        this.setState({
            firstComponentCompleted: false,
            errorMessage: ''
        })
        this.props.navigation.goBack();
    }

    backPressedOnSecond = () => {
        this.setState({
            firstComponentCompleted: false,
            errorMessage: ''
        })
    }

    openSubscriptionDetails = () => {
        this.setState({ subscriptionOpened: true, sessionOpened: false, footerText: 'Aylık abonelik ile devam edilsin mi?' })
    }

    openSessionDetails = () => {
        this.setState({ subscriptionOpened: false, sessionOpened: true, footerText: 'Oturum başına ücretlendirme ile devam edilsin mi?' })
    }


    onSubscriptionPriceChanged = (price) => {
        var { consultationDetails } = this.state;
        consultationDetails.subscriptionPrice = price;
        this.setState({
            consultationDetails
        })
    }

    onTextPriceChanged = (price) => {
        var { consultationDetails } = this.state;
        consultationDetails.textPrice = price;
        this.setState({
            consultationDetails
        })
    }

    onAudioPriceChanged = (price) => {
        var { consultationDetails } = this.state;
        consultationDetails.audioPrice = price;
        this.setState({
            consultationDetails
        })
    }

    onVideoPriceChanged = (price) => {
        var { consultationDetails } = this.state;
        consultationDetails.videoPrice = price;
        this.setState({
            consultationDetails
        })
    }

    onSecondComponentCompleted = async () => {
        this.props.user.isProvider = true
        const { branch, subBranch, interest, address, sessionOpened, subscriptionOpened } = this.state
        const { subscriptionPrice, textPrice, audioPrice, videoPrice } = this.state.consultationDetails;
        if (!subscriptionPrice) {
            this.setState({ errorMessage: 'Abonelik ücreti boş bıraklamaz' })
            return;
        } else if (!textPrice) {
            this.setState({ errorMessage: 'Mesaj ücreti boş bıraklamaz' })
            return;
        } else if (!videoPrice) {
            this.setState({ errorMessage: 'Görüntülü arama ücreti boş bıraklamaz. En az ücret 0.5tl.' })
            return;
        } else if (!audioPrice) {
            this.setState({ errorMessage: 'Sesli arama ücreti boş bıraklamaz. En az ücret 0.5tl.' })
            return;
        } else if (videoPrice < 0.5) {
            this.setState({ errorMessage: 'Görüntülü arama ücreti 0.5tl-den büyük olmalıdır.' })
            return;

        } else if (audioPrice < 0.5) {
            this.setState({ errorMessage: 'Sesli arama ücreti 0.5tl-den büyük olmalıdır.' })
            return;
        }
        var consultationDetails = {
            branch,
            subBranch,
            interest,
            address,
            textPrice,
            audioPrice,
            videoPrice,
            subscriptionPrice
        }
        this.setState({
            disabled: true,
            loading: true,
            secondComponentCompleted: true,
        })
        await this.props.createNewConsultant(this.props.user, consultationDetails)
        this.setState({
            disabled: false,
            loading: false
        })

        this.props.navigation.navigate('SplashScreen')
    }

    renderComponents = () => {
        const { firstComponentCompleted, secondComponentCompleted } = this.state;
        if (!firstComponentCompleted) {
            return (
                <ApplicationFirstComponent selectBranch={this.selectBranch} branch={this.state.branch}
                    subBranch={this.state.subBranch} onSubBranchChange={this.onSubBranchChange}
                    interest={this.state.interest} onInterestChange={this.onInterestChange}
                    address={this.state.address} onAddressChange={this.onAddressChange} shake={this.state.addressEmpty}
                    onNextPressed={this.onFirstComponentCompleted}
                    onBackPressed={this.backPressedOnFirst}
                    errorMessage={this.state.errorMessage}
                    disabled={this.state.disabled}
                />
            )
        } else if (!secondComponentCompleted) {
            return (
                <ApplicationSecondComponent
                    openSubscriptionDetails={this.openSubscriptionDetails} openSessionDetails={this.openSessionDetails}
                    subscriptionPrice={this.state.subscriptionPrice} onSubscriptionPriceChanged={this.onSubscriptionPriceChanged}
                    textPrice={this.state.textPrice} onTextPriceChanged={this.onTextPriceChanged}
                    audioPrice={this.state.audioPrice} onAudioPriceChanged={this.onAudioPriceChanged}
                    videoPrice={this.state.videoPrice} onVideoPriceChanged={this.onVideoPriceChanged}
                    onNextPressed={this.onSecondComponentCompleted}
                    onBackPressed={this.backPressedOnSecond}
                    errorMessage={this.state.errorMessage}
                    footerText={this.state.footerText}
                    disabled={this.state.disabled}
                    user={this.props.user}
                    consultationDetails={this.state.consultationDetails}
                />
            )
        }
    }
    render() {
        return (
            <ScrollView style={[styles.fullScreen, { margin: 10 }]}>
                <KeyboardAvoidingView style={{ flex: 1 }} >
                    {this.renderComponents()}
                    {this.renderLoading()}
                </KeyboardAvoidingView>
            </ScrollView>
        )
    }
    renderLoading = () => {
        if (this.state.loading) {
            return <ActivityIndicator size='large' style={styles.screenCenter} color='green' />
        }
    }
    componentWillUnmount() {
        this._isMounted = false
    }
}

const mapStateToProps = ({ auth }) => {
    const { user } = auth;
    return { user };
}
export default connect(mapStateToProps, actions)(ConsultantApplicationScreen);