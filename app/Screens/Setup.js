import React from 'react'
import { Constants } from 'expo'
import { Ionicons } from '@expo/vector-icons'
import {
  AsyncStorage,
  Image,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
  Modal
} from 'react-native'

import InformationInput from '../Components/InformationInput'

export default class Setup extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      welcome: false,
      code: undefined,
      name: '',
      email: '',
      phone: '',
      facebook: '',
      instagram: '',
      linkedin: '',
      twitter: '',
      snapchat: '',
    }
  }

  componentDidMount() {
    AsyncStorage.getItem('code')
      .then(code => {

        if (!code) {
          code = this._generateCode()
          this.setState({ code })
          AsyncStorage.setItem('code', code)
        }

        else {
          this.setState({ code })
          this.props.navigator.push({ title: 'Home', code: this.state.code })
          fetch(`https://lingado-6b296.firebaseio.com/users/${this.state.code}.json`)
            .then(response => response.json())
            .then(user => this.setState({
              name: user.name,
              email: user.email,
              phone: user.phone,
              facebook: user.facebook,
              instagram: user.instagram,
              linkedin: user.linkedin,
              twitter: user.twitter,
              snapchat: user.snapchat
            }))
        }

      })
  }

  _submitInformation() {
    AsyncStorage.getItem('code')
      .then(code => {
        this.setState({ code })

        this.props.navigator.push({ title: 'Home', code: this.state.code })

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
            snapchat: this.state.snapchat
          })
        }).then(response => console.log(response))
    })

  }

  _generateCode() {
    return Math.random().toString(36).substr(2, 4)
  }

  render() {
    return (
      <View style={styles.container}>

        <Modal visible={this.state.welcome} transparent={true} animationType={'slide'}>
          <View style={styles.instructions}>
            <View>
              <Text style={styles.title}>Welcome to Lingado!</Text>
              <Text style={styles.subtitle}>An app that changes the way you network.</Text>
            </View>
            <View>
              <Text style={styles.text}>To get started enter your contact information on the next screen and press the button to continue.</Text>
              <Text style={styles.text}>You'll get a 4 digit code to give to others so they can see your information, like a virtual business card.</Text>
              <Text style={styles.text}>You can also search for others using their 4 digit code.</Text>
            </View>
            <TouchableOpacity style={styles.continueButton} onPress={() => this.setState({welcome: false})}>
              <Text style={styles.buttonText}>Let's go</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        <Image style={styles.mountains} source={require('../Assets/mountains.png')} />
        
        <View style={styles.info}>

          <InformationInput
            icon='md-person'
            onChangeText={name => this.setState({ name })}
            value={this.state.name}
            placeholder='Name' />

          <InformationInput
            icon='md-mail'
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
            placeholder='Email' />

          <InformationInput
            icon='ios-call'
            onChangeText={phone => this.setState({ phone })}
            value={this.state.phone}
            placeholder='Phone Number' />

          <InformationInput
            icon='logo-facebook'
            onChangeText={facebook => this.setState({ facebook })}
            value={this.state.facebook}
            placeholder='Facebook' />

          <InformationInput
            icon='logo-instagram'
            onChangeText={instagram => this.setState({ instagram })}
            value={this.state.instagram}
            placeholder='Instagram' />

          <InformationInput
            icon='logo-linkedin'
            onChangeText={linkedin => this.setState({ linkedin })}
            value={this.state.linkedin}
            placeholder='Linkedin' />

          <InformationInput
            icon='logo-twitter'
            onChangeText={twitter => this.setState({ twitter })}
            value={this.state.twitter}
            placeholder='Twitter' />

          <InformationInput
            icon='logo-snapchat'
            onChangeText={snapchat => this.setState({ snapchat })}
            value={this.state.snapchat}
            placeholder='Snapchat' />

        </View>

        <View style={styles.wrapper}>

          <TouchableOpacity onPress={() => this.setState({ welcome: true })} style={styles.getStartedButto}>
            <Text style={styles.getStarted}>Need help?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => this._submitInformation()} style={styles.button}>
            <Ionicons name="ios-arrow-round-forward" size={45} color="white" />
          </TouchableOpacity>

        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 40,
    backgroundColor: '#203040',
  },
  instructions: {
    backgroundColor: '#eee',
    marginVertical: '7.5%',
    marginHorizontal: '5%',
    paddingHorizontal: '12.5%',
    paddingVertical: '12.5%',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'space-between',
  },
  getStarted: {
    color: '#fff',
    backgroundColor: 'transparent'
  },
  logo: {
    width: 100,
    height: 100,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'stretch',
    justifyContent: 'space-between',
    paddingHorizontal: '10%',
    paddingVertical: 35
  },
  title: {
    fontSize: 40,
    paddingVertical: 5,
    color: '#203040',
  },
  subtitle: {
    fontSize: 20,
    padding: 5,
    color: '#203040',
  },
  text: {
    padding: 5,
    color: 'rgba(0, 0, 0, 0.5)',
  },
  continueButton: {
    marginTop: 30,
    padding: 18,
    borderRadius: 50,
    backgroundColor: '#06ce97',
    alignItems: 'center',
  },
  button: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06ce97',
    borderRadius: 64,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  info: {
    flex: 1,
    alignItems: 'center',
  },
  mountains: {
    position: 'absolute',
    bottom: 0,
  },
})