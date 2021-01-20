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
            <Image style={{height:wp('20'),width:wp('20'),borderRadius:wp('10')}} source={require('../assets/newIcon.png')}/>
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



