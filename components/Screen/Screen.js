import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Colors } from '../../constants';

@inject('appStore') @observer
export class Screen extends Component {
  render() {
    const propStyles = {};
    if (this.props.backgroundColor) {
      propStyles.backgroundColor = this.props.backgroundColor;
    }
    if (this.props.appStore.isKeyboardAnimation) {
      propStyles.bottom = this.props.appStore.keyboardHeight;
    }
    return (
      <View style={[styles.screen, propStyles]}>
        {this.props.children}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 8,
    backgroundColor: Colors.screenBackground,
  },
});
