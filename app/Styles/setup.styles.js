import { StyleSheet } from 'react-native'
import { Constants } from 'expo'

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight + 40,
    backgroundColor: '#203040',
  },
  instructions: {
    backgroundColor: '#eee',
    marginVertical: 35,
    marginHorizontal: 20,
    paddingHorizontal: 40,
    paddingVertical: 50,
    justifyContent: 'center',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 40,
    paddingVertical: 5,
    color: '#203040'
  },
  subtitle: {
    fontSize: 20,
    padding: 5,
    color: '#203040'
  },
  text: {
    padding: 5,
    color: 'rgba(0, 0, 0, 0.5)'
  },
  continueButton: {
    marginTop: 30,
    padding: 18,
    borderRadius: 50,
    backgroundColor: '#06ce97',
    alignItems: 'center'
  },
  button: {
    width: 64,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#06ce97',
    borderRadius: 64,
    alignSelf: 'flex-end',
    margin: 35,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18
  },
  info: {
    flex: 1,
    alignItems: 'center'
  },
  mountains: {
    position: 'absolute',
    bottom: 0
  },
})