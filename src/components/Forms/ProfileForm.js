import React, { Component } from 'react';
import { KeyboardAvoidingView, View } from 'react-native';

import { Card, Input, Avatar } from 'react-native-elements';
import { SaveButton } from '../common/Buttons';

import strings from '../../Constants/Strings';

class ProfileForm extends Component {


  render() {

    return (
      <KeyboardAvoidingView style={{ flexDirection: 'column' }}>
        <Card title="Bilgileriniz" containerStyle={styles.containerStyle}>

          <View style={{ margin: 10, alignItems: 'center', flexDirection: 'column', flex: 1 }}>
            <Avatar
              onPress={this.props.onAvatarPressed}
              size="xlarge"
              rounded={true}
              showEditButton={true}
              source={{ uri: this.props.user.photoURL || strings.DEFAULT_PROFILE_PIC }}
            />
            <Input
              label="Ad soyad"
              value={this.props.user.name || ''}
              placeholder="Ör. Ahmet Yılmaz"
              onChangeText={(name) => { this.props.onChangeName(name) }}
            />
          </View>
        </Card>

        <SaveButton
          title={this.props.saveButtonTitle}
          onPress={() => this.props.saveButtonPressed()}
          disabled={this.props.disabled}
        />

      </KeyboardAvoidingView>
    );
  }

}




const styles = {
  containerStyle: {
    margin: 5,
  }
}

export default ProfileForm;

