/*
 * Module to connect to firebase.
 */

import * as firebase from 'firebase'

const config = {
	apiKey: "AIzaSyD2Vbn3b56NXs8LXgo30lwBGjY8kqsUUws",
	authDomain: "lingado-6b296.firebaseapp.com",
	databaseURL: "https://lingado-6b296.firebaseio.com",
	storageBucket: "lingado-6b296.appspot.com"
}

module.exports = firebase.initializeApp(config)
