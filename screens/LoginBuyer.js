import React, { Component } from 'react';
import { View, Text,Image,KeyboardAvoidingView,TouchableOpacity,StyleSheet,StatusBar,AsyncStorage } from 'react-native';
import LoginTestForm from '../components/LoginBuyerForm'
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
      <KeyboardAvoidingView behavior='padding' style={{flex:1,backgroundColor:'#6699ff'}}>
      <View style={{alignItems:'center',flexGrow:1,justifyContent:'center',paddingTop:hp('5')}}>
            <Image style={{height:hp('10'),width:wp('70'),borderRadius:wp('3')}} source={require('../assets/fullicon.png')}/>
            <Text style={{color:'#fff',marginTop:hp('2'),opacity:0.6}}>Dress Slicky!!, Stay Slicky!!  </Text>
        </View>
       
        <LoginTestForm showStatus={(color,message)=>this.showStatus(color,message)}/>
      </KeyboardAvoidingView>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'#4d88ff',height:40}} onPress={()=>this.props.navigation.navigate('CreateAccount')} >
          <Text style={{color:'white'}} >Create New Account</Text>
      </TouchableOpacity>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
    paddingTop: StatusBar.currentHeight  
  }
});



