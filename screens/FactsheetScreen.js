import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import { Screen, TextHeadline, TextProperty } from '../components';
import { Card } from '../components/Card/Card';

@inject('appStore') @observer
export class FactsheetScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }


  _keyExtractor(item, index) {
    return index.toString();
  }

  render() {
    return (
      <Screen>
        <FlatList
          ref={(ref) => { this.list = ref; }}
          data={this.props.appStore.selectedElevatorFactsheet}
          keyExtractor={this._keyExtractor}
          initialNumToRender={2}
          renderItem={({ item }) => (
            <Card direction="column">
              <TextHeadline text={item.headline} />
              <View style={styles.properties}>
                {item.data.map((element, mapIndex) => <TextProperty width="50%" propertyKey={element.propertyKey} propertyValue={element.propertyValue} key={mapIndex} />)}
              </View>
            </Card>
          )}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  properties: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
