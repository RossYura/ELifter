import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import { Card } from './Card';

export class TouchableCard extends Component {
  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.onPress.bind(this)}>
        <Card direction={this.props.direction}>
          {this.props.children}
        </Card>
      </TouchableOpacity>
    );
  }
}
