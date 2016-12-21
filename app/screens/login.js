import React, { Component } from 'react'
import { View, StyleSheet, TextInput, Image, TouchableOpacity, Text, StatusBar } from 'react-native'

import Input from '../components/input'
import firebase from '../modules/firebase'

export default class Login extends Component {

	constructor(props) {
		super(props)
		this.state = {
			email: '',
			password: '',
			confirmPassword: '',
			accountActionSignup: false
		}
	}

	_login() {
		firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => this._handleError(error))
			.then(() => {
				if (firebase.auth().currentUser) {
					this.props.navigator.push(this.props.routes[1])
				}
			})
		}


	_signup() {
		// Ensure that the passwords match, if so create a new user
		if (this.state.password !== this.state.confirmPassword) {
			alert('Passwords don\'t match!')
			return
		}

		firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
			.catch((error) => this._handleError(error))
			.then(() => this._login())
	}

	_renderLogin() {
		return (
			<View style={styles.wrapper}>
				<TouchableOpacity style={styles.loginButton} onPress={() => this._login(this.props.navigator, this.props.routes)}>
					<Text>Log in</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.setState({ accountActionSignup: true })}>
					<Text style={styles.accountActionSignup}>need an account?</Text>
				</TouchableOpacity>
			</View>
		)
	}

	_renderSignup() {
		return (
			<View style={styles.wrapper}>
				<Input onChangeText={(confirmPassword) => this.setState({ confirmPassword })} value={this.state.confirmPassword} placeholder='confirm your password' secureTextEntry={true} />

				<TouchableOpacity style={styles.loginButton} onPress={() => this._signup(this.props.navigator, this.props.routes)}>
					<Text>Sign up</Text>
				</TouchableOpacity>

				<TouchableOpacity onPress={() => this.setState({ accountActionSignup: false })}>
					<Text style={styles.accountActionSignup}>already have an account?</Text>
				</TouchableOpacity>
			</View>
		)
	}

	_handleError(error) {
		switch (error.code) {
			case 'auth/email-already-in-use':
				alert('This email is already in use. Try signing in?')
				this.setState({ accountActionSignup: false })
				break

			case 'auth/invalid-email':
				alert('Please try again with a valid email.')
				break

			case 'auth/operation-not-allowed':
				alert('Something went wrong. Unable to create your account.')
				break

			case 'auth/weak-password':
				alert('Your password is too weak. Try a more secure one.')
				this.setState({ password: '', confirmPassword: '' })
				break

			case 'auth/user-not-found':
				alert('Your email was not found. Maybe it was spelt incorrectly?')
				break

			default:
				alert('Something went wrong. Please check that you filled out the fields correctly.')
				break
		}
	}

	render() {
		return (
			<View style={styles.container}>

				<StatusBar backgroundColor='#203040' barStyle='light-content' />

				<Image style={styles.logo} source={require('../images/logo.png')} />

				<Input onChangeText={(email) => this.setState({ email })} value={this.state.email} placeholder='your email address' />

				<Input onChangeText={(password) => this.setState({ password })} value={this.state.password} placeholder='your password' secureTextEntry={true} />

				{this.state.accountActionSignup ? this._renderSignup() : this._renderLogin()}

				<Image source={require('../images/mountains.png')} />

			</View>
		)
	}
>>>>>>> a35b1f43e906421cd403b9a7e26df315778ff721
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#203040'
  },
  logo: {
    marginTop: 40,
    marginBottom: 20,
    height: 126,
    width: 147
  },
  loginButton: {
    backgroundColor: 'white',
    borderRadius: 100,
    paddingLeft: 135,
    paddingRight: 135,
    paddingTop: 15,
    paddingBottom: 15,
    marginTop: 30
  },
  accountActionSignup: {
    color: 'rgba(255, 255, 255, 0.6)',
    fontSize: 12,
    marginTop: 10
  },
  wrapper: {
    alignItems: 'center'
  }
})
