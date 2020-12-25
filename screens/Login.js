import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={() => this.props.navigation.navigate('BuyerScreen')}> Login As Buyer </Text>
        <Text onPress={() => this.props.navigation.navigate('SellerScreen')}> Login As Seller </Text>     
      </View>
    );
  }
}

export default Login;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  