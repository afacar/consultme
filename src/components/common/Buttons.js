import React, { Component } from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import * as styles from '../../Constants/Styles';

import { SaveIcon, SignOutIcon, FilterIcon, CashIcon,PlayIcon, PauseIcon, MicIcon, CameraIcon } from './Icons';

import colors from '../../Constants/Colors';

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

export class HomeScreenDivider extends Component {
  render() {
    const { consultantsSelected, user } = this.props;
    let isProvider = false;
    if (user) {
      if (user.isProvider)
        isProvider = true
    }
    if (isProvider) {
      return (
        <View style={{ flexDirection: 'row', width: '100%' }}>
          <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: consultantsSelected ? 3 : 0, borderBottomColor: colors.IOS_DARK_BLUE, borderBottomStartRadius: 25 }}>
            <Button type='clear' title='Danışmanlarım' buttonStyle={{ margin: 10 }} titleStyle={{ color: colors.IOS_BLUE, fontSize: consultantsSelected ? 16 : 14 }} onPress={() => { this.props.changeTab('consultingFrom') }} />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', borderBottomWidth: consultantsSelected ? 0 : 3, borderBottomColor: colors.IOS_DARK_BLUE, borderBottomRightRadius: 25 }}>
            <Button type='clear' title='Danışanlarım' buttonStyle={{ margin: 10 }} titleStyle={{ color: colors.IOS_BLUE, fontSize: consultantsSelected ? 14 : 16 }} onPress={() => { this.props.changeTab('consultingTo') }} />
          </View>
        </View>
      )
    }
  }
}


export class FilterButton extends Component {
  render() {
    return (
      <Button
        title={this.props.title || "Uzmanları Listele"}
        onPress={this.props.onPress || null}
        type={'outline'}
        disabled={this.props.disabled}
        icon={<FilterIcon disabled={this.props.disabled} color={this.props.iconColor} size={27} />}
        containerStyle={[this.props.containerStyle, {
          padding: 10,
          justifyContent: 'center'
        }]}
        titleStyle={[this.props.titleStyle, { paddingLeft: 5, paddingRight: 5, fontSize: 19 }]}
        buttonStyle={[this.props.buttonStyle, styles.default.searchButtonStyle]}
      />
    );
  }
}

export class BuyButton extends Component {
  render() {
    return (
      <Button
        title={this.props.title || "Kredi Al"}
        onPress={this.props.onPress || null}
        type={'outline'}
        disabled={this.props.disabled}
        icon={<CashIcon disabled={this.props.disabled} color={this.props.iconColor} size={24} />}
        containerStyle={[this.props.containerStyle, {
          padding: 10,
          justifyContent: 'center'
        }]}
        titleStyle={[this.props.titleStyle, { paddingLeft: 5, paddingRight: 5, fontSize: 18 }]}
        buttonStyle={[this.props.buttonStyle, styles.default.buttonStyle]}
      />
    );
  }
}
export class PlayButton extends Component {
  render() {
    return (
      <Button
        title=""
        onPress={this.props.onPress}
        icon={<PlayIcon isListening={this.props.isListening} />}
        containerStyle={styles.buttonStyle}
        buttonStyle={{ backgroundColor: 'transparent', padding: 0 }}
      />
    )
  }
}

export class PauseButton extends Component {
  render() {
    return (
      <Button
        title=""
        onPress={this.props.onPress}
        icon={<PauseIcon isListening={this.props.isListening} />}
        containerStyle={styles.buttonStyle}
        buttonStyle={{ backgroundColor: 'transparent', padding: 0 }}
      />
    )
  }
}
export class MicButton extends Component {
  render() {
    return (
      <Button
        title=""
        onPress={this.props.onPress}
        icon={<MicIcon isListening={this.props.isListening} />}
        containerStyle={styles.buttonStyle}
        buttonStyle={{ backgroundColor: 'transparent', padding: 0 }}
      />
    )
  }
}

export class CameraButton extends Component {
  render() {
    return (
      <Button
        title=""
        onPress={this.props.onPress}
        icon={<CameraIcon isListening={this.props.isListening} />}
        containerStyle={styles.buttonStyle}
        buttonStyle={{ backgroundColor: 'transparent', padding: 0 }}
      />
    )
  }
}