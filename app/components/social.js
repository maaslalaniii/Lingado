/*
 * Social icons for the setup screen.
 */

import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableNativeFeedback } from 'react-native'

const icons = {
  facebook: require('../images/facebook.png'),
  linkedin: require('../images/linkedin.png'),
  snapchat: require('../images/snapchat.png'),
  twitter: require('../images/twitter.png')
}

export default class Social extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: false
    }
  }

  _select() {
    this.setState({ selected: !this.state.selected })
  }

  render() {
    return (
      <TouchableNativeFeedback onPress={() => this._select()}>
        <View style={[styles.icon, styles.spacer, !this.state.selected && styles.unselected]}>
          <Image style={styles.icon} source={icons[this.props.icon]} />
        </View>
      </TouchableNativeFeedback>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    width: 75,
    height: 75,
    borderRadius: 75,
  },
  spacer: {
    margin: 10
  },
  unselected: {
    opacity: 0.3,
    backgroundColor: 'black'
  }
})