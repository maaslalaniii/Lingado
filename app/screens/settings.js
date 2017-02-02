/*
 * Settings configuration for the app.
 */

import React, { Component } from 'react'
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text
} from 'react-native'

import firebase from '../modules/firebase'
import styles from './styles/settings.styles'

export default class Settings extends Component {
  _signOut() {
    firebase.auth()
      .signOut()
      .then(() => this.props.navigator.popToTop(0))
  }

  _saveSettings() {
    // Update settings
    this.props.navigator.pop()
  }

  render() {
    return (
      <View style={styles.container}>

        <TouchableOpacity style={[styles.button, styles.highlight]} onPress={this._signOut.bind(this)}>
          <Text>Sign out</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={this._saveSettings.bind(this)}>
          <Text>Save</Text>
        </TouchableOpacity>
      
      </View>
    )
  }
}