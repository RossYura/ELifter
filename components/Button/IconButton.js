import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { TextIcon } from '..';
import { Colors } from '../../constants';

export class IconButton extends Component {
  onPress() {
    if (this.props.onPress) { this.props.onPress(); }
  }

  render() {
    const propStyles = {};
    if (this.props.width) {
      propStyles.width = this.props.width;
    }
    if (this.props.height) {
      propStyles.height = this.props.height;
    }
    if (this.props.padding) {
      propStyles.padding = this.props.padding;
    }
    return (
      <TouchableOpacity
        style={[styles.button, propStyles]}
        onPress={this.onPress.bind(this)}
      >
        <TextIcon icon={this.props.icon} color={Colors.buttonBackground} fontSize={this.props.iconFontSize} />
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    width: 20,
    height: 20,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
