import React, { Component } from 'react'
import { View, Modal, Text, TouchableOpacity, StyleSheet } from 'react-native'

export default class Instructions extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Modal visible={this.props.visible} transparent={true} animationType={'slide'}>
      <View style={styles.instructionsContainer}>
        <View>
          <Text style={styles.instructionsTitle}>Welcome to Lingado!</Text>
          <Text style={styles.instructionsSubtitle}>An app that changes the way you network.</Text>
        </View>
        <View>
          <Text style={styles.instructionsText}>To get started enter your contact information on the next screen and press the button to continue.</Text>
          <Text style={styles.instructionsText}>You will get a 4 digit code to give to others so they can see your information, like a virtual business card.</Text>
          <Text style={styles.instructionsText}>You can also search for others using their 4 digit code.</Text>
        </View>
        <TouchableOpacity style={styles.instructionsContinueButton} onPress={this.props.onPress}>
          <Text style={styles.instructionsButtonText}>Lets go</Text>
        </TouchableOpacity>
      </View>
    </Modal>
    )
  }
}

const styles = StyleSheet.create({
  instructionsContainer: {
    backgroundColor: '#eee',
    marginVertical: '7.5%',
    marginHorizontal: '5%',
    paddingHorizontal: '12.5%',
    paddingVertical: '12.5%',
    borderRadius: 10,
    flex: 1,
    justifyContent: 'space-between'
  },
  instructionsTitle: {
    fontSize: 40,
    paddingVertical: 5,
    color: '#203040'
  },
  instructionsSubtitle: {
    fontSize: 20,
    padding: 5,
    color: '#203040'
  },
  instructionsText: {
    padding: 5,
    color: 'rgba(0, 0, 0, 0.5)'
  },
  instructionsContinueButton: {
    marginTop: 30,
    padding: 18,
    borderRadius: 50,
    backgroundColor: '#06ce97',
    alignItems: 'center'
  },
  instructionsButtonText: {
    color: '#fff',
    fontSize: 18
  }
})
