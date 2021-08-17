import React, { Component } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';
import strings from '../../localization';
import { Colors } from '../../constants';

export class AnnotationInput extends Component {
  constructor(props) {
    super();

    this.state = {
      value: (props.value == null || props.value == '') ? '' : props.value,
      inFocus: false,
      height: 24,
      marginBottom: 40,
    };
  }

  onChangeText(value) {
    this.setState({
      value,
    });
    if (this.props.onSetValue) { this.props.onSetValue(value); }
  }

  onContentSizeChange(contentSize) {
    const contentHeight = Math.floor(contentSize.height) + 4;
    if (contentHeight != this.state.height) {
      if (contentHeight >= 30) {
        this.setState({
          height: contentHeight,
          marginBottom: 0,
        });
      } else {
        this.setState({
          height: contentHeight,
          marginBottom: 40,
        });
      }
    }
  }

  onFocus() {
    this.setState({
      inFocus: true,
    });
    this.props.avoidKeyboard();
  }

  onBlur() {
    this.setState({
      inFocus: false,
    });
  }

  onKeyPress(event) {
    if (event.nativeEvent.key == 'Enter') {
      this.submitEditing();
    }
  }

  submitEditing() {
    Keyboard.dismiss;
  }

  selectInput() {
    this.input.focus();
  }

  render() {
    return (
      <View>
        <Text style={[styles.inputLabel, this.state.inFocus === false && styles.inputInvisible]}>
          {this.props.label}
        </Text>
        <TouchableWithoutFeedback onPress={() => { this.selectInput(); }}>
          <View style={[styles.inputWrapper, this.props.isVisible === false && styles.inputInvisible, this.state.inFocus && styles.inputWrapperInFocus]}>
            <TextInput
              ref={(ref) => { this.input = ref; }}
              style={[styles.input, this.state.isPlaceholder && styles.inputIsPlaceholder, { height: this.state.height, marginBottom: this.state.marginBottom }]}
              onChangeText={(value) => { this.onChangeText(value); }}
              onContentSizeChange={(event) => { this.onContentSizeChange(event.nativeEvent.contentSize); }}
              onFocus={() => { this.onFocus(); }}
              onBlur={() => { this.onBlur(); }}
              value={this.state.value}
              underlineColorAndroid="rgba(0,0,0,0)"
              autoCorrect={false}
              multiline
              placeholder={strings.inputPlaceholders.annotation}
              placeholderTextColor={Colors.grey}
              returnKeyType="done"
              returnKeyLabel="done"
              onKeyPress={(event) => { this.onKeyPress(event); }}
              onSubmitEditing={() => { this.submitEditing(); }}
              blurOnSubmit
            />
          </View>
        </TouchableWithoutFeedback>
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
    flex: 1,
  },
  input: {
    fontSize: 16,
    fontFamily: 'regular',
    color: Colors.black,
    flex: 1,

  },
  inputWrapperInFocus: {
    borderColor: Colors.buttonSelected,
  },
  inputLabel: {
    fontSize: 14,
    fontFamily: 'regular',
    color: Colors.grey,
  },
  inputInvisible: {
    display: 'none',
  },
});
