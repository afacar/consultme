import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import * as styles from '../../Constants/Styles';
import { SaveIcon } from './Icons';

export class SaveButton extends Component {
    render() {
      return (
        <Button
          title={this.props.title || "Kaydet"}
          onPress={this.props.onPress || null}
          type = {'outline'}
          disabled={this.props.disabled}
          icon={<SaveIcon size={16}/>}
          containerStyle={[ this.props.containerStyle,{
            padding: 10 ,
            justifyContent: 'center'
          }]}
          titleStyle={[this.props.titleStyle, {paddingLeft: 5, fontSize: 18}]}
          buttonStyle={[this.props.buttonStyle, styles.default.buttonStyle]}
        />
      );
    }
  }

  