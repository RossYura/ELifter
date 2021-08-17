import { observable, action, computed, useStrict } from 'mobx';
import { Alert, AsyncStorage } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import { NavigationActions } from 'react-navigation';
import * as FileSystem from 'expo-file-system';
import apiHandler from './ApiHandler';
import strings from '../localization';

useStrict(true);

class AppStore {
@observable navigation = null;

@observable isConnected = false;

@observable lastUsername = '';

@observable lastSynchronisation = null;

@observable jwt = null;

@observable appUser = null;

@observable isKeyboardAnimation = false;

@observable keyboardHeight = 0;

@observable keyboardHeightOffset = 0;

@observable currentFlatlist = null;

@observable currentFlatlistItemIndex = null;

@observable elevators = [];

@observable selectedElevator = null;

@observable elevatorSearch = null;

@observable barcodeResult = false;

@observable isAllCheckpointsSubmitted = false;

@observable isUploadingReport = false;

@observable selectedImage = null;

@computed get dueElevators() {
  return this.elevators.reduce((accumulator, currentValue) => {
    if (this.elevatorSearch === null) {
      if (apiHandler.checkIfElevatorIsDue(currentValue)) {
        accumulator.push(apiHandler.buildElevatorInformation(currentValue));
      }
    } else if (this._searchByValue(currentValue, this.elevatorSearch)) {
      if (apiHandler.checkIfElevatorIsDue(currentValue)) {
        accumulator.push(apiHandler.buildElevatorInformation(currentValue));
      }
    }

    return accumulator;
  }, []);
}

@computed get allElevtors() {
  return this.elevators.reduce((accumulator, currentValue) => {
    if (this.elevatorSearch === null) {
      accumulator.push(apiHandler.buildElevatorInformation(currentValue));
    } else if (this._searchByValue(currentValue, this.elevatorSearch)) {
      accumulator.push(apiHandler.buildElevatorInformation(currentValue));
    }
    return accumulator;
  }, []);
}

@computed get selectedElevatorFactsheet() {
  return apiHandler.buildFactsheet(this.selectedElevator);
}

@computed get getLastSynchronisation() {
  if (this.lastSynchronisation) {
    return apiHandler.parseTimestampToHumanReadableTime(this.lastSynchronisation);
  }
  return strings.sync.default;
}

@action setSelectedImage(image) {
  this.selectedImage = image;
}

@action setNavigation(navigation) {
  if (this.navigation == null) {
    this.navigation = navigation;
  }
}

@action setIsConnected(isConnected) {
  this.isConnected = isConnected;
}

@action setLastUsername(username) {
  this.lastUsername = username;
}

@action setLastSynchronisation(timestamp, username) {
  this.lastSynchronisation = timestamp;
  this.setASLastSynchronisation(`${timestamp}`, username);
}

@action getASLastSynchronisation(username) {
  return AsyncStorage.getItem(`${username}_lastSynchronisation`);
}

@action setASLastSynchronisation(timestamp, username) {
  return AsyncStorage.setItem(`${username}_lastSynchronisation`, timestamp);
}

@action getASJWT() {
  return AsyncStorage.getItem('jwt');
}

@action setJWT(jwt) {
  this.jwt = jwt;
  if (jwt === null) {
    return AsyncStorage.removeItem('jwt');
  }
  return AsyncStorage.setItem('jwt', jwt);
}

@action async getASAppUser() {
  const appUser = await AsyncStorage.getItem('app_user');
  return JSON.parse(appUser);
}

@action setAppUser(appUser) {
  this.appUser = appUser;
  return AsyncStorage.setItem('app_user', JSON.stringify(appUser));
}

@action async getASElevators(username) {
  const elevators = await AsyncStorage.getItem(`${username}_elevators`);
  return JSON.parse(elevators);
}

@action async setLocalElevatorData(username) {
  try {
    await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${username}_elevators.json`);
  } catch (e) {
    console.log(e);
    return [];
  }
}

@action async getLocalElevatorData(username) {
  try {
    const localElevators = await FileSystem.readAsStringAsync(`${FileSystem.documentDirectory}${username}_elevators.json`);
    return JSON.parse(localElevators);
  } catch (e) {
    console.log(e);
    return [];
  }
}

@action async setLocalElevatorData(username, elevators) {
  try {
    await FileSystem.writeAsStringAsync(`${FileSystem.documentDirectory}${username}_elevators.json`, JSON.stringify(elevators));
  } catch (e) {
    console.log(e);
  }
}

@action setElevatorsData(elevatorsData) {
  this.elevators = elevatorsData;
}

@action async setElevators(elevatorsData, username) {
  const localElevators = await this.getLocalElevatorData(username);
  if (elevatorsData == null) {
    elevators = [];
  }
  elevatorsData.forEach((elevator, index) => {
    const localElevator = localElevators.find((localElevatorData) => localElevatorData.elev_id === elevator.elev_id);
    if (localElevator) {
      if (localElevator.status != null) {
        elevator.newReport = localElevator.newReport;
        elevator.status = localElevator.status;
        elevator.checkpointsCompleted = localElevator.checkpointsCompleted;
        elevator.checkpointsTotal = localElevator.checkpointsTotal;
        elevator.picturesTaken = localElevator.picturesTaken;
        elevator.picturesLimit = localElevator.picturesLimit;
      } else {
        elevator = apiHandler.addNewReport(elevator, this.appUser);
      }
    } else {
      elevator = apiHandler.addNewReport(elevator, this.appUser);
    }
  });
  await this.setLocalElevatorData(username, elevatorsData);
  this.setElevatorsData(elevatorsData);
  try {
    await AsyncStorage.removeItem(`${username}_elevators`);
  } catch (e) {
    console.log(e);
  }
}

@action setSelectedElevator(elev_id) {
  this.selectedElevator = this.elevators[this._getSelectedElevatorIndexById(elev_id)];
}

@action setCheckpointsImageCounter(operation = null) {
  if (operation == 'add') {
    if (this.selectedElevator.picturesTaken >= 0) { this.selectedElevator.picturesTaken = this.selectedElevator.picturesTaken + 1; }
  } else if (this.selectedElevator.picturesTaken > 0) { this.selectedElevator.picturesTaken = this.selectedElevator.picturesTaken - 1; }
}

@action setCheckpointData(index, key, value, isShowUploadAlert) {
  this.selectedElevator.newReport.repo_checkpoints[index][key] = value;
  this.checkIfAllCheckpointsAreSet(isShowUploadAlert);
}

@action setIsAllCheckpointsSubmitted(isAllCheckpointsSubmitted) {
  this.isAllCheckpointsSubmitted = isAllCheckpointsSubmitted;
}

@action async checkIfAllCheckpointsAreSet(isShowUploadAlert = true) {
  const result = this.selectedElevator.newReport.repo_checkpoints.findIndex((checkpoint) => checkpoint.chpo_is_ok === null);
  if (result == -1) {
    this.selectedElevator.checkpointsCompleted = this.selectedElevator.checkpointsTotal;
    this.selectedElevator.status = 'done';
    await this.setLocalElevatorData(this.lastUsername, this.elevators);
    this.setIsAllCheckpointsSubmitted(true);
    if (isShowUploadAlert) {
      this.showUploadAlert();
    }
  } else {
    const checkpointsUncompleted = this.selectedElevator.newReport.repo_checkpoints.filter((checkpoint) => checkpoint.chpo_is_ok === null).length;
    this.selectedElevator.checkpointsCompleted = this.selectedElevator.checkpointsTotal - checkpointsUncompleted;
    if (checkpointsUncompleted == this.selectedElevator.checkpointsTotal) {
      this.selectedElevator.status = null;
    } else {
      this.selectedElevator.status = 'in_progress';
    }
    await this.setLocalElevatorData(this.lastUsername, this.elevators);
    this.setIsAllCheckpointsSubmitted(false);
  }
}

@action async resetSelectedElevatorStatus() {
  const index = this._getSelectedElevatorIndexById(this.selectedElevator.elev_id);
  this.elevators[index] = apiHandler.addNewReport(this.selectedElevator, this.appUser);
  this.selectedElevator.status = null;
  await this.setLocalElevatorData(this.lastUsername, this.elevators);
}

@action setIsUploadingReport(isUploadingReport) {
  this.isUploadingReport = isUploadingReport;
}

@action showUploadAlert() {
  Alert.alert(
    strings.alerts.checklistDone.title,
    strings.alerts.checklistDone.message,
    [
      { text: strings.alerts.checklistDone.cancle, onPress: () => {}, style: 'cancel' },
      { text: strings.alerts.checklistDone.ok, onPress: () => { this.uploadReport(); } },
    ],
    { cancelable: true },
  );
}

@action showUploadDisabledAlert() {
  Alert.alert(
    strings.alerts.uploadDisabled.title,
    strings.alerts.uploadDisabled.message,
    [
      { text: strings.alerts.uploadDisabled.ok, onPress: () => {} },
    ],
    { cancelable: true },
  );
}

@action getHomeNavigationTabs() {
  return strings.screens.navigationTabs.home;
}

@action isSelectedElevatorDueTodey() {
  return apiHandler.checkIfElevatorIsDue(this.selectedElevator);
}

@action inspectionDaysToString(inspectionDays) {
  return apiHandler.inspectionDaysToString(inspectionDays);
}

@action parseHTML(html) {
  return apiHandler.parseHTML(html);
}

@action setIsKeyboardAnimation(isKeyboardAnimation) {
  this.isKeyboardAnimation = isKeyboardAnimation;
}

@action setElevtorSearch(query) {
// this.elevatorSearch = query;
  if (this.elevatorSearch != query) {
    this.elevatorSearch = query;
  }
}

@action setBarcodeResult(barcode) {
  this.barcodeResult = barcode;
}

@action setKeyboardHeightOffset(offset) {
  this.keyboardHeightOffset = offset;
}

@action setCurrentFlatlist(ref) {
  this.currentFlatlist = ref;
}

@action setCurrentFlatlistItemIndex(index) {
  this.currentFlatlistItemIndex = index;
}

@action moveScreenUp(event) {
  if (event) {
    this.keyboardHeight = event.endCoordinates.height;
  }
  if (this.isKeyboardAnimation) {
    this.keyboardHeight = (this.keyboardHeight != 0) ? this.keyboardHeight + this.keyboardHeightOffset : this.keyboardHeight;
    return;
  }
  if (this.currentFlatlist && this.currentFlatlistItemIndex != null) {
    this.currentFlatlist.scrollToIndex({
      index: this.currentFlatlistItemIndex,
      viewPosition: 1,
      viewOffset: -1 * this.keyboardHeight,
    });
  }
}

@action moveScreenDown(event) {
  this.keyboardHeight = 0;
  if (this.isKeyboardAnimation) {
    this.keyboardHeightOffset = 0;
    this.isKeyboardAnimation = false;
  }
}

@action async resetPassword(username) {
  try {
    return await apiHandler.resetPassword(username);
  } catch (error) {
    console.log(error.toString());
    if (error.response.data.message.includes('username')) {
      throw new Error('username');
    } else {
      throw new Error();
    }
  }
}

@action async loginUser(username, password) {
  try {
    const response = await apiHandler.loginUser(username, password);
    console.log("Login Response === ", response);
    const appUser = await apiHandler.getAppUserData(response.data.pers_token, response.data.pers_id);
    this.setAppUser(appUser.data);
    this.setJWT(response.data.pers_token);
  } catch (error) {
    console.log(error);
    if (error.message == 'timeout') {
      throw new Error('timeout');
    }
    if (error.hasOwnProperty('response')) {
      if (error.response.data.message.includes('username')) {
        throw new Error('username');
      } else if (error.response.data.message.includes('password')) {
        throw new Error('password');
      }
    }
    throw new Error();
  }
}

@action async checkIfASJWTIsExpired() {
  const jwt = await this.getASJWT();
  if (jwt) {
    this.setJWT(jwt);
    return apiHandler.checkIfJWTIsExpired(jwt);
  }
  return true;
}

@action async getUsernameFromASJWT() {
  const jwt = await this.getASJWT();
  return apiHandler.getJWTUsername(jwt);
}

@action async synchronizeApp(username = this.lastUsername) {
  // const isConnected = await NetInfo.isConnected.fetch();
  // if (isConnected) {
  const status = await NetInfo.fetch();
  if (status.isConnected) {
    this.setLastSynchronisation(null, username);
    const elevators = await apiHandler.getAllElevators(this.jwt);
    console.log("Get All Elevators === ", elevators);
    if (elevators === false) {
      await this.setJWT(null);
      return false;
    }
    await this.setElevators(elevators, username);
    const timestamp = apiHandler.getUnixTimestamp();
    this.setLastSynchronisation(timestamp, username);
    return true;
  } else if (this.elevators.length == 0) {
    this.setLastSynchronisation(null, username);
    await this.setElevators(null, username);
    const timestamp = await this.getASLastSynchronisation(username);
    this.setLastSynchronisation(timestamp, username);
    return true;
  }
  return false;
}

@action async uploadReport() {
  this.setIsUploadingReport(true);
  try {
    await apiHandler.uploadReport(this.jwt, this.selectedElevator.newReport);
    this.resetSelectedElevatorStatus();
    const backAction = NavigationActions.back({
      key: null,
    });
    this.navigation.dispatch(backAction);
    this.setIsUploadingReport(false);
    this.synchronizeApp(this.lastUsername);
  } catch (e) {
    this.setIsUploadingReport(false);
    try {
      if (e.response.request._response.statusCode == 403) {
        Alert.alert(
          strings.alerts.wrongReportUploadScope.title,
          strings.alerts.wrongReportUploadScope.message,
        );
      } else {
        Alert.alert(
          strings.alerts.undefinedError.title,
          e.toString(),
        );
      }
    } catch (err) {
      console.log(err);
      Alert.alert(
        strings.alerts.uploadError.title,
        strings.alerts.uploadError.message,
      );
    }
  }
}

_searchByValue(elevator, query) {
  elevator = apiHandler.getSearchString(elevator);
  return (elevator.includes(query.toLowerCase()));
}

_getSelectedElevatorIndexById(elev_id) {
  return this.elevators.findIndex((elevator) => elevator.elev_id === elev_id);
}
}

export default new AppStore();
