import React, { Component } from 'react';
import { Image, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { observer, inject } from 'mobx-react';
import { NavigationActions } from 'react-navigation';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from 'expo-image-manipulator';
import strings from '../../localization';
import { Button } from '../Button/Button';
import { Colors } from '../../constants';

@inject('appStore') @observer
export class InspectionCardPictures extends Component {
  constructor(props) {
    super();
    this.maxWidth = 1000;
    this.quality = 0.6;
    this.ratio = [1, 1];
    this.state = {
      images: (props.value && Array.isArray(props.value)) ? props.value : [],
    };
  }

takeImage = async () => {
  if (this.props.appStore.selectedElevator.picturesTaken == this.props.appStore.selectedElevator.picturesLimit) {
    Alert.alert(
      strings.alerts.inspectionCardPictures.title,
      strings.alerts.inspectionCardPictures.message,
    );
    return;
  }

  let cameraStatus = await Permissions.getAsync(Permissions.CAMERA);
  let cameraRollStatus = await Permissions.getAsync(Permissions.CAMERA_ROLL);
  if (!cameraStatus || cameraStatus.status !== 'granted') {
    cameraStatus = await Permissions.askAsync(Permissions.CAMERA);
  }
  if (!cameraRollStatus || cameraStatus.cameraRollStatus !== 'granted') {
    cameraRollStatus = await Permissions.askAsync(Permissions.CAMERA_ROLL);
  }
  if (cameraStatus.status === 'granted' && cameraRollStatus.status === 'granted') {
    try {
      const photo = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: this.quality,
        aspect: this.ratio,
        base64: true,
      });

      if (!photo.cancelled) {
        let resizedPhoto = null;
        try {
          if (photo.width > this.maxWidth) {
            resizedPhoto = await ImageManipulator.manipulateAsync(photo.uri, [{ resize: { width: this.maxWidth } }], { format: 'jpeg', compress: this.quality, base64: true });
          }

          const id = Date.now();
          const name = (this.props.name) ? `${this.props.name.toLowerCase().replace(/\s+/g, '_').replace(/ä/g, 'ae').replace(/ö/g, 'oe')
            .replace(/ü/g, 'ue')
            .replace(/ß/g, 'ss')}_${id}` : id;

          const image = {
            id,
            checkpointIndex: this.props.checkpointIndex,
            base64: `data:image/jpeg;base64,${(resizedPhoto === null) ? photo.base64 : resizedPhoto.base64}`,
            name,
            label: this.props.name,
          };
          this.state.images.push(image);
          if (this.props.onSetValue) {
            this.props.onSetValue(this.state.images);
          }
        } catch (e) {
          console.log(e);
        }
        try {
          await FileSystem.deleteAsync(photo.uri);
          if (resizedPhoto) {
            await FileSystem.deleteAsync(resizedPhoto.uri);
          }
        } catch (e) {
          // statements
          console.log(e);
        }
      }
    } catch (error) {
      console.log('ImagePickerError:', error);
      console.log(error);
    }
  }
};

_navigateToImageViewer() {
  const navigateAction = NavigationActions.navigate(
    {
      routeName: 'ImageViewer',
      params: {},
      action: NavigationActions.navigate({ routeName: 'ImageViewer' }),
    },
  );
  this.props.appStore.navigation.dispatch(navigateAction);
}

showImage(image) {
  this.props.appStore.setSelectedImage(image);
  this._navigateToImageViewer();
}

shouldComponentUpdate(nextProps, nextState) {
  if (nextProps.value.length != this.state.images.length) {
    this.state.images = nextProps.value.slice(0);
  }
  return true;
}

render() {
  const images = this.state.images.map((image, index) => (
    <TouchableOpacity key={index} onPress={() => { this.showImage(image); }} style={styles.image}>
      <Image resizeMode="contain" source={{ uri: image.base64 }} style={{ width: 64, height: 64 }} />
    </TouchableOpacity>
  ));

  return (
    <View style={[styles.cameraWrapper, this.props.isVisible === false && styles.cameraWrapperInvisible]}>
      <View style={styles.cameraButtonWrapper}>
        <Button width={64} height={64} icon="photo" iconFontSize={24} onPress={() => { this.takeImage(); }} />
      </View>
      {images}
    </View>
  );
}
}

const styles = StyleSheet.create({
  cameraWrapper: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  cameraWrapperInvisible: {
    display: 'none',
  },
  cameraButtonWrapper: {
    marginRight: 16,
  },
  image: {
    marginRight: 16,
    marginBottom: 16,
    shadowColor: Colors.black,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    shadowOffset: {
      height: 1,
      width: 1,
    },
  },

});
