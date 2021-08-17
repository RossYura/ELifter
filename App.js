import React from 'react';
import { Platform, StatusBar, StyleSheet, View, BackHandler, Keyboard, YellowBox } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import KeepAwake from 'expo-keep-awake';
import { Provider, observer } from 'mobx-react/native';

import AppStore from './stores/AppStore';


// import {ScreenNavigation} from './navigation';
import { StandardContainer, SignedInContainer } from './navigation/AppNavigation';
// import { AppContainer } from './navigation';

import { Colors } from './constants';

YellowBox.ignoreWarnings([
  'Header.HEIGHT is deprecated',
  'Require cycle:',
]);

@observer
export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      fontLoaded: false,
      isCheckingJWT: true,
      initialRouteName: 'Login',
    };


    // NetInfo.isConnected.addEventListener(
    //   'connectionChange',
    //   AppStore.setIsConnected,
    // );
    NetInfo.addEventListener(state => {
      AppStore.setIsConnected(state.isConnected);
    })

    BackHandler.addEventListener('hardwareBackPress', () => true);

    if (Platform.OS === 'ios') {
      Keyboard.addListener('keyboardDidShow', (event) => {
        AppStore.moveScreenUp(event);
      });
      Keyboard.addListener('keyboardWillHide', (event) => {
        AppStore.moveScreenDown(event);
      });
    } else {
      Keyboard.addListener('keyboardDidShow', (event) => {
        AppStore.moveScreenUp(event);
      });
      Keyboard.addListener('keyboardDidHide', (event) => {
        AppStore.moveScreenDown(event);
      });
    }
  }

  cacheImages(images) {
    return images.map((image) => {
      if (typeof image === 'string') {
        // from web
        return Image.prefetch(image);
      } else {
        // locally
        return Expo.Asset.fromModule(image).downloadAsync();
      }
    });
  }

  async componentDidMount() {
    await this.cacheImages([
      require('./assets/icons/loading.gif'),
    ]);
    await Font.loadAsync({
      regular: require('./assets/fonts/SourceSansPro-Regular.ttf'),
      bold: require('./assets/fonts/SourceSansPro-Semibold.ttf'),
      icons: require('./assets/fonts/icons.ttf'),
    });
    this.setState({ fontLoaded: true });

    const isExpired = await AppStore.checkIfASJWTIsExpired();
    if (isExpired === false) {
      const username = await AppStore.getUsernameFromASJWT();
      const appUser = await AppStore.getASAppUser();
      AppStore.setLastUsername(username);
      AppStore.setAppUser(appUser);
      const isUserLoggedIn = await AppStore.synchronizeApp(username);
      if (isUserLoggedIn) {
        this.setState({
          initialRouteName: 'Home',
          isCheckingJWT: false,
        });
      } else {
        this.setState({
          initialRouteName: 'Login',
          isCheckingJWT: false,
        });
      }
    } else {
      this.setState({
        initialRouteName: 'Login',
        isCheckingJWT: false,
      });
    }
  }

  render() {
    if (this.state.fontLoaded === false || this.state.isCheckingJWT === true) {
      return <AppLoading />;
    }
    return (
      <Provider appStore={AppStore}>
        <View style={{ flex: 1, overflow: 'visible' }}>
          {/* <KeepAwake /> */}
          <View style={styles.content}>
            {
              this.state.initialRouteName == 'Login' ?
              <StandardContainer />
              :
              <SignedInContainer />
            }
          </View>
          <View style={styles.statusBar}>
            <StatusBar barStyle="light-content" />
          </View>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: Platform.OS == 'ios' ? Expo.Constants.statusBarHeight : 0,
    width: '100%',
    backgroundColor: Colors.buttonBackground,
    position: 'absolute',
  },
  content: {
    marginTop: Platform.OS == 'ios' ? Expo.Constants.statusBarHeight : 0,
    flex: 1,
  },
});
