import React, { Component } from 'react'
import { AsyncStorage, TouchableOpacity, Modal, StyleSheet, Text, TextInput, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { User } from '../components'

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
      user: undefined
    }
  }

  componentDidMount() {
    this.setState({ code: this.props.navigation.state.params.code })
  }

  _search() {
    if (!this.state.text)
      return
    
    fetch(`https://lingado-6b296.firebaseio.com/users/${this.state.text}.json`)
    .then(response => response.json())
    .then(user => this.setState({ user, search: true }))
  }

  _displayUser(user) {
    return (
      <Modal animationType='slide' transparent={true} visible={this.state.search}>
        <View style={styles.userCard}>
          <User
            name={user.name}
            email={user.email ? user.email.length >= 14 ? user.email.split('@')[0] + '\n@' + user.email.split('@')[1] : user.email : ''}
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

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.code}>{this.props.navigation.state.params.code}</Text>

        <View style={styles.searchBarContainer}>
          <TextInput style={styles.searchBar}
            maxLength={4}
            autoCorrect={false}
            spellCheck={false}
            autoCapitalize='none'
            returnKeyType={'search'}
            underlineColorAndroid='transparent'
            placeholder='code'
            placeholderTextColor='rgba(255, 255, 255, 0.4)'
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
            onBlur={this._search.bind(this)} />
          <Ionicons onPress={this._search.bind(this)} style={styles.icon} name='md-search' size={20} color="rgba(255, 255, 255, 0.4)" />
        </View>

        {
          this.state.user
          ? this._displayUser(this.state.user)
          : ( 
            <View style={styles.homeContainer}>
              <View>
                <Text style={styles.searchInstructions}>Search for users by their code. {this.props.navigation.state.params.code} is your code.</Text>
                <TouchableOpacity style={styles.customCodeContainer} onPress={() => this.props.navigation.navigate('CustomizeCode', { code: this.props.navigation.state.params.code })}>
                  <Text style={styles.customCodeButton}>Get a custom code</Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity style={styles.editInformationButton} onPress={() => this.props.navigation.goBack()}>
                <Text>Edit Your Information</Text>
              </TouchableOpacity>              
            </View>
          )
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
    paddingTop: Constants.statusBarHeight + 20
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'space-between'
  },
  code: {
    fontSize: 64,
    marginTop: 30,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  searchBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.8)',
    marginVertical: '7.5%',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5
  },
  searchBar: {
    width: 200,
    height: 44,
    fontSize: 18,
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.4)'
  },
  searchInstructions: {
    marginTop: 30,
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
    marginBottom: '15%'
  },
  customCodeButton: {
    color: '#eee',
  },
  customCodeContainer: {
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
  }
})