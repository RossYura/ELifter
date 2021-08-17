import React from 'react';
import { View, StyleSheet, Image, Alert } from 'react-native';
import { observer, inject } from 'mobx-react';
import strings from '../localization';
import { Screen } from '../components';
import { Button } from '../components/Button/Button';

@inject('appStore') @observer
export class ImageViewerScreen extends React.Component {
  constructor(props) {
    super(props);
  }

  deleteImageDialog(image) {
    Alert.alert(
      strings.alerts.imageViewer.deleteImage.title,
      strings.alerts.imageViewer.deleteImage.message,
      [
        { text: strings.alerts.imageViewer.deleteImage.cancle, onPress: () => {}, style: 'cancel' },
        { text: strings.alerts.imageViewer.deleteImage.ok, onPress: () => { this.deleteImage(image); } },
      ],
      { cancelable: true },
    );
  }

  deleteImage(image) {
    const checkpointImages = this.props.appStore.selectedElevator.newReport.repo_checkpoints[image.checkpointIndex].chpo_images.slice(0);
    const checkpointImageIndex = checkpointImages.findIndex((chpo_image) => chpo_image.id == image.id);
    checkpointImages.splice(checkpointImageIndex, 1);
    this.props.appStore.setCheckpointData(image.checkpointIndex, 'chpo_images', checkpointImages, false);
    this.props.appStore.setCheckpointsImageCounter();
    this.props.navigation.goBack();
  }

  render() {
    const image = this.props.appStore.selectedImage;
    return (
      <Screen>
        <View style={styles.image}>
          <Image style={{ flex: 1 }} resizeMode="contain" source={{ uri: image.base64 }} />
          <Button onPress={() => { this.deleteImageDialog(image); }} width="100%" icon="trash" text={strings.imageViewer.deleteButton} />
        </View>
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  image: {
    flex: 1,
  },
});
