import React, { Component } from 'react';
import { View, Text,Image,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import Form from '../components/CreateAccountSellerForm'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Content} from 'native-base'

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
    <View style={{flex:1}}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex:1,backgroundColor:'#ff8b33'}}>
      <View style={{alignItems:'center',flexGrow:1,justifyContent:'center',paddingTop:hp('5')}}>
            <Image style={{height:wp('20'),width:wp('20'),borderRadius:wp('10')}} source={require('../assets/newIcon.png')}/>
        </View>
        
        <Form/>
      </KeyboardAvoidingView>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ff6f00',height:40}} onPress={()=>this.props.navigation.navigate('CreateAccount')} >
          <Text style={{color:'white'}} >Already have an account? Login</Text>
      </TouchableOpacity>
      </View>
    );
  }
}


