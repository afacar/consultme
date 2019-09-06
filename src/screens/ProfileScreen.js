import React, { Component } from 'react';
import { ScrollView, KeyboardAvoidingView } from 'react-native';
import ProfileForm from "../components/Forms/ProfileForm";

class ProfileScreen extends Component {

    static navigationOptions = ({ navigation }) => ({
        title: `Profil Ayarlarım`,
        headerTitleStyle: { textAlign: 'center', alignSelf: 'center' },
        headerStyle: {
            backgroundColor: 'white',
        },
    });

    componentDidMount() {
        console.log("ProfileScreen mounted");
    }



    render() {
        return (
            <ScrollView>
            <KeyboardAvoidingView>
              <ProfileForm
                navigate={this.props.navigation.navigate}
              />
            </KeyboardAvoidingView>
          </ScrollView>
        )
    }
}

export default ProfileScreen;

     