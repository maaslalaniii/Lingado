import { Navigator } from 'react-native'
import React from 'react'
import Home from './app/Screens/Home'
import Setup from './app/Screens/Setup'
import Expo from 'expo'

const routes = [
  { title: 'Setup', index: 0 },
  { title: 'Home', index: 1 },
]


class App extends React.Component {
  _renderScene(route, navigator) {
    switch(route.title) {

      case 'Setup':
        return <Setup routes={routes} navigator={navigator} />
        break

      case 'Home':
        return <Home routes={routes} navigator={navigator} />
        break
    }
  }

  render() {
    return (
      <Navigator
        configureScene={(route) => Navigator.SceneConfigs.PushFromRight}
        initialRoute={routes[0]}
        initialRouteStack={routes}
        renderScene={this._renderScene.bind(this)}
      />
    )
  }
}

Expo.registerRootComponent(App)
