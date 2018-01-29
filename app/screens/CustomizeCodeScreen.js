import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import { Constants } from 'expo'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage } from 'react-native'
import { SearchBar } from '../components'

export default class CustomizeCodeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      editing: false,
      user: null
    }
  }

  componentWillMount() {
    fetch(`https://lingado-6b296.firebaseio.com/users/${this.props.navigation.state.params.code}.json`)
    .then(response => response.json())
    .then(user => this.setState({ user }))
  }

  _paymentOption() {
    return (
      <View style={styles.container}>
        
        <Text style={styles.heading}>Custom Codes</Text>
        <Text style={styles.text}>
          If you use Lingado a lot, then you will want to get a custom code. Your custom code can be any 4-digit alpha-numeric code as long as it has not been taken.
          The first thousand users of Lingado get a free custom code for being an early supporter.
        </Text>        
        <View style={styles.buttons}>
        
          <TouchableOpacity style={styles.free} onPress={() => this.setState({ editing: true })}>
            <Text>Free Code</Text>
          </TouchableOpacity>
        
        </View>

        <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={styles.codeWrapper}>
          <Text style={styles.codeIntroduction}>Keep current code:</Text>        
          <Text style={styles.code}>{this.props.navigation.state.params.code}</Text>
        </TouchableOpacity>
      
      </View>
    )
  }

  _customizeCode() {
    return (
      <Animatable.View style={styles.container} animation="fadeInUp" duration={500}>

        <Text style={styles.heading}>Thank you!</Text>
        <Text style={styles.text}>Enter the code you would like to have.</Text>
        <Text style={styles.text}>If you want to keep your code swipe from Left to Right to go back.</Text>

        <SearchBar onChangeText={code => this.setState({ code })} search={this._updateCode.bind(this)} value={this.state.code} />

      </Animatable.View>
    )
  }

  _updateCode() {
    fetch(`https://lingado-6b296.firebaseio.com/users/${this.state.code}.json`)
    .then(response => response.json())
    .then(response => {
      // Make sure code is not in use
      if (response != null)
        return alert('This code is taken, please try another.')
        
      // Import the user information to the new code
      fetch(`https://lingado-6b296.firebaseio.com/users/${this.state.code}.json`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.user)
      })
      
      // Delete the information on the old code
      .then(response => fetch(`https://lingado-6b296.firebaseio.com/users/${this.props.navigation.state.params.code}.json`, { method: 'DELETE' }))
        
      // Set the new code as the device code and then go back to the information screen
      .then(response => AsyncStorage.setItem('code', this.state.code)
      .then(response => {
        // Pop all the screens and then navigate back to home with the new code
        const { navigate, goBack } = this.props.navigation
        goBack(null)
        goBack(null)
        navigate('Home', { code: this.state.code })
      }))
    })
  }


  render() {
    return (
      <View style={styles.container}>

        { !this.state.editing 
          ? this._paymentOption()
          : this._customizeCode()
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
    paddingTop: Constants.statusBarHeight,
  },
  heading: {
    marginTop: 50,
    marginBottom: 30,
    fontSize: 44,
    color: '#eee'
  },
  text: {
    color: '#eee',
    paddingHorizontal: '15%',
    alignSelf: 'flex-start',
    marginBottom: 10, 
  },
  buttons: {
    flexDirection: 'row',
    marginTop: '10%',
    marginHorizontal: '15%',
  },
  free: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 100,
    padding: 15,
    alignItems: 'center',
    flex: 1
  },
  codeWrapper: {
    marginTop: 100,
    flex: 1,
  },
  codeIntroduction: {
    color: '#999'
  },
  code: {
    fontSize: 64,
    color: 'rgba(255, 255, 255, 0.8)'
  }
})