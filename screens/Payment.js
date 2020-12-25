import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {Container} from 'native-base'
import PaymentItems from '../components/PaymentItems'
import {Header,Icon} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class PaymentScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {goBack}=this.props.navigation
    return (
      <Container style={{backgroundColor:'#e8e8e8'}}>
      <Header
          leftComponent={ <Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { goBack() }}/>}
          centerComponent={{ text: 'Payment', style: { color: 'black',fontSize:wp('5') } }}
          containerStyle={{
            backgroundColor: '#6699ff',
            height:hp('12%'),
          }}
          />
        
        
          <PaymentItems/>
        

      </Container>
    );
  }
}

export default PaymentScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
