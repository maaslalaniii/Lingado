use 'strict';
var React = require('react-native');

var {
  Text,
  View,
  StyleSheet,
} = React;

// make sure you linked rights + added camera modules to src/ before continuing!
import Camera from 'react-native-camera';

var QRCodeRead = React.createClass({
  // Add button to cancel
  // Add button to take picture
  // Taking picture mechanism uses a method from the new module (react-native-camera).
)};

                                   
// Tedious stuff (drawing the box on camera and defining dimensions)
var styles = StyleSheet.create({
  camera: {
    height: 568,
    alignItems: 'center',
  },

  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: 250,
    width: 250,
    borderWidth: 2,
    borderColor: '#00FF00',
    backgroundColor: 'transparent',
  },
});
                                   

module.exports = QRCodeRead;
