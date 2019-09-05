import React, { Component } from 'react';
import { View, Text, Alert, ActivityIndicator } from 'react-native';

import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import * as actions from '../appstate/actions';

import * as Styles from '../Constants/Styles'
import { LoginPhoneNumberComponent, NameComponent, ProfileEmptyPictureComponent, ProfilePictureChosenComponent, PhoneNumberVerificationComponent } from '../components/common';
class LoginScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Kayıt ol`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });
    unsubscribe = null;
    state = {
        phoneNumberEntered: false,
        profile: {
            name: '',
            number: '',
            photoURL: '',
            path: '',
            uid: ''
        },
        message: '',
        verificationCode: '',
        phoneNumberVerified: false,
        nameEntered: false,
        numberEntered: false,
        picChosen: false,
        completedRegistration: false,
        loading: false,
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true
        this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                console.log("LS user", user)
                this._isMounted && this.setState({
                    phoneNumberVerified: true,
                    loading: false,
                    message: '',
                    profile: { ...this.state.profile, uid: user.uid }
                });
            }
        });
    }

    renderMessage() {
        const { message } = this.state;

        if (!message.length) return null;

        return (
            <Text style={{ padding: 5, color: 'red' }}>{message}</Text>
        );
    }

    finishUserCreation = async () => {

        this.setState({
            loading: true
        })
        if (this.state.profile.name) {
            this.setState({
                loading: false,
                nameEntered: true
            })
        } else {
            this._isMounted &&
                this.setState({
                    loading: false,
                    message: 'İsim boş bırakılamaz'
                })
        }

        await this.props.createNewUserProfile(this.state.profile);
        this.setState({
            completedRegistration: true,
            loading: false,
        })
        this.props.navigation.navigate('SplashScreen');

    }

    signIn = async () => {
        console.log("Number ", number)
        const { number } = this.state.profile;
        this.setState({ disabled: true, loading: true })
        this.setState({ message: 'Kod SMS ile yollanıyor ...' });
        firebase.auth().signInWithPhoneNumber(number)
            .then(confirmResult => {
                this._isMounted && this.setState({ confirmResult, loading: false, phoneNumberEntered: true, message: '' })
            })
            .catch(error => this.setState({ message: `Telefon numarası Hata mesajı: ${error.message}`, loading: false, disabled: false }));
    };

    onNameChanged = (name) => {
        this.setState({
            message: '',
            profile: { ...this.state.profile, name: name }
        })
    }

    onNumberChanged = (number) => {
        this.setState({
            message: '',
            profile: { ...this.state.profile, number: number }
        })
    }

    verifyPhoneNumber = () => {
        const { verificationCode, confirmResult } = this.state;
        this._isMounted && this.setState({ loading: true })
        if (confirmResult && verificationCode.length) {
            confirmResult.confirm(verificationCode)
                .then(() => {
                    this._isMounted && this.setState({
                        phoneNumberVerified: true,
                        loading: false,
                        message: ''
                    })
                })
                .catch(error => {
                    this.setState({ message: `Hatalı kod mesajı: ${error.message}`, loading: false })
                });
        } else {
            this.setState({ message: 'Doğrulama kodu boş bırakılamaz' })
        }
    }

    onVerificationCodeChanged = (number) => {
        this.setState({
            message: '',
            verificationCode: number,
        })
    }

    confirmNumber = () => {
        const { number } = this.state.profile;
        if (number.length == 0)
            this.setState({ message: 'Numara boş bırakılamaz' });
        else if (number.length < 10) {
            this.setState({ message: 'Geçerli bir numara giriniz ' });
        } else {
            Alert.alert('Aşağıda girmiş olduğunuz telefon numarasını onaylayacağız.', `${this.state.profile.number}` + '\n Numaranızı onaylıyor musunuz?',
                [
                    {
                        text: 'Değiş',
                        onPress: () => { },
                        style: 'cancel',
                    },
                    { text: 'Devam et', onPress: () => this.signIn() },
                ],
                { cancelable: false },
            );
        }
    }

    becomeConsultant = async () => {
        console.log("LS Prof", this.state.profile)
        if (!this.state.profile.name) {
            this.setState({
                loading: false,
                message: 'İsim boş bırakılamaz'
            })
        } else {
            this.props.saveUser(this.state.profile)
            this.props.createNewUserProfile(this.state.profile)
            this.props.navigation.navigate('ConsultantApplicationScreen');
        }
    }

    renderLoginComponent = () => {
        if (!this.state.phoneNumberEntered) {
            return <LoginPhoneNumberComponent phoneNumber={this.state.profile.number} onNumberChanged={this.onNumberChanged} disabled={this.state.loading} onNextPressed={this.confirmNumber} />
        } else if (!this.state.phoneNumberVerified && this.state.phoneNumberEntered) {
            return <PhoneNumberVerificationComponent verificationCode={this.state.verificationCode} onNextPressed={this.verifyPhoneNumber} disabled={this.state.loading} onVerificationCodeChanged={this.onVerificationCodeChanged} />
        }
        else if (!this.state.picChosen) {
            return <ProfileEmptyPictureComponent name={this.state.profile.name} onNameChanged={this.onNameChanged}
                avatarPressed={this.openPicker} disabled={this.state.loading}
                onNextPressed={this.finishUserCreation} onTextPressed={this.becomeConsultant} />
        } else if (this.state.picChosen) {
            return <ProfilePictureChosenComponent name={this.state.profile.name} onNameChanged={this.onNameChanged}
                uri={this.state.profile.photoURL} disabled={this.state.loading} avatarPressed={this.openPicker}
                onNextPressed={this.finishUserCreation} onTextPressed={this.becomeConsultant} />
        }
    }

    renderLoading = () => {
        if (this.state.loading) {
            return <ActivityIndicator size='large' style={Styles.loader} />
        }
    }


    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                {this.renderLoginComponent()}
                {this.renderMessage()}
                {this.renderLoading()}
            </View>
        )
    }

    openPicker = () => {
        const options = {
            title: 'Fotoğraf Yükle',
            chooseFromLibraryButtonTitle: 'Fotoğraflarımdan seç',
            takePhotoButtonTitle: 'Kamerayı aç',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                allowsEditing: true,
                cameraRoll: true
            },
        };

        ImagePicker.showImagePicker(options, (response) => {
            console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled image picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {


                if (Platform.OS === 'ios') {
                    response.path = response.uri.replace("file://", '');
                }

                this.handleState({ response });
            }
        });
    }

    handleState = (newState) => {
        this.setState(prevState => {
            let profile = prevState.profile;
            for (var key in newState) {
                if (newState.hasOwnProperty(key)) {
                    if (key === "response") {
                        profile.photoURL = newState.response.uri;
                        profile.path = newState.response.path;
                    } else {
                        profile[key] = newState[key];
                    }
                }
                prevState.profile = profile;
                prevState.picChosen = true;
                return prevState;
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
        if (!this.state.completedRegistration)
            firebase.auth().signOut();
        if (this.unsubscribe) this.unsubscribe();
    }
}

export default connect(null, actions)(LoginScreen);
