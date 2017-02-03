/**
 * The home screen.
 */

import React, { Component } from 'react'
import {
  View,
  ScrollView,
  StyleSheet,
  Text,
  Image,
  ToolbarAndroid,
  TouchableOpacity,
  StatusBar
} from 'react-native'

import Connect from '../components/recentConnect'
import firebase from '../modules/firebase'
import styles from './styles/home.styles'

const database = firebase.database()
const auth = firebase.auth()
const usersRef = database.ref('users')

export default class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      recentConnects: null
    }
  }

  componentDidMount() {
    this._listenForConnects()
  }

  _listenForConnects() {
    // Ensure user is logged in.
    if (!auth.currentUser) return

    usersRef
      .child(auth.currentUser.uid)
      .child('recentConnects')
      .on('value', (snapshot) => this.setState({ recentConnects: snapshot.val() }))
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

  _connectWithNFC() {
    // Go to NFC connect screen
  }

  _connectWithQR() {
    // Go to QR connect screen
  }

  render() {
    return (
      <View style={styles.container}>

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

            <View style={[styles.wrapper, styles.profileView]}>
              <Image style={styles.profileImage} source={require('../images/profileDefault.jpg')} />
              <Text style={styles.profileEmail}>
                {
                  auth.currentUser
                    ? auth.currentUser.email
                    : 'Please log in'
                }
              </Text>
            </View>

            <TouchableOpacity onPress={() => this._connectWithNFC()}>
              <View style={styles.connectButton}>
                <Text style={styles.nfcConnect}>Connect with NFC</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => this._connectWithQR()}>
              <View style={styles.connectButton}>
                <Text style={styles.qrConnect}>Connect with QR</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.recentConnects}>
              <Text style={styles.recentConnectsTitle} >Recent Connects</Text>
              {
                this.state.recentConnects
                  ? this._loadRecentConnects(this.state.recentConnects)
                  : <Text style={styles.recentConnectsTitle}>No recent connections</Text>
              }
            </View>

          </View>
        </ScrollView>

      </View>
    )
  }
}
