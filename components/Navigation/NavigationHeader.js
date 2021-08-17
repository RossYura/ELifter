import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import { NavigationActions, StackActions } from 'react-navigation';
import strings from '../../localization';
import { TextHeadline, TextDescription } from '..';
import { NavigationButton } from './NavigationButton';
import { Colors } from '../../constants';

@inject('appStore') @observer
export class NavigationHeader extends Component {
  navigateHome() {
    this.props.navigation.navigation.navigate('TodaysElevators');
  }

  navigateBack() {
    this.props.navigation.navigation.goBack(null);
  }

  closeApp() {
    Alert.alert(strings.alerts.login.logoutWarning.title, strings.alerts.login.logoutWarning.message, [
      {
        text: 'Abbrechen',
        onPress: () => {

        },
      },
      {
        text: 'Logout',
        onPress: async () => {
          try {
            await this.props.appStore.setJWT(null);
            // const resetAction = NavigationActions.reset({
            //   index: 0,
            //   actions: [
            //     NavigationActions.navigate({ routeName: 'Login' }),
            //   ],
            // });
            const resetAction = StackActions.reset({
              index: 0,
              actions: [
                NavigationActions.navigate({ routeName: 'Login' }),
              ],
            });
            this.props.navigation.navigation.dispatch(resetAction);
            // BackHandler.exitApp();
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);
  }

  render() {
    switch (this.props.screenName) {
      case 'login':
        return (
          <View style={[styles.header, styles.headerHome]}>
            <NavigationButton icon="logo" fontSize={20} />
            <View style={styles.headerHomeHeadline}>
              <TextDescription color={Colors.white} text="DIE AUFZUGWÄRTER" />
            </View>
            <View style={{ flex: 1 }} />
          </View>
        );
      case 'home':
        return (
          <View style={[styles.header, styles.headerHome]}>
            <NavigationButton onPress={() => { this.navigateHome(); }} icon="logo" fontSize={20} isSelected />
            <View style={{ flex: 5 }} />
            <NavigationButton onPress={() => { this.props.appStore.synchronizeApp(); }} icon="sync" />
            <View style={styles.headerSyncTimeWrapper}>
              <Text style={styles.headerSyncTimeText}>{this.props.appStore.getLastSynchronisation}</Text>
            </View>
            <NavigationButton onPress={() => { this.closeApp(); }} icon="logout" />
          </View>
        );
      case 'barcode':
        return (
          <View style={[styles.header, styles.headerHome]}>
            <NavigationButton onPress={() => { this.navigateBack(); }} icon="back" />
            <View style={styles.headerHeadline}>
              <TextHeadline isRegular text="Barcode scannen" fontSize={18} color={Colors.white} />
            </View>
            <View style={{ flex: 1 }} />
          </View>
        );
      case 'elevator':
        return (
          <View style={[styles.header, styles.headerElevator]}>
            <NavigationButton onPress={() => { this.navigateBack(); }} icon="back" />
            <View style={styles.headerHeadline}>
              <TextHeadline isRegular text={`Seriennr.: ${this.props.appStore.selectedElevator.elev_serial_number}`} fontSize={18} color={Colors.white} />
            </View>
            <View style={{ flex: 1 }} />
          </View>
        );
      case 'elevatorIsDue':
        return (
          <View style={[styles.header, styles.headerElevator]}>
            <NavigationButton onPress={() => { this.navigateBack(); }} icon="back" />
            <View style={styles.headerHeadline}>
              <TextHeadline isRegular text={`Seriennr.: ${this.props.appStore.selectedElevator.elev_serial_number}`} fontSize={18} color={Colors.white} />
            </View>
            <NavigationButton backgroundColor={Colors.green} onPress={() => { this.props.appStore.showUploadAlert(); }} onPressDisabledFunc={() => { this.props.appStore.showUploadDisabledAlert(); }} icon="clipboard_upload" isDisabled={!this.props.appStore.isAllCheckpointsSubmitted} />
          </View>
        );
      case 'imageViewer':
        return (
          <View style={[styles.header, styles.headerElevator]}>
            <NavigationButton onPress={() => { this.navigateBack(); }} icon="back" />
            <View style={styles.headerHeadline}>
              <TextHeadline isRegular text={`Prüfpkt.: ${this.props.appStore.selectedImage.label.substring(0, 10)}...`} fontSize={18} color={Colors.white} />
            </View>
            <View style={{ flex: 1 }} />
          </View>
        );
      default:
        return (
          <View style={[styles.header, styles.headerHome]}>
            <NavigationButton onPress={() => { this.navigateBack(); }} icon="logo" fontSize={20} isSelected />
            <View style={{ flex: 7 }} />
            <NavigationButton icon="sync" />
            <NavigationButton icon="logout" />
          </View>
        );
    }
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 40,
  },
  headerHome: {
    backgroundColor: Colors.buttonBackground,
  },
  headerHomeHeadline: {
    flex: 8,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerElevator: {
    backgroundColor: Colors.buttonSelected,
    justifyContent: 'center',
  },
  headerHeadline: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 8,
    paddingTop: 8,
  },
  headerSyncTimeWrapper: {
    paddingRight: 8,
    justifyContent: 'center',
  },
  headerSyncTimeText: {
    fontSize: 10,
    fontFamily: 'regular',
    color: Colors.white,
  },
});
