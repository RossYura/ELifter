import React, { Component } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Colors } from '../../constants';

export class TextIcon extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  setIcon(iconName) {
    switch (iconName) {
      case 'logo':
        return 'l';
      case 'barcode':
        return '0';
      case 'check':
        return '1';
      case 'save':
        return '2';
      case 'more':
        return '3';
      case 'problem':
        return '4';
      case 'comment':
        return '5';
      case 'camera':
        return '6';
      case 'photo':
        return '7';
      case 'sync':
        return '8';
      case 'loupe':
        return '9';
      case 'remove':
        return 'q';
      case 'close':
        return 'w';
      case 'logout':
        return 'e';
      case 'back':
        return 'r';
      case 'clipboard_check':
        return 't';
      case 'clipboard_upload':
        return 'z';
      case 'clipboard_text':
        return 'u';
      case 'clipboard_error':
        return 'i';
      case 'clipboard_empty':
        return 'o';
      case 'pdf':
        return 'p';
      case 'new':
        return 'a';
      case 'sort':
        return 's';
      case 'select_all':
        return 'd';
      case 'selected':
        return 'f';
      case 'empty_select':
        return 'y';
      case 'trash':
        return 'x';
      case 'edit':
        return 'c';
      case 'preview':
        return 'v';
      case 'add_list':
        return 'b';
      case 'add':
        return 'n';
      default:
        return '';
    }
  }

  render() {
    const propStyles = {};
    if (this.props.color) {
      propStyles.color = this.props.color;
    }
    if (this.props.fontSize) {
      propStyles.fontSize = this.props.fontSize;
    }
    return (
      <Text style={[styles.icon, this.props.icon === 'save' && styles.iconSave, propStyles]}>
        {this.setIcon(this.props.icon)}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    color: Colors.white,
    fontFamily: 'icons',
    fontSize: 16,
  },
  iconSave: {
    paddingLeft: 4,
  },
});
