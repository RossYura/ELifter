import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';

export class TextHeadline extends PureComponent {
  render() {
    const propStyles = {};
    if (this.props.color) {
      propStyles.color = this.props.color;
    }
    if (this.props.fontSize) {
      propStyles.fontSize = this.props.fontSize;
    }
    if (this.props.width) {
      propStyles.width = this.props.width;
    }
    if (this.props.isRegular) {
      propStyles.fontFamily = 'regular';
    }
    return (
      <Text style={[styles.headline, propStyles]}>{this.props.text}</Text>
    );
  }
}


const styles = StyleSheet.create({
  headline: {
    fontFamily: 'bold',
    fontSize: 20,
    marginBottom: 8,
  },
});
