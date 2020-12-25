import React, { Component } from 'react';
import { View, Text,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1}}>
      <View style={{ justifyContent: 'center', flex: 1 }}>
        <View style={{ alignItems: 'center' }}>
          <Text> Create Account As </Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <Button
            type='outline'
            icon={{ name: 'emoji-flirt', type: 'entypo', color: '#0091ea', size: wp('6') }}
            title='Buyer'
            onPress={() => this.props.navigation.navigate('CreateAccountBuyer')}
            titleStyle={{
              fontSize: wp('4')
            }}

            buttonStyle={{
              width: wp('40'),
              height: hp('6'),
              borderRadius: hp('1'),
              borderWidth:hp('0.2')
            }}

            containerStyle={{
              marginTop: hp('5'),
            }}

          />
          <Button
            type='outline'
            icon={{ name: 'emoji-happy', type: 'entypo', color: '#ff6666', size: wp('6') }}
            title='Seller'
            onPress={() => this.props.navigation.navigate('CreateAccountSeller')}
            titleStyle={{
              fontSize: wp('4'),
              color: '#ff6666',
            }}

            buttonStyle={{
              borderColor: '#ff6666',
              width: wp('40'),
              height: hp('6'),
              borderRadius: hp('1'),
              borderWidth:hp('0.2')
            }}

            containerStyle={{
              marginTop: hp('5'),
            }}

          />
        </View>
        </View>
        <TouchableOpacity onPress={()=>this.props.navigation.navigate('LoginBuyer')} style={{alignItems:'center',padding:10,backgroundColor:'#0091ea'}}>
          <Text style={{color:'white'}}>Already have an Account?..Login</Text>
      </TouchableOpacity>
      </View>
    );
  }
}
