import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { TextIcon } from '..';
import { Colors } from '../../constants';

export class NavigationButton extends Component {
  onPress() {
    if (this.props.isDisabled) {
      if (this.props.onPressDisabledFunc) { this.props.onPressDisabledFunc(); }
    } else if (this.props.onPress) { this.props.onPress(); }
  }

  render() {
    const iconColor = (this.props.isDisabled) ? Colors.buttonInactive : null;

    const propStyles = {};
    if (this.props.backgroundColor) {
      propStyles.backgroundColor = (this.props.isDisabled) ? null : this.props.backgroundColor;
    }
    return (
      <TouchableOpacity
        style={[styles.button, this.props.isSelected && styles.buttonIsSelected, propStyles]}
        onPress={() => { this.onPress(); }}
      >
        <TextIcon icon={this.props.icon} fontSize={this.props.fontSize} color={iconColor} />
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: Colors.buttonBackground,
    paddingLeft: 8,
    paddingRight: 8,
  },
  buttonIsSelected: {
    backgroundColor: Colors.buttonSelected,
  },
});
