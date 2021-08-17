import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { observer, inject } from 'mobx-react';
import strings from '../localization';
import { Screen, Loader } from '../components';
import { Colors } from '../constants';
import { InspectionCard } from '../components/Special/InspectionCard';

@inject('appStore') @observer
export class InspectionScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
    };

    this.scrollPositon = 0;
  }

  _keyExtractor(item, index) {
    return index.toString();
  }

  scrollToOffset(offset) {
    this.list.scrollToOffset({
      offset,
    });
  }

  componentDidMount() {
    this.props.appStore.setCurrentFlatlist(this.list);
    this.props.appStore.checkIfAllCheckpointsAreSet();
  }

  componentWillUnmount() {
    this.props.appStore.setCurrentFlatlist(null);
  }

  render() {
    const lastIndex = this.props.appStore.selectedElevator.newReport.repo_checkpoints.length - 1;

    if (this.props.appStore.isUploadingReport === true) {
      return (
        <Screen backgroundColor={Colors.appBackground}>
          <Loader text={strings.loader.reportUpload} />
        </Screen>
      );
    }
    return (
      <Screen>
        <View style={styles.inspectionStatus}>
          <Text style={styles.inspectionStatusText}>{`${strings.listHeader.completedCheckpoints}: ${this.props.appStore.selectedElevator.checkpointsCompleted}/${this.props.appStore.selectedElevator.checkpointsTotal}`}</Text>
          <Text style={styles.inspectionStatusText}>{`${strings.listHeader.photoCount}: ${this.props.appStore.selectedElevator.picturesTaken}/${this.props.appStore.selectedElevator.picturesLimit}`}</Text>
        </View>
        <FlatList
          ref={(ref) => { this.list = ref; }}
          data={this.props.appStore.selectedElevator.newReport.repo_checkpoints}
          keyExtractor={this._keyExtractor}
          initialNumToRender={3}
          renderItem={({ item, index }) => <InspectionCard data={item} index={index} lastIndex={lastIndex} scrollToOffset={(offset) => { this.scrollToOffset(offset); }} />}
        />
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  inspectionStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  inspectionStatusText: {
    fontFamily: 'regular',
    fontSize: 14,
    marginBottom: 8,
    color: Colors.grey,
  },
});
