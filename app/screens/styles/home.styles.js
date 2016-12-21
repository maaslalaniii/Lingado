import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a3b4c'
  },
  toolbar: {
    height: 56,
    backgroundColor: '#203040',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 10,
    paddingRight: 10
  },
  title: {
    color: 'white',
    fontSize: 22,
    marginLeft: 10
  },
  settings: {
    height: 36,
    width: 36,
  }
})