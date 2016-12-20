import React, { Component } from 'react'
import { Navigator } from 'react-native'

import Login from './login'
import Setup from './setup'
import Home from './home'
import Settings from './settings'

const routes = [
	{ title: 'Login', index: 0 },
	{ title: 'Setup', index: 1 },
	{ title: 'Home', index: 2 },
	{ title: 'Settings', index: 3 }
]

export default class App extends Component {
	_renderScene(route, navigator) {
		switch (route.title) {
			case 'Login':
				return <Login routes={routes} navigator={navigator} />
				break

			case 'Setup':
				return <Setup routes={routes} navigator={navigator} />
				break

			case 'Home':
				return <Home routes={routes} navigator={navigator} />
				break

			case 'Settings':
				return <Settings routes={routes} navigator={navigator} />
				break
		}
	}

	render() {
		return (
			<Navigator
				configureScene={() => Navigator.SceneConfigs.PushFromRight}
				initialRoute={routes[0]}
				initialRouteStack={routes}
				renderScene={this._renderScene.bind(this)}
				/>
		)
	}
}