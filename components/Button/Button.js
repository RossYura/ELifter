import React, { Component } from 'react';
import { TouchableOpacity, StyleSheet, Text, View } from 'react-native';
import { TextIcon } from '..';
import { Colors } from '../../constants';

export class Button extends Component {
  constructor(props) {
    super(props);
    this.state = {
      iconColor: Colors.white,
    };
  }

  componentWillMount() {
    if (this.props.isInactive) {
      this.setState({
        iconColor: Colors.buttonInactive,
      });
    }
  }

  onPress() {
    if (this.props.onPress) { this.props.onPress(); }
  }

  render() {
    const propStyles = {};
    if (this.props.backgroundColor) {
      propStyles.backgroundColor = this.props.backgroundColor;
    }
    if (this.props.width) {
      propStyles.width = this.props.width;
    }
    if (this.props.height) {
      propStyles.height = this.props.height;
    }
    if (this.props.padding) {
      propStyles.paddingLeft = this.props.padding;
      propStyles.paddingRight = this.props.padding;
    }
    let ButtonText = <TextIcon icon={this.props.icon} color={this.state.iconColor} fontSize={this.props.iconFontSize} />;
    if (this.props.text) {
      ButtonText = (
        <View style={styles.buttonTextWrapper}>
          <View style={styles.buttonTextWrapper}>
            <TextIcon icon={this.props.icon} color={this.state.iconColor} fontSize={this.props.iconFontSize} />
          </View>
          <Text style={[styles.buttonText, this.props.icon && styles.buttonTextPadding]}>{this.props.text.toUpperCase()}</Text>
        </View>
      );
    }
    return (
      <TouchableOpacity
        style={[styles.button, this.props.isSelected && styles.buttonSelected, this.props.isVisible === false && styles.buttonInvisible, propStyles]}
        onPress={this.onPress.bind(this)}
      >
        {ButtonText}
      </TouchableOpacity>
    );
  }
}


const styles = StyleSheet.create({
  button: {
    width: '20%',
    height: 40,
    backgroundColor: Colors.buttonBackground,
    marginBottom: 8,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: Colors.black,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  buttonSelected: {
    backgroundColor: Colors.buttonSelected,
  },
  buttonInvisible: {
    display: 'none',
    shadowColor: Colors.transparent,
    elevation: 0,
  },
  buttonTextWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    // alignItems: 'center',
  },
  buttonText: {
    color: Colors.white,
  },
  buttonTextPadding: {
    paddingLeft: 8,
  },
});
