/*
 * Text inputs for the login and signup screen.
 */

import React, { Component } from 'react'
import { TextInput, StyleSheet } from 'react-native'

import styles from './styles/input.styles'

export default class Input extends Component {
	render() {
		return (
			<TextInput
				{...this.props}
				style={styles.loginInformation}
				underlineColorAndroid='rgba(255, 255, 255, 0.4)'
				placeholderTextColor='rgba(255, 255, 255, 0.4)'
			/>
		)
	}
}