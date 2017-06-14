import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { StyleSheet, Text, View, TextInput } from 'react-native'

export default class InformationInput extends React.Component {
  render() {
    return (
      <View style={styles.wrapper}>
        <Ionicons style={styles.icon} name={this.props.icon} size={22} />
        <TextInput style={styles.input}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          placeholder={this.props.placeholder}
          placeholderTextColor='rgba(255, 255, 255, 0.4)'
          underlineColorAndroid='transparent'
          autoCorrect={false}
          spellCheck={false}
          autoCapitalize='none'
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  icon: {
    color: 'rgba(255, 255, 255, 0.4)',
  },
  input: {
    color: 'rgba(255, 255, 255, 0.4)',
    width: 150,
    height: 50,
    fontSize: 18,
    textAlign: 'right'
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 200,
    justifyContent: 'space-between',
  }
})