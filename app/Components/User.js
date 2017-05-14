import React from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class User extends React.Component {
  render() {
    return (
      <View style={styles.user}>

        <TouchableOpacity style={styles.item}>
          <Ionicons style={styles.icon} name="md-person" size={20} />
          <Text style={styles.info}>{this.props.name}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons style={styles.icon} name="md-mail" size={18} />
          <Text style={styles.info}>{this.props.email}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons style={styles.icon} name="logo-linkedin" size={20} />
          <Text style={styles.info}>{this.props.linkedin}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons style={styles.icon} name="logo-facebook" size={20} />
          <Text style={styles.info}>{this.props.facebook}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons style={styles.icon} name="logo-instagram" size={20} />
          <Text style={styles.info}>{this.props.instagram}</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.item}>
          <Ionicons style={styles.icon} name="logo-twitter" size={20} />
          <Text style={styles.info}>{this.props.twitter}</Text>
        </TouchableOpacity>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  user: {
    alignItems: 'center',
    width: 300,
    paddingTop: 25,
    paddingBottom: 25,
    backgroundColor: '#203040',
  },
  item: {
    width: 200,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.5)'
  },
  info: {
    color: 'rgba(255, 255, 255, 0.5)'
  },
})