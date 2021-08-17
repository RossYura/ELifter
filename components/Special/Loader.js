import React, { Component } from 'react';
import { StyleSheet, View, Text, Image } from 'react-native';
import { Colors } from '../../constants';

export class Loader extends Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <View
        style={[styles.loaderWrapper]}
      >
        <Image style={{ width: 150, height: 150 }} source={require('../../assets/icons/loading.gif')} />
        <Text style={styles.loaderText}>{this.props.text.toUpperCase()}</Text>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  loaderWrapper: {
    backgroundColor: Colors.transparent,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  loaderText: {
    fontFamily: 'regular',
    fontSize: 16,
    color: Colors.white,
  },
});
