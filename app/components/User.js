import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class User extends Component {

  _open(url) {
    Linking.canOpenURL(url)
      .then(supported => supported ? Linking.openURL(url) : console.log(`Cannot handle url: ${url}`))
      .catch(error => console.log(error))
  }

  render() {
    const contactInformation = [
      { name: 'name', icon: 'md-person', prefix: '' },
      { name: 'phone', icon: 'ios-call', prefix: 'tel:' },
      { name: 'email', icon: 'md-mail', prefix: 'mailto:' },
      { name: 'linkedin', icon: 'logo-linkedin', prefix: 'https://www.linkedin.com/profile/' },
      { name: 'facebook', icon: 'logo-facebook', prefix: 'https://www.facebook.com/' },
      { name: 'instagram', icon: 'logo-instagram', prefix: 'https://www.instagram.com/' },
      { name: 'twitter', icon: 'logo-twitter', prefix: 'https://www.twitter.com/' },
      { name: 'snapchat', icon: 'logo-snapchat', prefix: 'https://www.snapchat.com/add/' }
    ]

    return (
      <View style={styles.user} {...this.props}>

        {
          contactInformation.map((contact, i) => 
            <TouchableOpacity
              key={i}
              style={styles.item}
              onPress={() => {this._open(`${contact.prefix}${this.props[contact.name]}`)}}>
              <Ionicons style={styles.icon} name={contact.icon} size={20} />
              <Text style={styles.info}>{this.props[contact.name]}</Text>
            </TouchableOpacity>
          )
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  user: {
    flex: 1,
    alignItems: 'center',
    padding: '12.5%',
  },
  item: {
    flex: 1,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  icon: {
    color: 'rgba(0, 0, 0, 0.5)'
  },
  info: {
    color: 'rgba(0, 0, 0, 0.5)',
    textAlign: 'right'
  },
})