import { StackNavigator } from 'react-navigation'
import { InformationScreen, HomeScreen, CustomizeCodeScreen, ContactsScreen } from './app/screens/'

export default Navigator = StackNavigator({
  Information: { screen: InformationScreen },
  Home: { screen: HomeScreen },
  CustomizeCode: { screen: CustomizeCodeScreen},
  Contacts: { screen: ContactsScreen }
})