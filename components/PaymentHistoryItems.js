import React, { Component } from 'react';
import { View, Text,StyleSheet } from 'react-native';
import {Container } from 'native-base'
import {Header,Icon} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const paymentDetails= [
    {
        product: 'Durags Silk Original',
        seller: 'Mullay',
        date: '2nd of February 2019',
        price: '$8',
        status:'CANCELLED'
      },
      {
        product: 'Nike boots',
        seller: 'foooty',
        date: '2nd of January 2019',
        price: '$80',
        status:'SUCCESSFUL'
      },
      {
        product: 'Adidas NMD r1',
        seller: 'Wau stores',
        date: '4th of February 2019',
        price: '$120',
        status:'CANCELLED'
      },
      {
        product: 'Cap (Red and blue)',
        seller: 'Donesty Clothes',
        date: '9th of December 2018',
        price: '$9',
        status:'SUCCESSFUL'
      },
      {
        product: 'Yeezy boosts ',
        seller: 'Pick and Carr',
        date: '19th of August 2018',
        price: '$90',
        status:'SUCCESSFUL'
      }


    ]



class PaymentHistoryItems extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  renderPaymentDetails=()=>{
      return(
      paymentDetails.map((detail,index)=>{
        return(
            <View key={index} style={{backgroundColor:'white',borderTopColor:'black',borderBottomColor:'black',marginTop:hp('2'),marginBottom:hp('2'),paddingLeft:wp('5')}}>
            <Text style={{fontSize:wp('4.5')}}>Product Paid for: {detail.product}</Text>
            <Text style={{fontSize:wp('4.5')}}>Paid To:{detail.seller}</Text>
            <Text style={{fontSize:wp('4.5')}}>Price: {detail.price}</Text>
            <Text style={{fontSize:wp('4.5')}}>{detail.date}</Text>
            <Text style={[(detail.status==='SUCCESSFUL')?{color:'green'}:{color:'red'},{fontSize:wp('4.5')}]}>{detail.status}</Text>
        </View>
        )
      })
      )
  }

  render() {
    return (
      
         this.renderPaymentDetails()
      
    );
  }
}

export default PaymentHistoryItems;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  