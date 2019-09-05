import React, { Component } from 'react';
import { ScrollView, Text, ActivityIndicator } from 'react-native';

import { connect } from 'react-redux';

import * as actions from '../appstate/actions/index';
import * as styles from '../Constants/Styles';

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

        subscriptionOpened: false,
        sessionOpened: false,
        subscriptionPrice: '',
        textPrice: '',
        videoPrice: '',
        audioPrice: '',
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
        this.setState({ interest })
    }

    onAddressChange = (address) => {
        this.setState({ address, addrerrorMessageessEM: '', addressEmpty: false })
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
        this.setState({
            subscriptionPrice: price
        })
    }

    onSessionTextPriceChanged = (textPrice) => {
        this.setState({ textPrice })
    }

    onSessionVideoPriceChanged = (videoPrice) => {
        this.setState({ videoPrice })
    }

    onSessionAudioPriceChanged = (audioPrice) => {
        this.setState({ audioPrice })
    }

    onSecondComponentCompleted = async () => {

        const { branch, subBranch, interest, address, sessionOpened, subscriptionOpened } = this.state
        if (subscriptionOpened) {
            const { subscriptionPrice } = this.state
            if (!subscriptionPrice) {
                this.setState({ errorMessage: 'Abonelik ücreti boş bıraklamaz' })
            } else {
                var consultationDetails = {
                    branch,
                    subBranch,
                    interest,
                    address,
                    subBranch,
                    subscriptionPrice,
                    type:'subscription'
                }
                this.setState({
                    disabled: true,
                    secondComponentCompleted: true,
                    loading: true
                })
                await this.props.createNewConsultant(this.props.user, consultationDetails)
                this.setState({
                    disabled: false,
                    loading: false
                })

            }
        } else if (sessionOpened) {
            const { textPrice, audioPrice, videoPrice } = this.state;
            if (!textPrice) {
                this.setState({ errorMessage: 'Mesaj ücreti boş bıraklamaz' })
            } else if (!videoPrice) {
                this.setState({ errorMessage: 'Görüntülü arama ücreti boş bıraklamaz. En az ücret 0.5tl.' })
            } else if (!audioPrice) {
                this.setState({ errorMessage: 'Sesli arama ücreti boş bıraklamaz. En az ücret 0.5tl.' })
            } else if (videoPrice < 0.5) {
                this.setState({ errorMessage: 'Görüntülü arama ücreti 0.5tl-den büyük olmalıdır.' })
            } else if (audioPrice < 0.5) {
                this.setState({ errorMessage: 'Sesli arama ücreti 0.5tl-den büyük olmalıdır.' })
            } else {
                var consultationDetails = {
                    branch,
                    subBranch,
                    interest,
                    address,
                    textPrice,
                    audioPrice,
                    videoPrice,
                    type:'session'
                }
                this.setState({
                    disabled: true,
                    loading: true
                })
                await this.props.createNewConsultant(this.props.user, consultationDetails)
                this.setState({
                    disabled: false,
                    loading: false
                })
            }
        }
    }
    onThirdComponentFinished = () => {
        this.props.navigation.navigate('HomeScreen')
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
                    textPrice={this.state.textPrice} onSessionTextPriceChanged={this.onSessionTextPriceChanged}
                    audioPrice={this.state.audioPrice} onSessionAudioPriceChanged={this.onSessionAudioPriceChanged}
                    videoPrice={this.state.videoPrice} onSessionVideoPriceChanged={this.onSessionVideoPriceChanged}
                    onNextPressed={this.onSecondComponentCompleted}
                    onBackPressed={this.backPressedOnSecond}
                    errorMessage={this.state.errorMessage}
                    footerText={this.state.footerText}
                    subscriptionOpened={this.state.subscriptionOpened}
                    sessionOpened={this.state.sessionOpened}
                    disabled={this.state.disabled}
                />
            )
        } else {
            return (
                <ApplicationThirdComponent loading={this.state.loading} onThirdComponentFinished={this.onThirdComponentFinished} />
            )
        }
    }
    render() {
        return (
            <ScrollView style={[styles.fullScreen, { margin: 10 }]}>
                {this.renderComponents()}


            </ScrollView>
        )
    }

    componentWillUnmount() {
        this._isMounted = false
    }
}

const mapStateToProps = ({ auth }) => {
    console.log("MSTP", auth)
    const { user } = auth;
    return { user };
}
export default connect(mapStateToProps, actions)(ConsultantApplicationScreen);