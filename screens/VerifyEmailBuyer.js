import React, { Component } from 'react';
import { View, Text, KeyboardAvoidingView, TouchableOpacity, StatusBar, Platform, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CodeInput from 'react-native-confirmation-code-input';
import axios from 'react-native-axios'
import Spinner from 'react-native-loading-spinner-overlay';
import { withNavigation,NavigationActions,StackActions } from 'react-navigation';



const todayDate=Date()

export default class componentName extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: this.props.navigation.state.params.firstName,
      lastName: this.props.navigation.state.params.lastName,
      email: this.props.navigation.state.params.email,
      phone: this.props.navigation.state.params.phone,
      tokenId: this.props.navigation.state.params.tokenId,
      code:'',
      tokenDetails: [],
      expired:'',
      spinner:false  
    };
  }

  async componentDidMount() {
    this.getTokenDetails()
  }



  //getting token  detail
  getTokenDetails = async () => {
    const { tokenId,tokenDetails } = this.state
    try{
      const response=await axios.get(`https://slick-project.herokuapp.com/api/verificationBuyerToken/${tokenId}`)
      const data=await response.data
      await this.setState({ tokenDetails: data, code:data.token })
      var date=new Date(todayDate)
    
    if(tokenDetails.expiryDate>date){
      await this.setState({expired:true})
    }else{
     
      await this.setState({expired:false})
    }
    }
    catch(error){
      alert(error.response.data)
    }

  }

  onFinish = async(isValid, code) => {

    const { firstName, lastName, email, phone,tokenId,tokenDetails,expired } = this.state
    

    await this.setState({spinner:true})
    

   if(isValid&&expired===false){
    this.setState({spinner:false})

    const actionToDispatch = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({
        routeName:'CreateAccountBuyer2',
        params:{
          email: email,
        firstName: firstName,
        lastName: lastName,
        phone: phone,
       tokenId:tokenId
      }
    })] // Array!
    })
    this.props.navigation.dispatch(actionToDispatch)

      // this.props.navigation.navigate('CreateAccountBuyer2', {
      //   email: email,
      //   firstName: firstName,
      //   lastName: lastName,
      //   phone: phone,
      //  tokenId:tokenId
      // })   
     }
     else if(expired===true){
      this.setState({spinner:false})
       alert(`This token expired in ${tokenDetails.expiryDate}, try registering again to continue`)
     }
     else if (!isValid){
      this.setState({spinner:false})
       alert('You entered the wrong token,check your email and try again')
     }
     
    
}

  render() {
    return (
      <View style={[{ flex: 1 }]}>
        <KeyboardAvoidingView behavior='padding' style={[{ flex: 1, backgroundColor: '#6699ff' }]}>
          <View style={[{ marginBottom: hp('10'),marginTop:hp('25') }]}>
            <Text style={{ textAlign: 'center', fontSize: wp('4.5'), color: 'white',padding:wp('4') }} >A verification code has been sent to <Text style={{ color: '#e6e600' }}>{this.state.email}</Text>, type the code below to continue.</Text>
          </View>
          <CodeInput
            ref="codeInputRef2"
            keyboardType="numeric"
            codeLength={6}
            className='border-circle'
            compareWithCode={`${this.state.code}`}
            autoFocus={false}
            // containerStyle={{alignItems:'center',flex:1,justifyContent:'center'}}
            codeInputStyle={{ fontWeight: '800', borderWidth: wp('0.5'), }}
            onFulfill={(isValid, code) => this.onFinish(isValid, code)}
          />
          <Spinner
          visible={this.state.spinner}
          textContent={'Chill...😎👌'}
          overlayColor='rgba(0, 0, 0, 0.70)'
          textStyle={{color:'#fff',fontSize:wp('5')}}
        />

        </KeyboardAvoidingView>
        <TouchableOpacity style={{ alignItems: 'center', justifyContent: 'center', backgroundColor: '#4d88ff', height: 40 }} onPress={() => this.props.navigation.goBack()} >
          <Text style={{ color: 'white' }} >Go back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  androidHeader: {
     paddingTop: StatusBar.currentHeight+hp('30'),
     }
});