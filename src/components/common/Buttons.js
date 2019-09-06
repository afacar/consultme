import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import * as styles from '../../Constants/Styles';
import { SaveIcon } from './Icons';

export class SaveButton extends Component {
    render() {
      return (
        <Button
          title={this.props.title || "Kaydet"}
          onPress={this.props.onPress}
          type = {'outline'}
          disabled={this.props.disabled}
          icon={<SaveIcon />}
          containerStyle={[ this.props.containerStyle,{
            padding: 10 ,
            justifyContent: 'center'
          }]}
          buttonStyle={[this.props.buttonStyle, styles.default.buttonStyle]}
        />
      );
    }
  }

  