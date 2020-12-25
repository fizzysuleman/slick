import React, { Component } from 'react';
import { View, Text,TextInput,StyleSheet ,TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'
import {UIActivityIndicator} from 'react-native-indicators';


export default class ForgotPasswordToken extends Component {
  constructor(props) {
    super(props);
    this.state = {
        token:'',
        userId:this.props.navigation.state.params.userId,
        loading:false
    };
  }

  verifyToken=()=>{
      let {userId,token}=this.state
    this.setState({loading:true})
    axios.post('https://slick-project.herokuapp.com/api/forgotPasswordToken', {
      userId,
      token
    })
      .then(async (response) => {
        //if it has stored then navigate to the 
            this.setState({loading:false})
            this.props.navigation.navigate('ChangeForgotPassword', {
                userId: response.data.userId,
                webToken: response.data.token
  
              })    
       
      })
      .catch(async(error)=> {
       
        this.setState({loading:false})
        alert(`${error.response.data}!`)
       
      });
  }

  


 



  render() {
      let {loading,token}=this.state
    //   console.log(this.state.name)
    return (
      <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
          <View >
        <Text style={{textAlign:'center'}}> An 8 digit token has been sent to your email, Input the token to continue </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholderTextColor='grey'
          placeholder='Token'
        onChangeText={(token) => this.setState({ token })}
        />
        <TouchableOpacity style={(!token || token.length<8)?styles.disabled:styles.enabled} disabled={!token || token.length<8} onPress={()=>this.verifyToken()}>
            {!loading&&<Text style={{textAlign:"center"}}>Continue</Text>}
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