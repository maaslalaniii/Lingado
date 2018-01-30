import React, { Component } from 'react'
import { View, Text, StyleSheet, TextInput } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

export default class SearchBar extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <View style={styles.searchBarContainer}>
        <TextInput 
          {...this.props}  
          style={styles.searchBar}
          maxLength={4}
          autoCorrect={false}
          spellCheck={false}
          autoCapitalize='none'
          returnKeyType={'search'}
          underlineColorAndroid='transparent'
          placeholder='code'
          placeholderTextColor='rgba(255, 255, 255, 0.4)' />
        <Ionicons
          style={styles.icon}
          name='md-search'
          size={20}
          color="rgba(255, 255, 255, 0.4)" />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  searchBarContainer: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.8)',
    marginTop: 25,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
  },
  searchBar: {
    width: 200,
    height: 44,
    fontSize: 18,
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.4)'
  }
})
