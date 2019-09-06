import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import * as styles from '../../Constants/Styles';

export class CardItem extends Component {
  state = { hasError: false };

  componentDidCatch(error, info) {
    console.error("CardItemCaught error", error, info);
    this.setState({ hasError: true, error, info });
  }

  render() {
    if (this.state.hasError) {
      const { error, info } = this.state;
      return (
        <View>
          <Text>Bir sorun var! {`\nError:${error} \n\nInfo:${JSON.stringify(info)}`}</Text>
        </View>
      );
    }
    return (
      <View style={[styles.cardItemRowStyle, this.props.style]}>
        {this.props.label && <Text style={styles.cardItemLabelStyle}>{this.props.label}</Text>}
        <View style={styles.cardItemContentStyle}>
          {this.props.children}
        </View>
      </View>
    );
  }
}