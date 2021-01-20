import React, { Component } from 'react';
import { View, Text, Image, AsyncStorage, TouchableOpacity, TextInput, StyleSheet,Linking } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DatePicker from 'react-native-datepicker'
import CheckBox from 'react-native-checkbox';
import axios from 'react-native-axios'
import {BarIndicator} from 'react-native-indicators';
import { withNavigation,NavigationActions,StackActions } from 'react-navigation';



var fetchDate = new Date().getDate(); //Current Date
var fetchMonth = new Date().getMonth() + 1; //Current Month
var fetchYear = new Date().getFullYear(); //Current Yea

class LoginTestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {

            firstName: this.props.firstName,
            lastName: this.props.lastName,
            email: this.props.email,
            phone: this.props.phone,
            tokenId:this.props.tokenId,
            username: '',
            password: '',
            confirmPassword: '',
            homeAddress: '',
            date: '',
            terms:false,
            loading:false
        };
    }

    onSubmit=()=>{
        this.submitBuyer()
        this.checkInternetConnection()
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

submitBuyer=async()=>{
    const {firstName,lastName,email,phone,tokenId,username,password,confirmPassword,homeAddress,date,terms}=this.state
        this.setState({loading:true})
        axios.post('https://slick-project.herokuapp.com/api/registerBuyer', {
            firstName: firstName,
            lastName: lastName,
            email:email,
            phone:phone,
            tokenId:tokenId,
            username:username,
            password:password,
            confirmPassword:confirmPassword,
            dateOfBirth:date,
            homeAddress:homeAddress,
            terms:terms
          })
          .then(async(response)=> {
                console.log(response.data)

                let keys=[['webtoken', response.data.token],['userId', response.data.userId],['account', response.data.account],['username', response.data.username],['fullName', response.data.fullName]]
                await AsyncStorage.multiSet(keys,err=>{
                  this.setState({loading:false})
    
                  const actionToDispatch = StackActions.reset({
                    index: 0,
                    key:null,
                    actions: [NavigationActions.navigate({routeName:'AppIntro'})] // Array!
                  })
                  this.setState({loading:false})

                  this.props.navigation.dispatch(actionToDispatch)
    

                
                });
             
          })
          .catch((error)=> {
             this.setState({loading:false})
             if(error.response.status===400){
                alert(error.response.data);
            }
             else{
               alert('Something failed, Could not connect to server')
             }
          });
        
}

    render() {
        const { firstName, lastName, email, phone, username, password, confirmPassword, homeAddress, date,terms,loading } = this.state
        return (

            <ScrollView style={{ padding: wp('7'),marginTop:hp('3') }}>
                <TextInput
                    style={styles.input}
                    placeholder='Username'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(username) => this.setState({ username })}
                    onSubmitEditing={() => this.passwordInput.focus()}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    secureTextEntry
                    placeholder='Password'
                    returnKeyType='go'
                    onChangeText={(password) => this.setState({ password })}
                    ref={(input) => this.passwordInput = input}
                    onSubmitEditing={() => this.confirmPasswordInput.focus()}
                />
                <TextInput
                    style={styles.input}
                    placeholder='Confirm Password'
                    secureTextEntry
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(confirmPassword) => this.setState({ confirmPassword })}
                    onSubmitEditing={() => this.homeAddressInput.focus()}
                    ref={(input) => this.confirmPasswordInput = input}

                />
                <TextInput
                    style={styles.input}
                    placeholder='Home Address'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(homeAddress) => this.setState({ homeAddress })}
                    //onSubmitEditing={() => this.passwordInput.focus()}
                    ref={(input) => this.homeAddressInput = input}

                />
                <DatePicker
                    style={{
                        height: hp('6'), backgroundColor: 'rgba(255,255,255,0.2)', marginBottom: hp('3.5'),
                        paddingHorizontal: wp('4'),
                        borderRadius: wp('1'),
                    }}
                    date={this.state.date}
                    mode="date"
                    placeholder="Date of birth"
                    format="YYYY-MM-DD"
                    minDate="1950-01-01"
                    maxDate={`${fetchYear}-${fetchMonth}-${fetchDate}`}
                    confirmBtnText="Confirm"
                    showIcon={false}
                    cancelBtnText="Cancel"
                    customStyles={{
                        dateText: {
                            fontSize: wp('3.5'),
                            color: '#fff'
                        },

                        dateInput: {
                            borderWidth: 0,
                            borderColor: 'transparent',
                            alignItems: 'flex-start',

                        }
                    }}
                    onDateChange={(date) => { this.setState({ date: date }) }}
                />
                <View style={{flexDirection:'row' ,paddingBottom:hp('1')}}>
                <CheckBox
                label=''
                checkboxStyle ={{
                    height:wp('4'),
                    width:wp('4')
                }}
                    checked={this.state.terms}
                    onChange={() => this.setState({terms:!this.state.terms})}
                />
                <View style={{paddingLeft:wp('1')}}>
                    <Text style={{color:'#fff'}}>I agree to<Text onPress={()=>{Linking.openURL('https://www.websitepolicies.com/policies/view/UylaKVNi')}} style={{color:'#e6e600'}}> Terms and Conditions</Text></Text>
                </View>
                </View>



                <TouchableOpacity disabled={!firstName || !lastName || !email || !phone || !username || !homeAddress || !password || !confirmPassword || !date||!terms} style={!firstName || !lastName || !email || !phone || !username || !homeAddress || !password || !confirmPassword || !date ||!terms ? styles.buttonDisabled : styles.buttonEnabled} onPress={() => this.onSubmit()}>
                {!loading && <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: wp('4') }}>Finish! 👌</Text>}
                    {loading && <BarIndicator color='#fff' size={hp('4')} style={{ paddingVertical: hp('1.4') }} count={5} />}
                </TouchableOpacity>
            </ScrollView>
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