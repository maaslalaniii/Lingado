/**
 * The home screen for the QR code and actions against recent connections.
 */

import React, { Component } from 'react'
import { View, ScrollView, StyleSheet, Text, Image, ToolbarAndroid, TouchableOpacity, StatusBar } from 'react-native'

import Connect from '../components/recentConnect'
import firebase from '../modules/firebase'
import styles from './styles/home.styles'

const database = firebase.database().ref()
const auth = firebase.auth()

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loaded: false,
      recentConnects: null
    }
  }

  componentWillMount() {
    if (!auth.currentUser) {
      return
    }

    database.child('users')
      .child(auth.currentUser.uid)
      .child('recentConnects')
      .once('value')
      .then((snapshot) => this.setState({
        loaded: true,
        recentConnects: snapshot.val()
      }))
  }

  _loadRecentConnects(connections) {
    return (
      <View>
        {connections.map((name, i) => <Connect name={name} key={i} />)}
      </View>
    )
  }

  _showSettings() {
    this.props.navigator.push(this.props.routes[3])
  }

  render() {
    return (
      <View style={styles.container}>

        <StatusBar barStyle='light-content' />

        <View style={styles.toolbar}>
          <Text style={styles.title}>Lingado</Text>

          <TouchableOpacity onPress={this._showSettings.bind(this)}>
            <View>
              <Image style={styles.settings} source={require('../images/settings.png')} />
            </View>
          </TouchableOpacity>

        </View>

        <ScrollView>
          <View style={styles.wrapper}>

            <Image style={styles.qr} source={require('../images/qr.png')} />

            <View style={styles.recentConnects}>
              <Text style={styles.recentConnectsTitle}>Recent Connects</Text>
              { this.state.loaded
                  ? this._loadRecentConnects(this.state.recentConnects)
                  : <Text style={styles.recentConnectsTitle}>No recent connections</Text> }
            </View>

          </View>
        </ScrollView>

      </View>
    )
  }

}
