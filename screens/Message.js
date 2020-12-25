import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

class Message extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text> Message </Text>
      </View>
    );
  }
}

export default Message;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  