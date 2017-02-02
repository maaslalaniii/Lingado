import { StyleSheet } from 'react-native'

module.exports = StyleSheet.create({
  recentConnect: {
    height: 140,
    width: 320,
    flex: 1,
    margin: 10,
    backgroundColor: '#203040',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  recentConnectImageContainer: {
    flex: 1,
    alignItems: 'center'
  },
  recentConnectImage: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
  recentConnectName: {
    color: 'white',
    margin: 10
  },
  recentConnectInfo: {
    flex: 1,
  },
  recentConnectActions: {
    flexDirection: 'row',
  },
  recentConnectAction: {
    margin: 10
  },
  recentConnectAccept: {
    color: '#2ecc71'
  },
  recentConnectReject: {
    color: '#e74c3c'
  },
  resultContainer: {
    margin: 10
  },
  resultAccepted: {
    color: '#2ecc71'
  },
  resultRejected: {
    color: '#e74c3c'
  }
})