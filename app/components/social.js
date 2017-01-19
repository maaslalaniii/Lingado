/*
 * Social icons for the setup screen.
 */

import React, { Component } from 'react'
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native'

import styles from './styles/social.styles'

const icons = {
  facebook: require('../images/facebook.png'),
  linkedin: require('../images/linkedin.png'),
  snapchat: require('../images/snapchat.png'),
  twitter: require('../images/twitter.png'),
  github: require('../images/github.png'),
  instagram: require('../images/instagram.png')
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
      <TouchableOpacity onPress={() => this._select()}>
        <View style={[styles.icon, styles.spacer, !this.state.selected && styles.unselected]}>
          <Image style={styles.icon} source={icons[this.props.icon]} />
        </View>
      </TouchableOpacity>
    )
  }
}
