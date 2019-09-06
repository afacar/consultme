import React, { Component } from 'react';
import { Button } from 'react-native-elements';

export class SaveButton extends Component {
    render() {
      return (
        <Button
          title={this.props.title || "Kaydet"}
          onPress={this.props.onPress}
          disabled={this.props.disabled}
          titleStyle={styles.titleStyle}
          containerStyle={{
            padding: 10 ,
            justifyContent: 'center'
          }}
          buttonStyle={this.props.buttonStyle||{ backgroundColor: '#51A0D5', marginHorizontal: '20%' }}
        />
      );
    }
  }

  