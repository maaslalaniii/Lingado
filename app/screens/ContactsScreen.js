import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Modal, AsyncStorage } from 'react-native'
import { User } from '../components'
import { Constants } from 'expo'

export default class ContactsScreen extends Component {
  static navigationOptions = {
    header: null,
  }

  constructor(props) {
    super(props)
    this.state = {
      user: undefined,
      search: false,
      contacts: {}
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('contacts')
    .then(contacts => {
      if (!contacts) return
      contacts = JSON.parse(contacts)
      this.setState({ contacts })
      console.log(this.state.contacts)
    })
  }

  _displayUser(user) {
    return (
      <Modal animationType='slide' transparent={true} visible={this.state.search}>
        <View style={styles.userCard}>
          <User
            name={user.name}
            email={user.email
              ? user.email.length >= 14
                ? user.email.split('@')[0] + '\n@' + user.email.split('@')[1]
                : user.email
              : '' }
            phone={user.phone}
            twitter={user.twitter}
            facebook={user.facebook}
            instagram={user.instagram}
            linkedin={user.linkedin} 
            snapchat={user.snapchat}
          />
          <TouchableOpacity style={styles.dismiss} onPress={() => this.setState({ search: false, text: '', user: undefined })}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </Modal>     
    )
  }

  _removeContact(code) {    
    AsyncStorage.getItem('contacts')
    .then(contacts => {
      contacts = JSON.parse(contacts)
      delete contacts[code]
      this.setState({ contacts })
      AsyncStorage.setItem('contacts', JSON.stringify(contacts))
    })
  }

  _search(code) {
    fetch(`https://lingado-6b296.firebaseio.com/users/${code}.json`)
    .then(response => response.json())
    .then(user => {
      if (!user) {
        alert(`This user has either deleted their account or changed their code. They have been removed from your contacts.`)
        this._removeContact(code)
        return
      } 
      this.setState({ user, search: true })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
        <Image style={styles.headerLogo} source={this.props.navigation.state.params.icon} />
        <Text style={styles.headerTitle}>Contacts</Text>
        </View>
        <ScrollView>
          {
            this.state.contacts ? (
              Object.keys(this.state.contacts).map((code, i) => {
                return (
                  <TouchableOpacity onPress={() => this._search(code)} style={styles.contactContainer} key={i}>
                    <Text style={styles.contactCode}>{code}</Text>
                    <Text style={styles.contactText}>{this.state.contacts[code]}</Text>
                  </TouchableOpacity>
                  )
                })
            ) : (
            <TouchableOpacity onPress={() => this._search('maas')} style={styles.contactContainer}>
              <Text style={styles.contactCode}>maas</Text>
              <Text style={styles.contactText}>Hello, I am the developer of Lingado!</Text>
            </TouchableOpacity>
            ) 
          }
        </ScrollView>
        { this.state.user ? this._displayUser(this.state.user) : <View></View> }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203040',
    paddingTop: Constants.statusBarHeight,
    paddingLeft: '10%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: '10%'
  },
  headerLogo: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  headerTitle: {
    fontSize: 44,
    color: '#eee',
    marginLeft: 10
  },
  contactCode: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 32,
    fontFamily: 'Menlo-Regular',
  },
  contactText: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 18,
    paddingBottom: '10%',
  },
  userCard: {
    backgroundColor: '#eee',
    marginVertical: '7.5%',
    marginHorizontal: '5%',
    paddingHorizontal: '12.5%',
    paddingVertical: '10%',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'space-around'
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
  }
})