/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Button,
  View
} from 'react-native';
var now = require("performance-now")

import RSA from 'react-native-key-pair';

var RSAKey = require('react-native-rsa');
const bits = 2048;
const exponent = '10001'; // must be a string. This is hex string. decimal = 65537

export default class rnrsa extends Component {
  constructor(props) {
    super(props);
    this.state = {
     publicKey: '',
     privateKey: '',
     numRuns: 10,
     nativeTotalTime: '',
     jsTotalTime: ''
   };
  }
  _genKeyJS = () => {
    var rsa = new RSAKey();
    var start = now();
    let end, jsTotalTime, publicKey, privateKey;
    // this.setState({ totalTime: 0});
    for (i=1; i<this.state.numRuns; i++) {
      rsa.generate(bits, exponent);
      end = now();
      publicKey = rsa.getPublicString();
      privateKey = rsa.getPrivateString();
      jsTotalTime = end - start;
      this.setState({ publicKey, privateKey, jsTotalTime });
    };
  }
  _genKeyNative = () => {
    const start = now();
    let end, nativeTotalTime, publicKey, privateKey;
    // this.setState({ totalTime: 0});
    for (i=1; i<this.state.numRuns; i++) {
      RSA.generate(keys => {
        end = now();
        publicKey = keys.public;
        privateKey = keys.private;
        nativeTotalTime = end - start;
        this.setState({ publicKey, privateKey, nativeTotalTime });
      });
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          RSA runs: {this.state.numRuns}
        </Text>
        <Text style={styles.instructions}>
          jsTotalTime : {this.state.jsTotalTime}
        </Text>
        <Text style={styles.instructions}>
          nativeTotalTime : {this.state.nativeTotalTime}
        </Text>
        <Button
          onPress={this._genKeyJS}
          title="Generate JS Keys"
          color="#841584"
          accessibilityLabel="Generate JS Keys"
        />
        <Button
          onPress={this._genKeyNative}
          title="Generate Native Keys"
          color="#841584"
          accessibilityLabel="Generate Native Keys"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('rnrsa', () => rnrsa);
