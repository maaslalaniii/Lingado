import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2a3b4c',
  },
  scan: {
    color: '#fff',
    fontSize: 16,
    marginTop: 20
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
  },
  wrapper: {
    alignItems: 'center'
  },
  qr: {
    marginTop: 30
  },
  recentConnects: {
    marginTop: 40,
    marginBottom: 45,
    flex: 1
  },
  recentConnectsTitle: {
    color: '#aaa',
    marginBottom: 15,
    textAlign: 'center'
  }
})