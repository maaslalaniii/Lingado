import { Navigator } from 'react-native'
import React from 'react'
import Home from './app/Screens/Home'
import Setup from './app/Screens/Setup'
import CustomCode from './app/Screens/CustomCode'

import Expo from 'expo'

class App extends React.Component {
  _renderScene(route, navigator) {
    switch(route.title) {

      case 'Setup':
        return <Setup navigator={navigator} />
        break

      case 'Home':
        return <Home navigator={navigator} code={route.code} />
        break

      case 'WatchAd':
        return <CustomCode navigator={navigator} code={route.code} />
        break
    }
  }

  render() {
    return (
      <Navigator
        configureScene={route => Navigator.SceneConfigs.PushFromRight}
        initialRoute={{ title: 'Setup' }}
        renderScene={this._renderScene.bind(this)}
      />
    )
  }
}

Expo.registerRootComponent(App)
