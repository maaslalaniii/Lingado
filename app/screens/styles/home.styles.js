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
  },
  profileView: {

  },
  profileEmail: {
    color: 'white',
    marginTop: 5
  },
  profileImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
    margin: 20
  },
  connectButton: {
    height: 50,
    width: 320,
    marginTop: 20,
    backgroundColor: '#203040',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nfcConnect: {
    color: '#C33C54',
    fontSize: 16
  },
  qrConnect: {
    color:'#8EE3EF',
    fontSize: 16
  }
})