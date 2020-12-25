import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet ,TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'
import {UIActivityIndicator} from 'react-native-indicators';


export default class ForgotPasswordToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
        newPassword:'',
        confirmNewPassword:'',
        userId:this.props.navigation.state.params.userId,
        webToken:this.props.navigation.state.params.webToken,
        loading:false
    };
  }

  changePassword=()=>{
    const { newPassword,confirmNewPassword,userId,webToken } = this.state
    this.setState({ loading: true })

    axios.put('https://slick-project.herokuapp.com/api/changeForgottenPassword', {
        userId: userId,
        newPassword,
        confirmNewPassword
    }
        , {
            headers: {
                'x-auth-token': webToken
            }
        })
        .then(async (response) => {
            await alert('Your password has been successfully changed')
            this.setState({ loading: false })
            this.props.navigation.navigate('LoginBuyer')

        })
        .catch((error) => {
            alert('An Error Occured')
            this.setState({ loading: false })
        })
  }

  


 



  render() {
      let {loading,newPassword,confirmNewPassword}=this.state
    //   console.log(this.state.name)
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
          <View >
        <Text style={{textAlign:'center'}}> Enter your new Password</Text>
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor='grey'
          placeholder='New Password'
          secureTextEntry
        onChangeText={(newPassword) => this.setState({ newPassword })}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='grey'
          placeholder='Confirm New Password'
          secureTextEntry
        onChangeText={(confirmNewPassword) => this.setState({ confirmNewPassword })}
        />
        <TouchableOpacity style={(!newPassword ||!confirmNewPassword|| newPassword.length<6||newPassword!==confirmNewPassword)?styles.disabled:styles.enabled} disabled={!newPassword ||!confirmNewPassword|| newPassword.length<6||newPassword!==confirmNewPassword} onPress={()=>this.changePassword()}>
            {!loading&&<Text style={{textAlign:"center"}}>Change Password</Text>}
            {loading&& <UIActivityIndicator  size={hp('2')} style={{margin:hp('1.2')}}/>}

        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#e8e8e8',padding:wp('4'),width:wp('60'),borderRadius:wp('6'),marginTop:wp('2')}} onPress={()=>{this.props.navigation.goBack()}}>
            <Text style={{textAlign:'center'}}>Go back</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#e8e8e8',padding:wp('4'),width:wp('60'),borderRadius:wp('6'),marginTop:wp('2')}} onPress={()=>{this.props.navigation.navigate('LoginBuyer')}}>
            <Text style={{textAlign:'center'}}>Go back to Login</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    input: {
      height: hp('6'),
      backgroundColor: 'rgba(255,255,255,0.2)',
      marginBottom: hp('3.5'),
      color: 'black',
      paddingHorizontal: wp('4'),
      borderRadius: wp('1'),
      borderColor:'#6699ff',
      borderWidth:wp('0.2'),
      width:wp('90'),
      margin:hp('1')
  
    },
    enabled:{
      backgroundColor:'#6699ff',
      padding:wp('4'),
      width:wp('60'),
      borderRadius:wp('6')
    },
    disabled:{
      backgroundColor:'#ccddff',
      padding:wp('4'),
      width:wp('60'),
      borderRadius:wp('6')
    }
})