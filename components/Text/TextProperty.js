import React, { PureComponent } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors } from '../../constants';

export class TextProperty extends PureComponent {
  render() {
    return (
      <View
        style={[styles.property, this.props.width && { width: this.props.width }]}
      >
        <Text style={styles.propertyKey}>{this.props.propertyKey}</Text>
        <Text style={styles.propertyValue}>{this.props.propertyValue}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  property: {
    paddingBottom: 8,
    paddingRight: 8,
  },
  propertyKey: {
    fontFamily: 'regular',
    fontSize: 12,
    color: Colors.grey,
  },
  propertyValue: {
    fontFamily: 'regular',
    fontSize: 16,
    color: Colors.black,
  },
});
