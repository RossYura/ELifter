import React, { Component } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { TextIcon } from '..';
import { IconButton } from '../Button/IconButton';
import { Colors } from '../../constants';

export class Input extends Component {
  constructor() {
    super();
    this.state = {
      inFocus: false,
    };
  }

  onChangeText(value) {
    this.setState({ value });
    if (this.props.onSetValue) {
      this.props.onSetValue(value);
    }
  }

  onFocus() {
    this.setState({
      inFocus: true,
    });
    if (this.props.onFocus) {
      this.props.onFocus();
    }
  }

  onBlur() {
    this.setState({
      inFocus: false,
    });
    if (this.props.onBlur) { this.props.onBlur(); }
  }

  resetValue() {
    this.onChangeText('');
  }

  onSubmitEditing() {
    if (this.props.onSubmitEditing) {
      this.props.onSubmitEditing();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.inFocus === true) {
      this.input.focus();
    }
  }

  render() {
    return (
      <View ref={this.props.inputRef} style={[styles.inputWrapper, this.state.inFocus && styles.inputWrapperInFocus]}>
        <View style={styles.iconWrapper}>
          <TextIcon icon={this.props.icon} color={Colors.grey} />
        </View>
        <TextInput
          ref={(ref) => { this.input = ref; }}
          style={[styles.input]}
          onChangeText={(value) => { this.onChangeText(value); }}
          onFocus={this.onFocus.bind(this)}
          onBlur={this.onBlur.bind(this)}
          value={this.props.value}
          underlineColorAndroid="rgba(0,0,0,0)"
          autoCorrect={false}
          placeholder={this.props.placeholder}
          placeholderTextColor={Colors.grey}
          returnKeyType={this.props.returnKeyType}
          returnKeyLabel={this.props.returnKeyType}
          blurOnSubmit
          secureTextEntry={this.props.isPassword}
          autoCapitalize={(this.props.autoCapitalize === false) ? 'none' : 'sentences'}
          onSubmitEditing={this.props.onSubmitEditing}
        />
        <View style={[styles.iconButtonWrapper, this.props.value && styles.iconButtonWrapperIsVisible]}>
          <IconButton icon="remove" onPress={() => { this.resetValue(); }} />
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  inputWrapper: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: Colors.inputText,
    marginBottom: 8,
    padding: 8,
    backgroundColor: Colors.white,
    flexDirection: 'row',
  },
  input: {
    fontSize: 16,
    fontFamily: 'regular',
    height: 24,
    color: Colors.black,
    flex: 1,
  },
  inputWrapperInFocus: {
    borderColor: Colors.buttonSelected,
  },
  iconWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingRight: 8,
  },
  iconButtonWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    display: 'none',
  },
  iconButtonWrapperIsVisible: {
    display: 'flex',
  },
});
