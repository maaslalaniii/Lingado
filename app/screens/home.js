import React, { Component } from 'react'
import { View, StyleSheet, Text, Image, ToolbarAndroid, TouchableNativeFeedback, UIManager, findNodeHandle } from 'react-native'

import firebase from '../modules/firebase'

export default class Home extends Component {

  _showMenu() {
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.toolbar}>
          <Text style={styles.title}>Lingado</Text>
          <TouchableNativeFeedback onPress={this._showMenu} background={TouchableNativeFeedback.Ripple('white', true)}>
            <View>
              <Image style={styles.moreVert} source={require('../images/icons/more_vert.png')} />
            </View>
          </TouchableNativeFeedback>
        </View>
      </View>
    )
  }
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203040'
  },
  toolbar: {
    height: 56,
    backgroundColor: '#34495e',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10
  },
  title: {
    color: 'white',
    fontSize: 22,
    marginLeft: 10
  },
  moreVert: {
    height: 28,
    width: 28,
  }
})