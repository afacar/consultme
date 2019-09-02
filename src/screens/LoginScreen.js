import React, { Component } from 'react';
import { View, Text, Alert } from 'react-native';

import firebase from 'react-native-firebase';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';
import * as actions from '../appstate/actions';


import { LoginPhoneNumberComponent, NameComponent, ProfileEmptyPictureComponent, ProfilePictureChosenComponent, PhoneNumberVerificationComponent } from '../components/common';
class LoginScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Kayıt ol`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    state = {
        phoneNumberEntered: false,
        profile: {
            name: '',
            number: '',
            photoURL: '',
            path: '',
        },
        message: '',
        verificationCode: '',
        phoneNumberVerified: false,
        nameEntered: false,
        numberEntered: false,
        picChosen: false,
        loading: false,
    }

    _isMounted = false;

    componentDidMount() {
        this._isMounted = true
    }

    renderMessage() {
        const { message } = this.state;

        if (!message.length) return null;

        return (
            <Text style={{ padding: 5, backgroundColor: '#000', color: '#fff' }}>{message}</Text>
        );
    }

    finishUserCreation = () => {
        this.props.createNewUserProfile(this.state.profile);
    }

    signIn = async () => {
        console.log("Number ", number)
        const { number } = this.state.profile;
        this.setState({ disabled: true })
        this.setState({ message: 'Kod SMS ile yollanıyor ...' });
        firebase.auth().signInWithPhoneNumber(number)
            .then(confirmResult => {
                this._isMounted && this.setState({ confirmResult, message: 'Kod yollandı!' })
            })
            .catch(error => this.setState({ message: `Telefon numarası Hata mesajı: ${error.message}` }));
    };

    onNameChanged = (name) => {
        console.log("name", name)
        this.setState({
            profile: { ...this.state.profile, name: name }
        })
    }

    onNumberChanged = (number) => {
        console.log("Number", number)
        this.setState({
            profile: { ...this.state.profile, number: number }
        })
    }

    validateName = () => {
        console.log("VN")
        this.setState({
            loading: true
        })
        if (this.state.profile.name) {
            this.setState({
                loading: false,
                nameEntered: true
            })
        }
    }

    verifyPhoneNumber = () => {
        this.setState({
            phoneNumberVerified: true,
        })
    }

    onVerificationCodeChanged = (number) => {
        this.setState({
            verificationCode: number,
        })
    }

    confirmNumber = () => {
        const { number } = this.state.profile;
        if (number.length < 10) {
            this.setState({ message: 'Geçerli bir numara giriniz...' });
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

    renderLoginComponent = () => {
        if (!this.state.phoneNumberEntered) {
            return <LoginPhoneNumberComponent phoneNumber={this.state.profile.number} onNumberChanged={this.onNumberChanged} onNextPressed={this.confirmNumber} />
        } else if (!this.state.phoneNumberVerified && this.state.phoneNumberEntered) {
            return <PhoneNumberVerificationComponent verificationCode={this.state.verificationCode} onNextPressed={this.verifyPhoneNumber} onVerificationCodeChanged={this.onVerificationCodeChanged} />
        }
        else if (this.state.phoneNumberVerified && !this.state.nameEntered) {
            return <NameComponent name={this.state.profile.name} onNameChanged={this.onNameChanged} onNextPressed={this.validateName} />
        }
        else if (!this.state.picChosen) {
            return <ProfileEmptyPictureComponent avatarPressed={this.openPicker} onNextPressed={this.finishUserCreation} />
        } else if (this.state.picChosen) {
            return <ProfilePictureChosenComponent uri={this.state.profile.photoURL} avatarPressed={this.openPicker} onNextPressed={this.finishUserCreation}/>
        }
    }




    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
                {this.renderLoginComponent()}
                {this.renderMessage()}
                {/* <Text>
                    Consult Me telefon numaranızı doğrulamanız için size kod gönderecektir. Lütfen, numaranızı girin.
                </Text>
                <CardItem>
                    <Input
                        key='phone_number'
                        label='Numaranızı girin'
                        placeholder='+90 535 ...'
                        onChangeText={value => this.setState({ phoneNumber: value })}
                        value={this.state.phoneNumber}
                    />
                </CardItem> */}
            </View>
        )
    }

    openPicker = () => {
        console.log("Picker requested")
        // More info on all the options is below in the API Reference... just some common use cases shown here
        const options = {
            title: 'Fotoğraf Seç',
            storageOptions: {
                skipBackup: true,
                path: 'images',
                allowsEditing: true,
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
            console.log('handleState prevState and newState', prevState, newState);
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
                console.log('handleState new prevState', prevState);
                return prevState;
            }
        });
    }

    componentWillUnmount() {
        this._isMounted = false;
    }
}

export default connect(null, actions)(LoginScreen);
