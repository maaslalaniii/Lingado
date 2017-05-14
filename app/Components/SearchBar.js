import React from 'react'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default class SearchBar extends React.Component {
  render() {
    return (
      <TextInput style={styles.searchBar}
        {...this.props}
        maxLength={4}
        autoCorrect={false}
        spellCheck={false}
        autoCapitalize='none'
        returnKeyType={'search'}
        underlineColorAndroid='transparent'
        placeholder='code'
        placeholderTextColor='rgba(255, 255, 255, 0.4)'
      />
    )
  }
}

const styles = StyleSheet.create({
  searchBar: {
    width: 200,
    height: 44,
    fontSize: 18,
    alignSelf: 'center',
    color: 'rgba(255, 255, 255, 0.4)'
  }
})