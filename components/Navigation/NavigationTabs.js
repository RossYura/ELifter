import React, { Component } from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Colors } from '../../constants';

export class NavigationTabs extends Component {
  onPress(routeName) {
    this.props.navigation.navigate(routeName);
  }

  render() {
    const navigation = this.props.navigation.state;
    const tabs = this.props.tabs.map((tab, index) => {
      const { label, routeName } = tab;
      const routeIndex = navigation.routes.findIndex((route) => route.routeName === routeName);
      return (
        <TouchableOpacity
          key={index}
          style={[styles.tabButton, (routeIndex === navigation.index) && styles.tabButtonIsSelected]}
          onPress={() => { this.onPress(routeName); }}
        >
          <Text style={styles.tabButtonText}>{label.toUpperCase()}</Text>
        </TouchableOpacity>
      );
    });
    return (
      <View style={styles.tabBar}>
        {tabs}
      </View>
    );
  }
}


const styles = StyleSheet.create({
  tabBar: {
    padding: 8,
    // marginBottom: 16,
    height: 56,
    flexDirection: 'row',
    backgroundColor: Colors.screenBackground,
  },
  tabButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.buttonBackground,
    shadowColor: Colors.black,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
    elevation: 5,
  },
  tabButtonIsSelected: {
    backgroundColor: Colors.buttonSelected,
    shadowOpacity: 0,
    shadowRadius: 0,
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 0,
  },
  tabButtonText: {
    color: Colors.white,
    fontFamily: 'regular',
    fontSize: 16,
  },
});
