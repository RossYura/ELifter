import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { observer, inject } from 'mobx-react';
import { Screen } from '../components';
import { Colors } from '../constants';

@inject('appStore') @observer
export class BarcodeScannerScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasCameraPermission: false,
    };
    this.props.appStore.setBarcodeResult(false);
  }

  _keyExtractor(item, index) {
    return index.toString();
  }

  async componentWillMount() {
    this.props.appStore.setElevtorSearch(null);
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === 'granted' });
  }

  handleBarCodeRead(scan) {
    // if(scan != null && scan.data != '' && (scan.type == 'CODE_128' || scan.type == 'org.iso.Code128')){
      console.log("!@#!@#!@#");
    if (scan != null && scan.data != '') {
      this.props.appStore.setBarcodeResult(true);
      this.props.appStore.setElevtorSearch(scan.data);
      // this.props.navigation.navigate('TodaysElevators');
      this.props.navigation.goBack();
    }
  }

  handleBarcodeScanned = ({type, data}) => {
    console.log("Scanned!!!", type, data);
    if (data != null && data != '') {
      this.props.appStore.setBarcodeResult(true);
      this.props.appStore.setElevtorSearch(data);
      // this.props.navigation.navigate('TodaysElevators');
      this.props.navigation.goBack();
    }
  }

  render() {
    const { hasCameraPermission } = this.state;
    if (hasCameraPermission) {
      return (
        <Screen>
          <View style={{ flex: 1 }}>
            <BarCodeScanner
              onBarCodeScanned={this.handleBarcodeScanned}
              onBarCodeRead={(scan) => { this.handleBarCodeRead(scan); }}
              style={StyleSheet.absoluteFill}
            />
            <View style={[styles.barcodeLineWrapper, StyleSheet.absoluteFill]}>
              <View style={styles.barcodeSpacer} />
              <View style={styles.barcodeCenter}>
                <View style={styles.barcodeLine} />
              </View>
              <View style={styles.barcodeSpacer} />
            </View>
          </View>
        </Screen>
      );
    } else {
      return (
        <Screen>
          <Text>BarCode Scanner konnte nicht geladen werden</Text>
        </Screen>
      );
    }
  }
}

const styles = StyleSheet.create({
  barcodeLineWrapper: {
    justifyContent: 'center',
    alignContent: 'center',
  },
  barcodeSpacer: {
    width: '100%',
    height: '25%',
    backgroundColor: Colors.transparentGrey,
  },
  barcodeCenter: {
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  barcodeLine: {
    width: '100%',
    height: 5,
    backgroundColor: Colors.red,
  },
});
