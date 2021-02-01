import React, { Component } from 'react';
import { View, Text,Image,KeyboardAvoidingView,TouchableOpacity } from 'react-native';
import Form from '../components/CreateAccountSellerForm2'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation,NavigationActions,StackActions } from 'react-navigation';


export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName:this.props.navigation.state.params.firstName,
      lastName:this.props.navigation.state.params.lastName,
      email:this.props.navigation.state.params.email,
      phone:this.props.navigation.state.params.phone,
      tokenId:this.props.navigation.state.params.tokenId

    };
  }

  onBack=()=>{
    const actionToDispatch = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({routeName:'LoginSeller'})] // Array!
    })
    this.props.navigation.dispatch(actionToDispatch)
  }


  render() {
    const {firstName,lastName,email,phone,tokenId}=this.state
    return (
    <View style={{flex:1}}>
        
        
        <Form firstName={firstName} lastName={lastName} email={email} phone={phone} tokenId={tokenId}/>
      <TouchableOpacity style={{alignItems:'center',justifyContent:'center',backgroundColor:'#ff6f00',height:40}} onPress={()=>this.onBack()} >
          <Text style={{color:'white'}} >Already have an account? Login</Text>
      </TouchableOpacity>
      </View>
    );
  }
}


