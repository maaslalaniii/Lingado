import { Component } from 'react'

import { Text, View, StyleSheet, TouchableOpacity } from 'react-native'

// Ensure react-native-camera is linked before continuing
// Type: react-native link react-native-camera
import Camera from 'react-native-camera'

export default class QRCodeRead extends Component {
  render() {
    return (
      // Add button to cancel
      // Add button to scan QRCode
    )
  }
}

const styles = StyleSheet.create({
  camera: {
    height: 568,
    alignItems: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
})
