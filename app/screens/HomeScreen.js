import React, { Component } from 'react'
import { AsyncStorage, TouchableOpacity, Modal, StyleSheet, Text, View } from 'react-native'
import { Constants } from 'expo'
import { User, SearchBar } from '../components'
import { Ionicons } from '@expo/vector-icons'

export default class HomeScreen extends Component {  
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      text: '',
      search: false,
      user: undefined,
      icon: undefined,
      favourite: false
    }
  }
  
  componentDidMount() {
    this.setState({
      code: this.props.navigation.state.params.code,
      icon: require('../../assets/icon.png')
    })
  }

  _saveContact(code, name) {
    if (code == this.props.navigation.state.params.code) {
      return alert(`You cannot add yourself as a contact`)
    }

    if (this.state.favourite) {
      return alert(`${name} is already in your contacts`)
    }

    this.setState({ favourite: true })
    
    AsyncStorage.getItem('contacts')
    .then(contacts => {
      contacts = JSON.parse(contacts)
      if (!contacts) {
        contacts = {}
        contacts[code] = name
      } else {
        contacts[code] = name
      }
      AsyncStorage.setItem('contacts', JSON.stringify(contacts))
      .then(() => alert(`${name} was added to your contacts.`))
    })
  }

  _isFavourited(code) {
    AsyncStorage.getItem('contacts')
    .then(contacts => {
      if (!contacts) return

      contacts = JSON.parse(contacts)
      if (contacts[code]) {
        this.setState({ favourite: true })
      }
    })
  }

  _search() {
    if (!this.state.text)
      return
    
    fetch(`https://lingado-6b296.firebaseio.com/users/${this.state.text}.json`)
    .then(response => response.json())
    .then(user => {
      if (!user) return alert(`User not found`)
      this._isFavourited(user.code)
      this.setState({ user, search: true })
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
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.dismiss} onPress={() => this.setState({ search: false, text: '', user: undefined, favourite: false })}>
              <Text style={styles.buttonText}>Done</Text>
            </TouchableOpacity>
            {
              this.state.code != this.state.text ? (
                <TouchableOpacity style={styles.save} onPress={() => this._saveContact(user.code, user.name)}>
                <Ionicons name={this.state.favourite ? 'md-heart' : 'md-heart-outline'} color='#FE5F55' size={30} />
                </TouchableOpacity>
              ) : ( <View></View> )
            }
          </View>
        </View>
      </Modal>     
    )
  }

  _displayHome() {
    return (
      <View style={styles.homeContainer}>
        <View>
          <Text style={styles.searchInstructions}>Search for users by their code. {this.props.navigation.state.params.code} is your code.</Text>
          <TouchableOpacity style={styles.navigationContainer} onPress={() => this.props.navigation.navigate('CustomizeCode', { code: this.props.navigation.state.params.code })}>
            <Text style={styles.navigationButton}>Get a custom code</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navigationContainer} onPress={() => this.props.navigation.navigate('Contacts', { code: this.props.navigation.state.params.code, icon: this.state.icon })}>
            <Text style={styles.navigationButton}>View your contacts</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.editInformationButton} onPress={() => this.props.navigation.goBack()}>
          <Text>Edit Your Information</Text>
        </TouchableOpacity>              
      </View>
    )
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.code}>{this.props.navigation.state.params.code}</Text>

        <SearchBar
          onChangeText={text => this.setState({ text })}
          onBlur={() => this._search()}
          value={this.state.text} />

        {
          this.state.user
          ? this._displayUser(this.state.user)
          : this._displayHome()
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
    paddingTop: Constants.statusBarHeight + 40,
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingVertical: '15%'
  },
  code: {
    fontSize: 64,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  searchInstructions: {
    width: 200,
    color: 'rgba(255, 255, 255, 0.5)'
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
  editInformationButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 100,
    padding: 15,
    alignItems: 'center',
  },
  navigationButton: {
    color: '#eee',
    fontSize: 16,
  },
  navigationContainer: {
    paddingTop: 25
  },
  buttonsContainer: {
    flexDirection: 'row',
  },
  dismiss: {
    padding: 16,
    flex:1,
    borderRadius: 50,
    backgroundColor: '#06ce97',
    alignItems: 'center',
  },
  save: {
    paddingRight: 0,
    paddingLeft: 16,
    paddingVertical: 8,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  }
})