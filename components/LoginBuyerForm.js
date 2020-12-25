import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, AsyncStorage,ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation,NavigationActions,StackActions } from 'react-navigation';
import axios from 'react-native-axios'
import {BarIndicator} from 'react-native-indicators';



class LoginTestForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      loading:false,
      isConnected:null,
      status:false,
      statusData:''
    };
  }

  componentDidMount(){
    this.setState({
      username:'',
      password:''
    })
  }


  checkInternetConnection=async()=>{
      setTimeout(() => {
        fetch('https://www.google.com')
        .then((response)=>{
          //just continue with the normal process
        })
        .catch((err)=>{
          alert('Could not connect to the internet, Please check your connection and try again')
          this.setState({loading:false})

        })
      }, 60000);
    }
  
    showStatus=(message)=>{
      this.setState({
        status: true,
        statusData:  message,
      });
      setTimeout(() => {
        this.setState({
          status: false,
        });
      }, 8000);
    }

 


  onLogin(){
    this.loginBuyer()
    this.checkInternetConnection()
  }

  
  loginBuyer = async () => {
    const { username, password ,isConnected} = this.state

    this.setState({loading:true})
    
    axios.post('https://slick-project.herokuapp.com/api/loginBuyer', {
      username: username,
      password: password,
    })
      .then(async (response) => {
        //console.log(response.data.userId)
          try {
            //storing in asyncStorage
            let keys=[['webtoken', response.data.token],['userId', response.data.userId],['account', response.data.account],['username', response.data.username],['fullName', response.data.fullName]]
            await AsyncStorage.multiSet(keys,err=>{
              this.setState({loading:false})

              const actionToDispatch = StackActions.reset({
                index: 0,
                key:null,
                actions: [NavigationActions.navigate({routeName:'BuyerScreen'})] // Array!
              })
              this.props.navigation.dispatch(actionToDispatch)


            //   this.props.navigation.navigate('BuyerScreen', {
            //   userId: response.data.userId
            // })
            });
            
            
} catch (error) {
            alert(error.response.data)
          }

        
       
      })
      .catch(async(error)=> {
       
        this.setState({loading:false})
        if(error.response.status===400){
          this.showStatus(`${error.response.data}!`)
        }
        else{
          alert('Something failed, Could not connect to server')
        }
       
      });
    

      
  }

  render() {
    let {loading,status,statusData} = this.state
    return (
      <View style={{ padding: wp('7')}}>
        {(status)&&<View style={styles.alert}>
          <Text style={{color:'#fff',marginTop:'auto',marginBottom:'auto'}}>{statusData}</Text>
        </View>}
        <TextInput
          style={styles.input}
          placeholder='Username'
          placeholderTextColor='rgba(255,255,255,0.7)'
          returnKeyType='next'
          keyboardType='default'
          autoCapitalize='none'
          autoCorrect={false}
          onChangeText={(username) => this.setState({ username })}
          onSubmitEditing={() => this.passwordInput.focus()}
        />
        <TextInput
          style={styles.input}
          placeholderTextColor='rgba(255,255,255,0.7)'
          placeholder='Password'
          secureTextEntry
          returnKeyType='done'
          onChangeText={(password) => this.setState({ password })}
          ref={(input) => this.passwordInput = input}
        />


        <TouchableOpacity disabled={!this.state.username || !this.state.password} style={!this.state.username || !this.state.password ? styles.buttonDisabled : styles.buttonEnabled} onPress={() => this.onLogin()}>
          {!loading && <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: wp('4') }}>LOGIN</Text>}
          {loading && <BarIndicator color='#fff' size={hp('4')} style={{ paddingVertical: hp('1.4') }} count={5} />}
        </TouchableOpacity>

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: hp('1') }}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('LoginSeller')}>
            <Text style={{ color: 'white', opacity: 0.8 }}  >
              Login As Seller
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('ForgotPassword', {type: 'buyer'})}>
            <Text style={{ color: 'white', opacity: 0.8 }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  input: {
    height: hp('6'),
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: hp('3.5'),
    color: '#fff',
    paddingHorizontal: wp('4'),
    borderRadius: wp('1'),

  },
  alert: {
    height: hp('6'),
    // backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: hp('3.5'),
    borderRadius: wp('1'),
    borderColor:'#c7ecee',
    borderWidth:wp('0.5'),
    padding:wp('1')
  },
  buttonDisabled: {

    padding: wp('7'),
    borderRadius: wp('2'),
    backgroundColor: '#ccddff',
    paddingVertical: hp('2')

  },
  buttonEnabled: {
    padding: wp('7'),
    borderRadius: wp('2'),
    backgroundColor: '#4d88ff',
    paddingVertical: hp('2')
  }
})



export default withNavigation(LoginTestForm)