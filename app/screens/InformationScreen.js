import React, { Component } from 'react'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Keyboard, Text, View, TouchableOpacity, TouchableWithoutFeedback, AsyncStorage, Image, Modal, TextInput } from 'react-native'
import { Instructions } from '../components'

export default class InformationScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      instructions: false,
      name: '',
      email: '',
      phone: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      snapchat: '',
      code: undefined
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('code')
    .then(code => {
      if (!code) {
        this.setState({ code: Math.random().toString(36).substr(2, 4) })
        AsyncStorage.setItem('code', this.state.code)
      } else {
        this.setState({ code })
        this.props.navigation.navigate('Home', { code })
        fetch(`https://lingado-6b296.firebaseio.com/users/${code}.json`)
        .then(response => response.json())
        .then(user => this.setState({ 
          code: user.code,
          name: user.name,
          email: user.email,
          phone: user.phone,
          facebook: user.facebook,
          instagram: user.instagram,
          linkedin: user.linkedin,
          twitter: user.twitter,
          snapchat: user.snapchat,
        }))
      }
    })
  }

  _submit() {
    AsyncStorage.getItem('code')
    .then(code => {
      this.setState({ code })
      this.props.navigation.navigate('Home', { code })
      fetch(`https://lingado-6b296.firebaseio.com/users/${this.state.code}.json`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          code: this.state.code,
          name: this.state.name,
          email: this.state.email,
          phone: this.state.phone,
          facebook: this.state.facebook,
          instagram: this.state.instagram,
          linkedin: this.state.linkedin,
          twitter: this.state.twitter,
          snapchat: this.state.snapchat,
        })
      })
    })
  }

  _toggleInstructions() {
    this.setState({ instructions: !this.state.instructions })
  }

  render() {
    const contactInformation = [
      { title: 'Name', icon: 'md-person', onChangeText: name => this.setState({ name }) },
      { title: 'Email', icon: 'md-mail', onChangeText: email => this.setState({ email }) },
      { title: 'Phone', icon: 'md-call', onChangeText: phone => this.setState({ phone }) },
      { title: 'Facebook', icon: 'logo-facebook', onChangeText: facebook => this.setState({ facebook }) },
      { title: 'Instagram', icon: 'logo-instagram', onChangeText: instagram => this.setState({ instagram }) },
      { title: 'LinkedIn', icon: 'logo-linkedin', onChangeText: linkedin => this.setState({ linkedin }) },
      { title: 'Twitter', icon: 'logo-twitter', onChangeText: twitter => this.setState({ twitter }) },
      { title: 'Snapchat', icon: 'logo-snapchat', onChangeText: snapchat => this.setState({ snapchat }) }
    ]
    
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Image style={styles.mountains} source={require('../../assets/mountains.png')} />

          {
            contactInformation.map((contact, i) => (
              <View style={styles.textInputContainer} key={i}>
                <Ionicons style={styles.textInputIcon} name={contact.icon} size={22} />
                <TextInput style={styles.textInput}
                  onChangeText={contact.onChangeText}
                  value={this.state[contact.title.toLowerCase()]}
                  placeholder={contact.title}
                  placeholderTextColor='rgba(255, 255, 255, 0.4)'
                  underlineColorAndroid='transparent'
                  autoCorrect={false}
                  spellCheck={false}
                  autoCapitalize='none' />
              </View>
            ))
          }

          <Instructions visible={this.state.instructions} onPress={this._toggleInstructions.bind(this)} />
          
          <View style={styles.actionsContainer}>
          
            <TouchableOpacity onPress={this._toggleInstructions.bind(this)}>
              <Text style={styles.instructionsShowButton}>Need Help?</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.submitButton} onPress={this._submit.bind(this)}>
              <Ionicons name='ios-arrow-round-forward' size={45} color='white' />
            </TouchableOpacity>
          
          </View>
          
        </View>
      </TouchableWithoutFeedback>      
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight + 40,
    backgroundColor: '#203040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitButton: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06ce97',
    borderRadius: 64,
  },
  actionsContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: '10%',
    paddingTop: '20%',
    paddingHorizontal: '10%',
    alignSelf: 'stretch'
  },
  mountains: {
    position: 'absolute',
    bottom: 0,
  },
  informationInput: {
    height: 40,
    width: 200,
    backgroundColor: 'white'
  },
  textInputIcon: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  textInput: {
    color: 'rgba(255, 255, 255, 0.5)',
    height: 50,
    width: 125,
    fontSize: 18,
    textAlign: 'right'
  },
  textInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    width: '65%',
    justifyContent: 'space-between',
  },
  instructionsShowButton: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 16
  }, 
})