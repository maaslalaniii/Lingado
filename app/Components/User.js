import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity, Linking } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class User extends React.Component {

  _open(url) {
    Linking.canOpenURL(url)
      .then(supported => supported ? Linking.openURL(url) : console.log(`Cannot handle url: ${url}`))
      .catch(error => console.log(error))
  }

  render() {
    return (
      <View style={styles.user} {...this.props}>

        <TouchableOpacity style={styles.item}>
          <Ionicons style={styles.icon} name="md-person" size={20} />
          <Text style={styles.info}>{this.props.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {this._open(`tel:${this.props.phone}`)}}>
          <Ionicons style={styles.icon} name="ios-call" size={20} />
          <Text style={styles.info}>{this.props.phone}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {this._open(`mailto:${this.props.email}?subject=Lingado`)}}>
          <Ionicons style={styles.icon} name="md-mail" size={18} />
          <Text style={styles.info}>{this.props.email}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {this._open(`linkedin://profile/${this.props.linkedin}`)}}>
          <Ionicons style={styles.icon} name="logo-linkedin" size={20} />
          <Text style={styles.info}>{this.props.linkedin}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {this._open(`fb://profile/${this.props.facebook}`)}}>
          <Ionicons style={styles.icon} name="logo-facebook" size={20} />
          <Text style={styles.info}>{this.props.facebook}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {this._open(`instagram://user?username=${this.props.instagram}`)}}>
          <Ionicons style={styles.icon} name="logo-instagram" size={20} />
          <Text style={styles.info}>{this.props.instagram}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {this._open(`twitter://user?screen_name=${this.props.twitter}?subject=Lingado`)}}>
          <Ionicons style={styles.icon} name="logo-twitter" size={20} />
          <Text style={styles.info}>{this.props.twitter}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item} onPress={() => {this._open(`snapchat://add/${this.props.snapchat}?subject=Lingado`)}}>
          <Ionicons style={styles.icon} name="logo-snapchat" size={20} />
          <Text style={styles.info}>{this.props.snapchat}</Text>
        </TouchableOpacity>

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