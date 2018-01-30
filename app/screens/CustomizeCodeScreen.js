import React, { Component } from 'react'
import * as Animatable from 'react-native-animatable'
import { Constants } from 'expo'
import { View, Text, StyleSheet, TouchableOpacity, AsyncStorage, Vibration } from 'react-native'
import { SearchBar } from '../components'

export default class CustomizeCodeScreen extends Component {
  static navigationOptions = {
    header: null
  }

  constructor(props) {
    super(props)
    this.state = {
      code: '',
      editing: false
    }
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
          <TouchableOpacity style={styles.buttonFree} onPress={() => this.setState({ editing: true })}>
            <Text style={styles.buttonText}>Free Code</Text>
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

        <SearchBar onChangeText={code => this.setState({ code })} onBlur={this._updateCode.bind(this)} value={this.state.code} />

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

      // Get old information for code transfer
      fetch(`https://lingado-6b296.firebaseio.com/users/${this.props.navigation.state.params.code}.json`)
      .then(response => response.json())
      .then(user => {

        // Import the user information to the new code
        fetch(`https://lingado-6b296.firebaseio.com/users/${this.state.code}.json`, { method: 'PUT', headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }, body: JSON.stringify(user) })
        
        // Delete the information on the old code
        .then(response => fetch(`https://lingado-6b296.firebaseio.com/users/${this.props.navigation.state.params.code}.json`, { method: 'DELETE' }))
            
        // Set the new code as the device code and then go back to the information screen
        .then(response => AsyncStorage.setItem('code', this.state.code))
        .then(response => {
          
          // Pop all the screens and then navigate back to home with the new code
          const { navigate, goBack } = this.props.navigation
          goBack(null)
          goBack(null)
          navigate('Home', { code: this.state.code })

        })
      })
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
    paddingTop: Constants.statusBarHeight + 20,
  },
  heading: {
    fontSize: 44,
    color: '#eee'
  },
  text: {
    color: '#eee',
    paddingHorizontal: '15%',
    alignSelf: 'flex-start',
    marginVertical: '7.5%'
  },
  buttons: {
    flexDirection: 'row',
    marginVertical: '5%',
    marginHorizontal: '15%',
  },
  buttonFree: {
    backgroundColor: '#06ce97',
    borderRadius: 100,
    padding: 15,
    alignItems: 'center',
    flex: 1
  },
  buttonText: {
    color: '#eee',
    fontSize: 17,
  },
  codeWrapper: {
    position: 'absolute',
    bottom: '10%'
  },
  codeIntroduction: {
    color: '#999'
  },
  code: {
    fontSize: 64,
    color: 'rgba(255, 255, 255, 0.8)'
  }
})