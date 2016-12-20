/*
 * Screen for the initial setup for the bracelet.
 */

import React, { Component } from 'react'
import { View, Image, StyleSheet, ScrollView, Text, TouchableOpacity, Alert } from 'react-native'

import firebase from '../modules/firebase'
import Social from '../components/social'

export default class Setup extends Component {
  constructor(props) {
    super(props)
    this.state = {
      supportedSocialMedia: ["LinkedIn"]
    }
  }

  _continueSetup() {
    Alert.alert('Warning', `For now, our application supports only ${this.state.supportedSocialMedia}.`, [{ text: 'ok', onPress: () => this.props.navigator.push(this.props.routes[2]) }])
  }

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.settings} source={require('../images/settings.png')} />

        <Text style={styles.instructions}>Select the social media to connect</Text>

        <View style={styles.icons}>
          <Social icon="twitter" />
          <Social icon="facebook" />
          <Social icon="linkedin" />
          <Social icon="snapchat" />
          <Social icon="instagram" />
        </View>

        <TouchableOpacity style={styles.continueButton} onPress={this._continueSetup.bind(this)}>
          <Text>Continue</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#203040',
    alignItems: 'center',
    flex: 1
  },
  icons: {
    padding: 10,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  instructions: {
    color: 'gray',
    textAlign: 'left',
    margin: 10
  },
  settings: {
    width: 200,
    height: 200,

  },
  continueButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 40
  }
})