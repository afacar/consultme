import React, { Component } from 'react';
import { Button } from 'react-native-elements';
import * as styles from '../../Constants/Styles';
import { SaveIcon, SignOutIcon } from './Icons';

export class SaveButton extends Component {
  render() {
    return (
      <Button
        title={this.props.title || "Kaydet"}
        onPress={this.props.onPress || null}
        type={'outline'}
        disabled={this.props.disabled}
        icon={<SaveIcon disabled={this.props.disabled} color={this.props.iconColor} size={16} />}
        containerStyle={[this.props.containerStyle, {
          padding: 10,
          justifyContent: 'center'
        }]}
        titleStyle={[this.props.titleStyle, { paddingLeft: 5, fontSize: 18 }]}
        buttonStyle={[this.props.buttonStyle, styles.default.buttonStyle]}
      />
    );
  }
}

export class SignOutButton extends Component {
  render() {
    return (
      <Button
        title={this.props.title || "Çıkış yap"}
        onPress={this.props.onPress || null}
        type={'outline'}
        disabled={this.props.disabled}
        icon={<SignOutIcon disabled={this.props.disabled} color={this.props.iconColor} size={24} />}
        containerStyle={[this.props.containerStyle, {
          padding: 10,
          justifyContent: 'center'
        }]}
        titleStyle={[this.props.titleStyle, { paddingLeft: 5, fontSize: 18 }]}
        buttonStyle={[this.props.buttonStyle, styles.default.buttonStyle]}
      />
    );
  }
}

