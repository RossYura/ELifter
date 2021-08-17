import React from 'react';
import { NavigationActions } from 'react-navigation';
import { View, StyleSheet, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import strings from '../localization';
import { Screen, TextProperty, TextListHeader } from '../components';
import { Card } from '../components/Card/Card';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';


@inject('appStore') @observer
export class AllElevatorsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};

    props.appStore.setNavigation(props.navigation);
  }

  _keyExtractor(item, index) {
    return index.toString();
  }

  componentWillMount() {
    if (this.props.appStore.barcodeResult == false) {
      this.props.appStore.setElevtorSearch(null);
    }
  }


  showBarcodeScanner() {
    this.props.navigation.navigate('BarcodeScanner');
  }

  setSearch(value) {
    if (value != '') {
      this.props.appStore.setElevtorSearch(value);
    } else {
      this.props.appStore.setElevtorSearch(null);
    }
  }

  setSelectedElevator(item, subScreen) {
    this.props.appStore.setSelectedElevator(item.elev_id);
    // this.props.navigation.navigate('ElevatorIsDue');
    const navigateAction = NavigationActions.navigate(
      {
        routeName: 'ElevatorIsDue',
        params: {},
        action: NavigationActions.navigate(subScreen),
      },
    );
    this.props.navigation.dispatch(navigateAction);
  }

  setButtonText(item, status) {
    switch (status) {
      case 'in_progress':
        return strings.elevatorDueInspectionButton.inProgress.text;
      case 'done':
        return strings.elevatorDueInspectionButton.done.text;
      default:
        return strings.elevatorDueInspectionButton.default.text;
    }
  }

  setButtonIcon(status) {
    switch (status) {
      case 'in_progress':
        return strings.elevatorDueInspectionButton.inProgress.icon;
      case 'done':
        return strings.elevatorDueInspectionButton.done.icon;
      default:
        return strings.elevatorDueInspectionButton.default.icon;
    }
  }

  render() {
    return (
      <Screen>
        <View style={styles.searchBar}>
          <View style={styles.searchInput}>
            <Input returnKeyType="search" icon="loupe" placeholder={strings.inputPlaceholders.search} onSetValue={(value) => { this.setSearch(value); }} value={this.props.appStore.elevatorSearch} />
          </View>
          <Button onPress={() => { this.showBarcodeScanner(); }} icon="barcode" iconFontSize={20} />
        </View>
        <TextListHeader listType="all" listLength={this.props.appStore.allElevtors.length} isSearch={this.props.appStore.elevatorSearch} />
        <FlatList
          data={this.props.appStore.allElevtors}
          keyExtractor={this._keyExtractor}
          initialNumToRender={2}
          renderItem={({ item }) => (
            <Card>
              <View style={styles.buttonWrapper}>
              {item.data.map((elevator, index) => <TextProperty key={index} width="50%" propertyKey={elevator.propertyKey} propertyValue={elevator.propertyValue} />)}
              </View>
              <View style={styles.buttonWrapper}>
                <Button onPress={() => { this.setSelectedElevator(item, { routeName: 'Factsheet' }); }} width="49%" text={strings.screens.navigationTabs.elevator[0].label} />
                <Button onPress={() => { this.setSelectedElevator(item, { routeName: 'Reports' }); }} width="49%" text={strings.screens.navigationTabs.elevator[1].label} />
                <Button onPress={() => { this.setSelectedElevator(item, { routeName: 'Inspection' }); }} width="100%" text={this.setButtonText(item, item.status)} icon={this.setButtonIcon(item.status)} />
              </View>
            </Card>
          )}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: 'row',
  },
  searchInput: {
    width: '80%',
    paddingRight: 8,
  },
  buttonWrapper: {
    width: '100%',
    paddingTop: 8,
    paddingBottom: 8,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
