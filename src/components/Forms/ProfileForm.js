import React, { Component } from 'react';
import { View } from 'react-native';

import { Card, Input, Avatar } from 'react-native-elements';
import { SaveButton } from '../common/Buttons';


class ProfileForm extends Component {

  
  render() {

    return (
      <View style={{flexDirection: 'column'}}>
        <Card title="Bilgileriniz" containerStyle={styles.containerStyle}>

          <View style={{ margin: 10, alignItems: 'center', flexDirection: 'column', flex: 1 }}>
            <Avatar
              size="xlarge"
              rounded={true}
              icon={{ name: 'account', type: 'material-community' }}
              showEditButton={true}
            />
            <Input
              label="Ad soyad"
              value={"Tofiq Aliyev"}
              placeholder="Ör. Ahmet Yılmaz"
            />
          </View>
        </Card>
  
        <SaveButton        
        />
          
      </View>
    );
  }

}




const styles = {
  containerStyle: {
    margin: 5,
  }
}

export default ProfileForm;

