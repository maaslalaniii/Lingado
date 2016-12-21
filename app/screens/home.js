import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, ToolbarAndroid, TouchableNativeFeedback, StatusBar } from 'react-native'

import firebase from '../modules/firebase'
import styles from './styles/home.styles'

export default class Home extends Component {

  _showSettings() {
    this.props.navigator.push(this.props.routes[3])
  }

  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <View style={styles.toolbar}>
          <Text style={styles.title}>Lingado</Text>
          <TouchableNativeFeedback onPress={this._showSettings.bind(this)} background={TouchableNativeFeedback.Ripple('white', true)}>
            <View>
              <Image style={styles.settings} source={require('../images/settings.png')} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }

}