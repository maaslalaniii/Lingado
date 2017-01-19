import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
  container: {
    backgroundColor: '#203040',
    alignItems: 'center',
    flex: 1
  },
  icons: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  instructions: {
    color: 'gray',
    textAlign: 'left',
    margin: 10
  },
  settings: {
    width: 200,
    height: 200,
  },
  continueButton: {
    width: 200,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: 20,
    margin: 80
  }
})
