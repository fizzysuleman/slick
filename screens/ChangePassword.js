import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform } from 'react-native';
import {Container} from 'native-base';
import {Icon,Header} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ChangePasswordForm from '../components/ChangePasswordForm';


export default class ChangePassword extends Component {
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
          centerComponent={{ text: 'Change Password', style: { color: 'black',fontSize:wp('5') } }}
          containerStyle={{
            backgroundColor: '#6699ff',
            height:hp('12%'),
          }}
          />
        
       <ChangePasswordForm/>
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