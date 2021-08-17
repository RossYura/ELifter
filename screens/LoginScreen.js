import React from 'react';
import { View, Text, StyleSheet, Dimensions, Alert, Keyboard, TouchableOpacity } from 'react-native';
import { observer, inject } from 'mobx-react';
import strings from '../localization';
import { Screen, Loader } from '../components';
import { Colors } from '../constants';
import { Button } from '../components/Button/Button';
import { Input } from '../components/Input/Input';

@inject('appStore') @observer
export class LoginScreen extends React.Component {
  constructor(props) {
    super();
    this.state = {
      username: (props.appStore.lastUsername === null) ? '' : props.appStore.lastUsername,
      password: '',
      usernameInFocus: false,
      passwordInFocus: false,
      isPasswordReset: false,
      isFetching: false,
      loadingText: strings.loader.login,
    };

    props.appStore.setNavigation(props.navigation);

    this._windowHeightHalf = Dimensions.get('window').height * 0.5;
  }

  usernameOnFocus() {
    const offset = 64;
    this.passwordInput.measure((fx, fy, width, height, px, py) => {
      if (this._windowHeightHalf <= py + offset) {
        // offset plus login button height
        this.props.appStore.setKeyboardHeightOffset(-1 * this._windowHeightHalf + offset);
        this.props.appStore.setIsKeyboardAnimation(true);
        this.props.appStore.moveScreenUp();
      }
    });
  }

  passwordOnFocus() {
    const offset = 64;
    this.passwordInput.measure((fx, fy, width, height, px, py) => {
      if (this._windowHeightHalf <= py + offset) {
        // offset plus login button height
        this.props.appStore.setKeyboardHeightOffset(-1 * this._windowHeightHalf + offset);
        this.props.appStore.setIsKeyboardAnimation(true);
        this.props.appStore.moveScreenUp();
      }
    });
  }

  setUsername(username) {
    this.setState({
      usernameInFocus: false,
      passwordInFocus: false,
      username,
    });
  }

  setPassword(password) {
    this.setState({
      usernameInFocus: false,
      passwordInFocus: false,
      password,
    });
  }

  onPress() {
    Keyboard.dismiss();
    this.setState({
      usernameInFocus: false,
      passwordInFocus: false,
    });
    this.login();
  }

  focusUsernameInput() {
    this.setState({
      usernameInFocus: true,
      passwordInFocus: false,
    });
  }

  focusPasswordInput() {
    this.setState({
      usernameInFocus: false,
      passwordInFocus: true,
    });
  }

  showResetForm() {
    this.setState({
      isPasswordReset: true,
    });
  }

  showLoginForm() {
    this.setState({
      isPasswordReset: false,
    });
  }

  validateInput() {
    if (this.state.username == '' && this.state.password == '') {
      Alert.alert(strings.alerts.login.allEmpty.title, strings.alerts.login.allEmpty.message);
      return false;
    } else if (this.state.username == '') {
      Alert.alert(strings.alerts.login.noUsername.title, strings.alerts.login.noUsername.message);
      return false;
    } else if (this.state.password == '') {
      Alert.alert(strings.alerts.login.noPassword.title, strings.alerts.login.noPassword.message);
      return false;
    }
    return true;
  }

  handleLoginError(error) {
    switch (error.message) {
      case 'username':
        Alert.alert(strings.alerts.login.wrongUsername.title, strings.alerts.login.wrongUsername.message, [{
          text: 'OK',
          onPress: () => {
            this.focusUsernameInput();
          },
        }]);
        break;
      case 'password':
        Alert.alert(strings.alerts.login.wrongPassword.title, strings.alerts.login.wrongPassword.message, [{
          text: 'OK',
          onPress: () => {
            this.focusPasswordInput();
          },
        }]);
        break;
      default:
        Alert.alert(strings.alerts.login.serverTimeout.title, strings.alerts.login.serverTimeout.message);
        break;
    }
  }

  async resetPassword() {
    Keyboard.dismiss();
    this.setState({
      usernameInFocus: false,
      passwordInFocus: false,
    });
    if (this.state.username == '') {
      Alert.alert(strings.alerts.login.noUsername.title, strings.alerts.login.noUsername.message);
      return false;
    } else {
      this.setState({
        loadingText: strings.loader.resetPassword,
        isFetching: true,
      });
      try {
        await this.props.appStore.resetPassword(this.state.username);
        this.setState({
          isPasswordReset: false,
          isFetching: false,
          loadingText: strings.loader.login,
        });
      } catch (error) {
        this.setState({
          isFetching: false,
        });
        this.handleLoginError(error);
      }
    }
  }

  async login() {
    if (this.validateInput()) {
      this.setState({
        isFetching: true,
      });
      try {
        await this.props.appStore.loginUser(this.state.username, this.state.password);
        this.props.appStore.setLastUsername(this.state.username);
        this.setState({
          loadingText: strings.loader.elevators,
        });
        await this.props.appStore.synchronizeApp(this.state.username);
        this.props.navigation.navigate('Home');
        this.setState({
          isFetching: false,
        });
      } catch (error) {
        this.props.appStore.setJWT(null);
        this.setState({
          isFetching: false,
        });
        this.handleLoginError(error);
      }
    }
  }

  render() {
    const { username } = this.state;
    const { password } = this.state;
    // const password = (this.props.appStore.jwt === null) ? this.state.password : '';

    if (this.state.isFetching) {
      return (
        <Screen backgroundColor={Colors.appBackground}>
          <Loader text={this.state.loadingText} />
        </Screen>
      );
    }
    if (this.state.isPasswordReset) {
      return (
        <Screen backgroundColor={Colors.appBackground}>
          <View style={styles.loginWrapper}>
            <Text style={styles.inputLabel}>{`${strings.inputPlaceholders.loginUsername}*`}</Text>
            <Input
              inputRef={(ref) => { this.userInput = ref; }}
              onSubmitEditing={() => { this.focusPasswordInput(); }}
              inFocus={this.state.usernameInFocus}
              autoCapitalize={false}
              onSetValue={(value) => { this.setUsername(value); }}
              returnKeyType="next"
              placeholder={strings.inputPlaceholders.loginUsername}
              value={username}
            />
            <TouchableOpacity onPress={() => { this.showLoginForm(); }}>
              <Text style={styles.formToggleButton}>{ strings.login.loginFormButton}</Text>
            </TouchableOpacity>
            <View style={styles.buttonWrapper}>
              <Button onPress={() => { this.resetPassword(); }} text={strings.login.restorePasswordButton} width="auto" padding={16} />
            </View>
            <Text style={styles.passwordResetText}>{`*${strings.login.loginPasswordReset}`}</Text>
          </View>
        </Screen>
      );
    }
    return (
      <Screen backgroundColor={Colors.appBackground}>
        <View style={styles.loginWrapper}>
          <Text style={styles.inputLabel}>{ strings.inputPlaceholders.loginUsername}</Text>
          <Input
            inputRef={(ref) => { this.userInput = ref; }}
            onSubmitEditing={() => { this.focusPasswordInput(); }}
            inFocus={this.state.usernameInFocus}
            autoCapitalize={false}
            onSetValue={(value) => { this.setUsername(value); }}
            onFocus={() => { this.usernameOnFocus(); }}
            returnKeyType="next"
            placeholder={strings.inputPlaceholders.loginUsername}
            value={username}
          />
          <Text style={styles.inputLabel}>{ strings.inputPlaceholders.loginPassword}</Text>
          <Input
            inputRef={(ref) => { this.passwordInput = ref; }}
            onSubmitEditing={() => { this.login(); }}
            inFocus={this.state.passwordInFocus}
            autoCapitalize={false}
            onSetValue={(value) => { this.setPassword(value); }}
            onFocus={() => { this.passwordOnFocus(); }}
            returnKeyType="done"
            placeholder={strings.inputPlaceholders.loginPassword}
            isPassword
            value={password}
          />
          <TouchableOpacity onPress={() => { this.showResetForm(); }}>
            <Text style={styles.formToggleButton}>{strings.login.passwordResetFormButton}</Text>
          </TouchableOpacity>
          <View style={styles.buttonWrapper}>
            <Button onPress={() => { this.onPress(); }} text="Login" width={100} />
          </View>
        </View>
        <View style={styles.disclaimerWrapper}>
          <Text style={styles.disclaimerText}>{strings.alerts.login.loginDisclaimer}</Text>
        </View>
      </Screen>
    );
  }
}

const styles = StyleSheet.create({
  loginWrapper: {
    backgroundColor: Colors.screenBackground,
    margin: 16,
    padding: 16,
    paddingBottom: 8,
  },
  disclaimerWrapper: {
    margin: 16,
    padding: 16,
    paddingBottom: 8,
  },
  disclaimerText: {
    color: Colors.white,
  },
  inputLabel: {
    fontFamily: 'regular',
    color: Colors.grey,
    fontSize: 14,
    paddingBottom: 2,
  },
  buttonWrapper: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 8,
  },
  formToggleButton: {
    color: Colors.buttonBackground,
    fontFamily: 'regular',
    fontSize: 14,
  },
  passwordResetText: {
    fontFamily: 'regular',
    fontSize: 12,
    color: Colors.grey,
  },
});
