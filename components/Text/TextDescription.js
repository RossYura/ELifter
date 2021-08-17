import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants';

export class TextDescription extends PureComponent {
  render() {
    const propStyles = {};
    if (this.props.color) {
      propStyles.color = this.props.color;
    }
    if (this.props.fontFamily) {
      propStyles.fontFamily = this.props.fontFamily;
    }
    return (
      <Text style={[styles.description, propStyles]}>{this.props.text}</Text>
    );
  }
}


const styles = StyleSheet.create({
  description: {
    fontFamily: 'regular',
    fontSize: 16,
    color: Colors.black,
    marginBottom: 8,
    textAlign: 'justify'
  },
});
