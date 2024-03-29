import React, { Component } from 'react';
import { Text, Alert, ActivityIndicator, Platform, KeyboardAvoidingView } from 'react-native';

import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';

import { connect } from 'react-redux';
import * as actions from '../appstate/actions';

import styles from '../Constants/Styles';
import { LoginPhoneNumberComponent, ProfilePictureComponent, PhoneNumberVerificationComponent } from '../components/ScreenParts/LoginComponents';

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
            uid: '',
        },
        message: '',
        verificationCode: '',
        phoneNumberVerified: false,
        nameEntered: false,
        numberEntered: false,
        picChosen: false,
        completedRegistration: false,
        loading: false,
        switch1Value: false
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true
        this.unsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
            if (user) {
                this._isMounted && this.setState({
                    phoneNumberVerified: true,
                    loading: false,
                    message: '',
                    profile: { ...this.state.profile, uid: user.uid, name: user.displayName, photoURL: user.photoURL }
                });
            }
        });
    }

    toggleSwitch1 = (value) => {
        this.setState({ switch1Value: value })
    }

    renderMessage() {
        const { message } = this.state;

        if (!message.length) return null;

        return (
            <Text style={{ padding: 5, color: 'red' }}>{message}</Text>
        );
    }

    finishUserCreation = async () => {
        if (!this.state.profile.name) {
            this.setState({
                loading: false,
                message: 'İsim boş bırakılamaz'
            })
        } else {
            if (!this.state.switch1Value) {
                this.setState({
                    loading: true,
                })
                await this.props.createNewUserProfile(this.state.profile);
                this.setState({
                    completedRegistration: true,
                    loading: false,
                })
                this.props.navigation.navigate('SplashScreen');
            } else {
                if (!this.state.profile.name) {
                    this.setState({
                        loading: false,
                        message: 'İsim boş bırakılamaz'
                    })
                } else {
                    this.setState({
                        completedRegistration: true,
                        loading: false,
                    })
                    this.props.saveUser(this.state.profile)
                    this.props.createNewUserProfile(this.state.profile)
                    this.props.navigation.navigate('ConsultantApplicationScreen');
                }
            }
        }
    }

    signIn = async () => {
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
                    var credential = firebase.auth.PhoneAuthProvider.credential(confirmResult.verificationId, verificationCode);
                    firebase.auth().signInWithCredential(credential).then((result) => {
                        console.log("Sign in result", result)
                    })
                })
                .catch(error => {
                    this.setState({ message: `Hatalı kod mesajı: ${error.message}`, loading: false })
                });
        } else {
            this.setState({ message: 'Doğrulama kodu boş bırakılamaz' })
        }
    }

    generateRandomPass = () => {
        return Math.random().toString(36).slice(-8);
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
        else if (!this.state.nameEntered) {
            return <ProfilePictureComponent name={this.state.profile.name} onNameChanged={this.onNameChanged}
                uri={this.state.profile.photoURL} disabled={this.state.loading} avatarPressed={this.openPicker}
                onNextPressed={this.finishUserCreation} onTextPressed={this.becomeConsultant}
                switch1Value={this.state.switch1Value} toggleSwitch1={this.toggleSwitch1} />
        }
    }

    renderLoading = () => {
        if (this.state.loading) {
            return <ActivityIndicator size='large' style={styles.screenCenter} />
        }
    }


    render() {
        return (
            <KeyboardAvoidingView style={{ flex: 1, }}>
                {this.renderLoginComponent()}
                {this.renderMessage()}
                {this.renderLoading()}
            </KeyboardAvoidingView>
        )
    }

    openPicker = () => {
        const options = {
            title: 'Fotoğraf Yükle',
            chooseFromLibraryButtonTitle: 'Fotoğraflarımdan seç',
            takePhotoButtonTitle: 'Kamerayı aç',
            cancelButtonTitle: 'Kapat',
            mediaType: 'photo',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                allowsEditing: true,
                cameraRoll: true,
                path: Platform.OS == 'ios' ? 'Documents/ConsultMe Images/ProfilePictures' : 'Pictures/ ConsultMe Images/ProfilePictures'
            },
        };

        ImagePicker.showImagePicker(options, (response) => {

            if (response.didCancel) {
            }
            else if (response.error) {
            }
            else if (response.customButton) {
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
        if (!this.state.completedRegistration) {
            if (firebase.auth().currentUser)
                firebase.auth().signOut();
        }
        if (this.unsubscribe) this.unsubscribe();
    }
}

export default connect(null, actions)(LoginScreen);
