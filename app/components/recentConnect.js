/*
 * Recent connection component for accepting or rejecting connections.
 */

import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'

import styles from './styles/recentConnect.styles'

export default class RecentConnect extends Component {
  constructor(props) {
    super(props)
    this.state = {
      accepted: false,
      rejected: false
    }
  }

  _accept() {

  }

  _reject() {

  }

  render() {
    return (
      <View style={styles.recentConnect}>

        <View style={styles.recentConnectImageContainer}>
          <Image style={styles.recentConnectImage} source={require('../images/profileDefault.jpg')} />
        </View>

        <View style={styles.recentConnectInfo}>

          <Text style={styles.recentConnectName}>{this.props.name}</Text>

          <View style={styles.recentConnectActions}>

            <TouchableOpacity>
              <View>
                <Text style={[styles.recentConnectAction, styles.recentConnectAccept]}>accept</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity>
              <View>
                <Text style={[styles.recentConnectAction, styles.recentConnectReject]}>reject</Text>
              </View>
            </TouchableOpacity>

          </View>

        </View>

      </View>
    )
  }
}
