/*
 * Recent connection component for accepting or rejecting connections.
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  TouchableOpacity
} from 'react-native'

import styles from './styles/recentConnect.styles'
import firebase from '../modules/firebase'

const usersRef = firebase.database().ref('users')

export default class RecentConnect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accepted: false,
      rejected: false
    }
  }

  _accept() {
    this.setState({ accepted: true })
  }

  _reject() {
    this.setState({ rejected: true })
  }

  _renderActions() {
    return (
      <View style={styles.recentConnectActions}>

        <TouchableOpacity onPress={() => this._accept()}>
          <View>
            <Text style={[styles.recentConnectAction, styles.recentConnectAccept]}>accept</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => this._reject()}>
          <View>
            <Text style={[styles.recentConnectAction, styles.recentConnectReject]}>reject</Text>
          </View>
        </TouchableOpacity>

      </View>
    )
  }

  _renderResult() {
    return this.state.accepted
    ? (
      <View style={styles.resultContainer}>
        <Text  style={styles.resultAccepted}>was accepted</Text>
      </View>
    )
    : (
      <View style={styles.resultContainer}>
        <Text style={styles.resultRejected}>was rejected</Text>
      </View>
    )
  }

  render() {
    return (
      <View style={styles.recentConnect}>

        <View style={styles.recentConnectImageContainer}>
          <Image style={styles.recentConnectImage} source={require('../images/profileDefault.jpg')} />
        </View>

        <View style={styles.recentConnectInfo}>

          <Text style={styles.recentConnectName}>{this.props.name}</Text>

          {
            !this.state.accepted && !this.state.rejected
              ? this._renderActions()
              : this._renderResult()
          }

        </View>

      </View>
    )
  }
}
