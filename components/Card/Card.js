import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../constants';

export class Card extends PureComponent {
  render() {
    return (
      <View
        style={[styles.card, this.props.direction == 'row' && styles.cardRow]}
      >
        {this.props.children}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    padding: 8,
    paddingBottom: 0,
    marginBottom: 8,
    shadowColor: Colors.black,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 3,
    flexDirection: 'column',
    // flexWrap: 'wrap',
  },
  cardRow: {
    flexDirection: 'row',
  },
});
