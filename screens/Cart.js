import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import { Title, Container,Content,Button, Left, CardItem } from 'native-base';
import {Icon,Header} from 'react-native-elements'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Entypo from 'react-native-vector-icons/Entypo'
import CartItem from '../components/CartItems'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    const { goBack } = this.props.navigation
    return (
      <Container>
        <Header
          leftComponent={ <Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { goBack() }}/>}
          centerComponent={{ text: 'Cart', style: { color: 'black',fontSize:wp('5') } }}
          containerStyle={{
            backgroundColor: '#6699FF',
            height:hp('12%'),
          }}
          />
        
       <CartItem/>
      </Container>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  androidHeader: {
    ...Platform.select({
      android: {
        paddingTop: StatusBar.currentHeight,
      }
    })
  }
});