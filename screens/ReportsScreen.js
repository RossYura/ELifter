import React from 'react';
import { Text, StyleSheet, FlatList, Linking } from 'react-native';
import { observer, inject } from 'mobx-react';
import moment from 'moment';
import deLocale from 'moment/locale/de';
import strings from '../localization';
import { Screen } from '../components';
import { Button } from '../components/Button/Button';
import { Colors } from '../constants';

moment.updateLocale('de', deLocale);

@inject('appStore') @observer
export class ReportsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  _keyExtractor(item, index) {
    return index.toString();
  }

  openPDF(url) {
    Linking.openURL(url)
      .catch((err) => console.error('An error occurred', err));
  }

  getButtonLable(timestamp) {
    return `${moment(timestamp).format('DoMM.YY - H:mm:ss')}`;
  }

  render() {
    const headerText = (this.props.appStore.selectedElevator.elev_reports != null) ? `${strings.listHeader.reports}: ${this.props.appStore.selectedElevator.elev_reports.length} ${strings.listHeader.reportsDetails}` : strings.listHeader.reportsEmpty;
    return (
      <Screen>
        <Text style={styles.listHeader}>{headerText}</Text>
        <FlatList
          ref={(ref) => { this.list = ref; }}
          data={this.props.appStore.selectedElevator.elev_reports}
          keyExtractor={this._keyExtractor}
          initialNumToRender={3}
          renderItem={({ item, index }) => <Button width="100%" key={index} icon="pdf" text={this.getButtonLable(item.repo_creation)} onPress={() => { this.openPDF(`${item._links.self.pdf}`); }} />}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  listHeader: {
    fontFamily: 'regular',
    fontSize: 14,
    marginBottom: 8,
    color: Colors.grey,
  },
});
