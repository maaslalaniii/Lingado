import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { StackNavigator } from 'react-navigation'
import { InformationScreen, HomeScreen, CustomizeCodeScreen } from './app/screens/'

export default Navigator = StackNavigator({
  Information: { screen: InformationScreen },
  Home: { screen: HomeScreen },
  CustomizeCode: { screen: CustomizeCodeScreen}
})


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203040',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
