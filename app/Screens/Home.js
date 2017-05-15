import React from 'react'
import * as Animatable from 'react-native-animatable'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import {
  AsyncStorage,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Modal,
} from 'react-native'

import styles from '../Styles/home.styles'
import User from '../Components/User'
import SearchBar from '../Components/SearchBar'

export default class Home extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      code: undefined,
      showUser: false,
      text: '',
      user: null
    }
  }

  componentWillMount() {
    AsyncStorage.getItem('code')
      .then(code => this.setState({ code }))
  }

  _search() {
    fetch('https://lingado-6b296.firebaseio.com/users.json')
      .then(response => response.json())
      .then(response => this.setState({ user: response[this.state.text], showUser: true }))
  }


  _displayUser(user) {
    return (
      <Modal animationType='slide' transparent={true} visible={this.state.showUser}>
        <View style={styles.userCard}>
          <User
            name={user.name}
            email={user.email.length >= 14 ? user.email.split('@')[0] + '\n@' + user.email.split('@')[1] : user.email}
            phone={user.phone}
            twitter={user.twitter}
            facebook={user.facebook}
            instagram={user.instagram}
            linkedin={user.linkedin} 
            snapchat={user.snapchat}
          />
          <TouchableOpacity style={styles.dismiss} onPress={() => this.setState({ showUser: false, text: '', user: undefined })}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.code}>{this.state.code}</Text>

        <View style={styles.search}>

          <SearchBar
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onBlur={() => this._search()}
          />

          <Ionicons style={styles.icon} name='md-search' size={20} color="rgba(255, 255, 255, 0.4)" />

        </View>

        {
          this.state.user
          ? this._displayUser(this.state.user)
          : <View style={styles.wrapper}>
              <Text style={styles.instructions} >Search for users by their code. {this.state.code} is your code.</Text>
              <TouchableOpacity style={styles.settings} onPress={() => this.props.navigator.pop()}>
                <Text>Edit Your Information</Text>
              </TouchableOpacity>
            </View>
        }

      </View>
    )
  }
}