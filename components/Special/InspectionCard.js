import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { observer, inject } from 'mobx-react';
import { TextHeadline, TextDescription, AnnotationInput } from '..';
import { IconButton } from '../Button/IconButton';
import { Card } from '../Card/Card';
import { Button } from '../Button/Button';
import { Colors } from '../../constants';
import { InspectionCardPictures } from './InspectionCardPictures';

@inject('appStore') @observer
export class InspectionCard extends Component {
  constructor() {
    super();

    this.state = {
      LongDescription: null,
      problemBackgroundColor: null,
      checkBackgroundColor: null,
      isCheckButtonVisible: true,
      isProblemButtonVisible: true,
      isInputButtonVisible: false,
      isTextInputSelected: true,
      isImageInputSelected: false,
      seperatorWidth: '60%',
    };
  }

  toggleLongDescriptionShowing() {
    if (this.state.LongDescription) {
      this.setState({
        LongDescription: null,
      });
    } else if (this.props.data.chpo_emergency_description == '') {
      this.setState({
        LongDescription: <TextDescription text={this.props.appStore.parseHTML(this.props.data.chpo_long_description)} />,
      });
    } else {
      this.setState({
        LongDescription:
(<View>
  <TextDescription color={Colors.red} fontFamily="bold" text={this.props.appStore.parseHTML(this.props.data.chpo_emergency_description)} />
  <TextDescription text={this.props.appStore.parseHTML(this.props.data.chpo_long_description)} />
</View>),
      });
    }
  }

  setCheckpointStatus(isOK) {
    const checkpoint = this.props.data;

    if (checkpoint.chpo_is_ok === true && isOK === true || checkpoint.chpo_is_ok === false && isOK === false) {
      // reset
      this.props.appStore.setCheckpointData(this.props.index, 'chpo_is_ok', null, false);
      this.resetCheckpointIsOK();
      return;
    }

    if (isOK) {
      // check
      this.props.appStore.setCheckpointData(this.props.index, 'chpo_is_ok', true, false);
      this.setCheckpointIsOK();
    } else {
      // problem
      this.props.appStore.setCheckpointData(this.props.index, 'chpo_is_ok', false, false);
      this.setCheckpointIsNotOK();
    }
  }

  setCheckpointAnnotation(value) {
    this.props.appStore.setCheckpointData(this.props.index, 'chpo_annotation', value, false);
  }

  setCheckpointImages(value) {
    this.props.appStore.setCheckpointsImageCounter('add');
    this.props.appStore.setCheckpointData(this.props.index, 'chpo_images', value, false);
  }

  setCheckpointIsOK() {
    this.setState({
      isCheckButtonVisible: true,
      isProblemButtonVisible: false,
      checkBackgroundColor: Colors.green,
      problemBackgroundColor: null,
      isInputButtonVisible: false,
      seperatorWidth: '80%',
    });
  }

  setCheckpointIsNotOK() {
    this.setState({
      isCheckButtonVisible: false,
      isProblemButtonVisible: true,
      checkBackgroundColor: null,
      problemBackgroundColor: Colors.red,
      isInputButtonVisible: true,
      seperatorWidth: '40%',
    });
  }

  resetCheckpointIsOK() {
    this.setState({
      isCheckButtonVisible: true,
      isProblemButtonVisible: true,
      checkBackgroundColor: null,
      problemBackgroundColor: null,
      isInputButtonVisible: false,
      seperatorWidth: '60%',
    });
  }

  selectInput(input) {
    if (input == 'text') {
      this.setState({
        isTextInputSelected: true,
        isImageInputSelected: false,
      });
    } else {
      this.setState({
        isTextInputSelected: false,
        isImageInputSelected: true,
      });
    }
  }

  avoidKeyboard() {
    const { index } = this.props;
    this.props.appStore.setCurrentFlatlistItemIndex(index);
    this.card.measure((fx, fy, width, height, px, py) => {
      // if(index == 0 && this.state.LongDescription == null){
      // this.props.appStore.setCurrentFlatlistItemIndex(null);
      // this.props.scrollToOffset(py);
      // return;
      // }
      if (index == this.props.lastIndex) {
        this.props.appStore.setCurrentFlatlistItemIndex(null);
        this.props.appStore.setIsKeyboardAnimation(true);
      }
    });
  }

  componentWillMount() {
    const checkpointIsOK = this.props.data.chpo_is_ok;
    if (checkpointIsOK) {
      this.setCheckpointIsOK();
    } else if (checkpointIsOK === false) {
      this.setCheckpointIsNotOK();
    } else {
      this.resetCheckpointIsOK();
    }
  }

  render() {
    const checkpoint = this.props.data;
    console.log("checkpoint ==== ", checkpoint);
    return (
      <View ref={(ref) => { this.card = ref; }} collapsable={false}>
        <Card>
          <View style={styles.row}>
            <View style={styles.cardHeadline}>
              <TextHeadline text={checkpoint.chpo_headline.toUpperCase()} />
            </View>
            <View style={styles.infoButton}>
              <IconButton padding={8} width={50} height={30} icon="more" onPress={() => { this.toggleLongDescriptionShowing(); }} />
            </View>
          </View>
          <TextDescription text={checkpoint.chpo_description} />
          {/* <Text>{checkpoint.chpo_description}</Text> */}
          {this.state.LongDescription}
          <View style={[styles.rowButtons]}>
            <Button icon="problem" isVisible={this.state.isProblemButtonVisible} backgroundColor={this.state.problemBackgroundColor} onPress={() => { this.setCheckpointStatus(false); }} />
            <Button icon="comment" isVisible={this.state.isInputButtonVisible} isSelected={this.state.isTextInputSelected} onPress={() => { this.selectInput('text'); }} />
            <Button icon="camera" isVisible={this.state.isInputButtonVisible} isSelected={this.state.isImageInputSelected} onPress={() => { this.selectInput('image'); }} />
            <View style={{ width: this.state.seperatorWidth }} />
            <Button icon="check" isVisible={this.state.isCheckButtonVisible} backgroundColor={this.state.checkBackgroundColor} onPress={() => { this.setCheckpointStatus(true); }} />
          </View>
          <AnnotationInput value={checkpoint.chpo_annotation} onSetValue={(value) => { this.setCheckpointAnnotation(value); }} label={checkpoint.chpo_headline} avoidKeyboard={() => { this.avoidKeyboard(); }} isVisible={this.state.isInputButtonVisible && this.state.isTextInputSelected} index={this.props.index} />
          <InspectionCardPictures name={checkpoint.chpo_headline} checkpointIndex={this.props.index} value={checkpoint.chpo_images} onSetValue={(value) => { this.setCheckpointImages(value); }} isVisible={this.state.isInputButtonVisible && this.state.isImageInputSelected} />
        </Card>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
  },
  rowButtons: {
    flexDirection: 'row',
    width: '100%',
    marginTop: 8,
  },
  cardHeadline: {
    width: '90%',
  },
  infoButton: {
    position: 'absolute',
    right: -8,
    top: -8,
  },
});
