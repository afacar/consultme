import React, { Component } from 'react';
import { View, ImageBackground, Dimensions } from 'react-native';

import {  Card, Button, Input, Avatar } from 'react-native-elements';
import { SaveButton } from '../common/Buttons';


class ProfileForm extends Component {
  

  render() {

        return (
          <Card title="Bilgileriniz" containerStyle={styles.containerStyle}>
    
            <View style={{ margin: 10, alignItems: 'center', flexDirection: 'column', flex: 1 }}>
              <Avatar
                        size="xlarge"
                        rounded={true}
                        icon={{ name: 'account', type: 'material-community' }}
                        showEditButton={true}
                    />
              
            </View>
              <Input
                key="displayname"
                label="Ad soyad"
                placeholder="Ör. Ahmet Yılmaz"
              />
           
            <SaveButton
                icon={{ name: 'account', type: 'material-community' }}
            />
          </Card>
        );
      }
  
    }


const styles = {
  containerStyle: {
    margin: 5,
  }
}

export default ProfileForm;

