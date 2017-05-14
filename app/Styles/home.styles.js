import { StyleSheet } from 'react-native'
import { Constants } from 'expo'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#203040',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
  },
  search: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.8)',
    marginTop: 40,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 5,
    paddingRight: 5,
    margin: 25
  },
  instructions: {
    marginTop: 30,
    width: 200,
    color: 'rgba(255, 255, 255, 0.5)',
  },
  star: {
    alignSelf: 'flex-end',
    marginRight: 60
  },
  code: {
    fontSize: 64,
    marginTop: 30,
    color: 'rgba(255, 255, 255, 0.8)'
  },
  searchBar: {
    width: 200,
    height: 44,
    fontSize: 18,
    alignSelf: 'center'
  },
  settings: {
    // width: 200,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 100,
    padding: 15,
    marginTop: 50,
    alignItems: 'center',
  }

})
