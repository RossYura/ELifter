import React from 'react';
import { Keyboard } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { observer, inject } from 'mobx-react';

import { LoginScreen, TodaysElevatorsScreen, AllElevatorsScreen, InspectionScreen, FactsheetScreen, ReportsScreen, BarcodeScannerScreen, ImageViewerScreen } from '../screens';
import strings from '../localization';
import { NavigationTabs } from '../components';
import { NavigationHeader } from '../components/Navigation/NavigationHeader';

const HomeTabNavigation = createMaterialTopTabNavigator(
  {
    TodaysElevators: {
      screen: TodaysElevatorsScreen,
      path: 'todayselevators',
      navigationOptions: {
        tabBarLabel: strings.screens.navigationTabs.home[0].label,
      },
    },
    AllElevators: {
      screen: AllElevatorsScreen,
      path: 'allelevators',
      navigationOptions: {
        tabBarLabel: strings.screens.navigationTabs.home[1].label,
      },
    },
  },
  {
    initialRouteName: 'TodaysElevators',
    backBehavior: 'none',
    tabBarPosition: 'top',
    tabBarComponent: (navigation) => <NavigationTabs navigation={navigation.navigation} tabs={strings.screens.navigationTabs.home} />,

  }
);


const ElevatorTabNavigation = createMaterialTopTabNavigator(
  {
    Factsheet: {
      screen: FactsheetScreen,
      path: 'factsheet',
      navigationOptions: {
        tabBarLabel: strings.screens.navigationTabs.elevator[0].label,
      },
    },
    Reports: {
      screen: ReportsScreen,
      path: 'reports',
      navigationOptions: {
        tabBarLabel: strings.screens.navigationTabs.elevator[1].label,
      },
    },
  },
  {
    initialRouteName: 'Factsheet',
    backBehavior: 'none',
    tabBarPosition: 'top',
    tabBarComponent: (navigation) => <NavigationTabs navigation={navigation.navigation} tabs={strings.screens.navigationTabs.elevator} />,

  },
);

const ElevatorIsDueTabNavigation = createMaterialTopTabNavigator(
  {
    Inspection: {
      screen: InspectionScreen,
      path: 'inspection',
      navigationOptions: {
        tabBarLabel: strings.screens.navigationTabs.elevatorIsDue[0].label,
      },
    },
    Factsheet: {
      screen: FactsheetScreen,
      path: 'factsheet',
      navigationOptions: {
        tabBarLabel: strings.screens.navigationTabs.elevatorIsDue[1].label,
      },
    },
    Reports: {
      screen: ReportsScreen,
      path: 'reports',
      navigationOptions: {
        tabBarLabel: strings.screens.navigationTabs.elevatorIsDue[2].label,
      },
    },
  },
  {
    initialRouteName: 'Inspection',
    backBehavior: 'none',
    tabBarPosition: 'top',
    tabBarComponent: (navigation) => <NavigationTabs navigation={navigation.navigation} tabs={strings.screens.navigationTabs.elevatorIsDue} />,

  },
);

const AppNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      path: 'login',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="login" />,
      },
    },
    Home: {
      screen: HomeTabNavigation,
      path: 'home',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="home" />,
      },
    },
    BarcodeScanner: {
      screen: BarcodeScannerScreen,
      path: 'barcodescanner',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="barcode" />,
      },
    },
    Elevator: {
      screen: ElevatorIsDueTabNavigation,
      path: 'elevator',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="elevatorIsDue" />,
      },
    },
    ElevatorIsDue: {
      screen: ElevatorIsDueTabNavigation,
      path: 'elevatorisdue',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="elevatorIsDue" />,
      },
    },
    ImageViewer: {
      screen: ImageViewerScreen,
      path: 'imageviewer',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="imageViewer" />,
      },
    },
  },
  {
    initialRouteName: 'Login',
    gesturesEnabled: false,
  }
);

const SignedInNavigator = createStackNavigator(
  {
    Login: {
      screen: LoginScreen,
      path: 'login',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="login" />,
      },
    },
    Home: {
      screen: HomeTabNavigation,
      path: 'home',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="home" />,
      },
    },
    BarcodeScanner: {
      screen: BarcodeScannerScreen,
      path: 'barcodescanner',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="barcode" />,
      },
    },
    Elevator: {
      screen: ElevatorIsDueTabNavigation,
      path: 'elevator',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="elevatorIsDue" />,
      },
    },
    ElevatorIsDue: {
      screen: ElevatorIsDueTabNavigation,
      path: 'elevatorisdue',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="elevatorIsDue" />,
      },
    },
    ImageViewer: {
      screen: ImageViewerScreen,
      path: 'imageviewer',
      navigationOptions: {
        header: (navigation) => <NavigationHeader navigation={navigation} screenName="imageViewer" />,
      },
    },
  },
  {
    initialRouteName: 'Home',
    gesturesEnabled: false,
  }
);

export const StandardContainer = createAppContainer(AppNavigator);
export const SignedInContainer = createAppContainer(SignedInNavigator);


