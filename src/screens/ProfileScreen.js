import React, { Component } from 'react';
import { ScrollView, Platform } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { connect } from 'react-redux';

import ProfileForm from "../components/Forms/ProfileForm";
import * as actions from '../appstate/actions';
import strings from '../Constants/Strings';
import { thisExpression } from '@babel/types';
import firebase from 'react-native-firebase';

const saveButtonDefaultTitle = 'Profilini düzenle'
const saveButtonEnabledTitle = 'Kaydet';
const saveButtonSavingTitle1 = 'Kaydediliyor.';
const saveButtonSavingTitle2 = 'Kaydediliyor..';
const saveButtonSavingTitle3 = 'Kaydediliyor...';


class ProfileScreen extends Component {

  static navigationOptions = ({ navigation }) => ({
    title: `Profil Ayarlarım`,
    headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
    headerStyle: {
      backgroundColor: 'white',
    },
  });

  state = {
    profile: {},
    disabled: true,
    loading: false,
    saveButtonTitle: saveButtonDefaultTitle,
    switch1Value: false
  }

  componentDidMount() {
    this.setState({
      profile: {
        name: this.props.user.name,
        photoURL: this.props.user.photoURL
      }
    })
  }

  onAvatarPressed = () => {
    var customButtons = [];
    if (this.state.profile.photoURL !== strings.DEFAULT_PROFILE_PIC) {
      customButtons = [{
        name: 'DeleteButton',
        title: 'Fotoğrafı Sil'
      }]
    }
    const options = {
      title: 'Fotoğraf Yükle',
      chooseFromLibraryButtonTitle: 'Fotoğraflarımdan seç',
      takePhotoButtonTitle: 'Kamerayı aç',
      cancelButtonTitle: 'Kapat',

      customButtons: customButtons,
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
        const { user } = this.props;
        user.photoURL = strings.DEFAULT_PROFILE_PIC;
        this.setState({
          disabled: false,
          saveButtonTitle: saveButtonEnabledTitle
        })
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
      const { user } = this.props;
      for (var key in newState) {
        if (newState.hasOwnProperty(key)) {
          if (key === "response") {
            user.photoURL = newState.response.uri;
            user.path = newState.response.path;
          } else {
            user[key] = newState[key];
          }
        }
        prevState.profile = user;
        prevState.disabled = false;
        return prevState;
      }
    });
  }

  onChangeName = (newName) => {
    const prevName = this.state.profile.name;
    var { user } = this.props;
    if (prevName !== newName) {
      this.setState({ disabled: false, saveButtonTitle: saveButtonEnabledTitle })
      user.name = newName
    } else {
      user.name = newName
      this.setState({ disabled: true, saveButtonTitle: saveButtonDefaultTitle })
    }
  }

  saveButtonPressed = () => {
    this.setState({ loading: true, counter: 0, disabled: true })
    this.setState({ saveButtonTitle: saveButtonSavingTitle1 })
    this.savinginterval = setInterval(() => {
      if (this.state.counter % 3 == 0) {
        this.setState({
          saveButtonTitle: saveButtonSavingTitle2
        })
      } else if (this.state.counter % 3 == 1) {
        this.setState({
          saveButtonTitle: saveButtonSavingTitle3
        })
      } else if (this.state.counter % 3 == 2) {
        this.setState({
          saveButtonTitle: saveButtonSavingTitle1,
        })
      } this.setState({
        counter: this.state.counter + 1,
      })
    }, 1000)
    this.props.saveProfile(this.props.user, (result) => {
      if (result == 'Successfull') {
        this.setState({ saveButtonTitle: 'Kaydedildi' })
        clearInterval(this.savinginterval);
        this.setState({
          profile: {
            name: this.props.user.name,
            photoURL: this.props.user.photoURL
          },
          loading: false
        });
      }
      else {
        this.setState({ saveButtonTitle: 'Hata oluştu' })
        clearInterval(this.savinginterval);
      }
      setTimeout(this.resetState, 2500)
    })
  }

  toggleSwitch1 = (value) => {
    console.log("Value", value);
    this.setState({ switch1Value: value, disabled: false })
  }

  resetState = () => {
    this.setState({
      loading: false,
      disabled: true,
      saveButtonTitle: saveButtonDefaultTitle,
      counter: 0
    })
  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      this.props.navigation.navigate('SplashScreen')
    });
  }

  render() {
    return (
      <ScrollView>
        <ProfileForm saveButtonTitle={this.state.saveButtonTitle} user={this.props.user}
          onChangeName={this.onChangeName} disabled={this.state.disabled} loading={this.state.loading}
          saveButtonPressed={this.saveButtonPressed} onAvatarPressed={this.onAvatarPressed} signOut={this.signOut}
          toggleSwitch1={this.toggleSwitch1}
          switch1Value={this.state.switch1Value} isProvider={this.props.user.isProvider} />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth.user }
}

export default connect(mapStateToProps, actions)(ProfileScreen);

