import React, { Component } from 'react'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { AsyncStorage, StyleSheet, View, Text, TouchableOpacity, Modal, Image } from 'react-native'

import User from '../Components/User'
import SearchBar from '../Components/SearchBar'

export default class Home extends Component {

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      showUser: false,
      text: '',
      user: null
    }
  }

  componentDidMount() {
    this.setState({ code: this.props.code })
  }

  _search() {
    if (!this.state.text)
      return

    fetch(`https://lingado-6b296.firebaseio.com/users/${this.state.text}.json`)
      .then(response => response.json())
      .then(response => this.setState({ user: response, showUser: true }))
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

        <Text style={styles.code}>{this.props.code}</Text>

        <View style={styles.search}>

          <SearchBar
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onBlur={() => this._search()}
          />

          <Ionicons onPress={() => this._search()} style={styles.icon} name='md-search' size={20} color="rgba(255, 255, 255, 0.4)" />

        </View>


        {
          this.state.user
          ? this._displayUser(this.state.user)
          : <View style={styles.wrapper}>
              <View>
                <Text style={styles.instructions}>Search for users by their code. {this.props.code} is your code.</Text>
                <TouchableOpacity style={styles.customContainer} onPress={() => this.props.navigator.push({ title: 'CustomCode', code: this.props.code })}>
                  <Text style={styles.custom}>Get a custom code</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.settings} onPress={() => this.props.navigator.pop()}>
                <Text>Edit Your Information</Text>
              </TouchableOpacity>              
            </View>
        }

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203040',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 20,
  },
  search: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: '7.5%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  instructions: {
    marginTop: 30,
    width: 200,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  star: {
    alignSelf: 'flex-end',
    marginRight: 60
  },
  code: {
    fontSize: 64,
    marginTop: 30,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  searchBar: {
    width: 200,
    height: 44,
    fontSize: 18,
    alignSelf: 'center'
  },
  settings: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 100,
    padding: 15,
    alignItems: 'center',
    marginBottom: '15%'
  },
  userCard: {
    backgroundColor: '#eee',
    marginVertical: '7.5%',
    marginHorizontal: '5%',
    paddingHorizontal: '12.5%',
    paddingVertical: '10%',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'space-around',
  },
  custom: {
    color: '#eee',
  },
  customContainer: {
    paddingVertical: 20
  },
  dismiss: {
    padding: 16,
    borderRadius: 50,
    backgroundColor: '#06ce97',
    alignItems: 'center',
  },  
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  wrapper: {
    flex: 1,
    justifyContent: 'space-between'
  },

})
