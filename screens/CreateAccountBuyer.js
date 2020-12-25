import React, { Component } from 'react';
import { View, Text,Image,KeyboardAvoidingView,TouchableOpacity,ScrollView } from 'react-native';
import Form from '../components/createAccountBuyerForm'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
    <View style={{flex:1,height:hp('100')}}>
      <KeyboardAvoidingView behavior='padding' style={{flex:1,backgroundColor:'#6699ff'}}>
      <View style={{alignItems:'center',flexGrow:1,justifyContent:'center',paddingTop:hp('5')}}>
            <Image style={{height:hp('10'),width:wp('70'),borderRadius:wp('3')}} source={require('../assets/fullicon.png')}/>
            <Text style={{color:'#fff',marginTop:hp('2'),opacity:0.6}}>Dress Slicky!!, Stay Slicky!!  </Text>
        </View>
        <Form/>
      </KeyboardAvoidingView>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'#4d88ff',height:40}} onPress={()=>this.props.navigation.navigate('LoginBuyer')} >
          <Text style={{color:'white'}} >Already have an account? Login</Text>
      </TouchableOpacity>
      </View>
    );
  }
}


