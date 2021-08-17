import React, { PureComponent } from 'react';
import { StyleSheet, Text } from 'react-native';
import strings from '../../localization';
import { Colors } from '../../constants';

export class TextListHeader extends PureComponent {
  render() {
    let text = '';

    if (this.props.listLength > 0) {
      if (this.props.isSearch) {
        text = `${strings.listHeader.searchResult} (${this.props.listLength}):`;
      } else if (this.props.listType == 'due') {
        text = `${strings.listHeader.dueElevators} (${this.props.listLength}):`;
      } else {
        text = `${strings.listHeader.allElevators} (${this.props.listLength}):`;
      }
    } else if (this.props.isSearch) {
      text = strings.listHeader.searchRestulEmpty;
    } else if (this.props.listType == 'due') {
      text = strings.listHeader.dueElevatorsEmpty;
    } else {
      text = strings.listHeader.allElevatorsEmpty;
    }


    return (
      <Text style={[styles.listHeader]}>{text}</Text>
    );
  }
}


const styles = StyleSheet.create({
  listHeader: {
    fontFamily: 'regular',
    fontSize: 14,
    marginBottom: 8,
    color: Colors.grey,
  },
});
