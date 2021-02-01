import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity,ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation } from 'react-navigation';
import PhoneInput from 'react-native-phone-input'
import axios from 'react-native-axios'
import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';


class LoginTestForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            loading: false

        };
    }

    onSubmit=()=>{
        this.checkInternetConnection()
        this.verifyEmail()
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

    verifyEmail = async () => {
        const { firstName, lastName, email, phone } = this.state
        this.setState({ loading: true })
        try {
            const response = await axios.post('https://slick-project.herokuapp.com/api/registerSeller1', {
                firstName: firstName,
                lastName: lastName,
                email: email,
                phone: phone
            })
            if (response.status === 200) {
                this.setState({ loading: false })
                this.props.navigation.navigate('VerifyEmailSeller', {
                    email: email,
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    tokenId: response.data
                })
            }
        }
        catch (error) {
            this.setState({loading:false})
             if(error.response.status===400){
                alert(error.response.data);
            }
             else{
               alert('Something failed, Could not connect to server')
             }

        }

 }


    render() {
        let { loading } = this.state
        return (
            <ScrollView style={{ padding: wp('7') }}>
                <TextInput
                    style={styles.input}
                    placeholder='Firstname'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    autoCorrect={false}
                    onChangeText={(firstName) => this.setState({ firstName })}
                    onSubmitEditing={() => this.lastNameInput.focus()}
                />
                <TextInput
                    style={styles.input}
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    placeholder='Lastname'
                    returnKeyType='go'
                    onChangeText={(lastName) => this.setState({ lastName })}
                    ref={(input) => this.lastNameInput = input}
                    onSubmitEditing={() => this.emailInput.focus()}
                />
                <TextInput
                    style={styles.input}
                    placeholder='E-mail Address'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    keyboardType='email-address'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(email) => this.setState({ email })}
                    onSubmitEditing={() => this.phoneInput.focus()}
                    ref={(input) => this.emailInput = input}

                />
                {/* <TextInput
                    style={styles.input}
                    placeholder='Phone number'
                    placeholderTextColor='rgba(255,255,255,0.7)'
                    returnKeyType='next'
                    keyboardType='phone-pad'
                    autoCapitalize='none'
                    autoCorrect={false}
                    onChangeText={(phone) => this.setState({ phone })}
                    ref={(input) => this.phoneInput = input}
                    maxLength={11}
                /> */}
                <PhoneInput
                    style={styles.input}
                    ref='phone' initialCountry='ng'
                    flagStyle={{ width: wp('8'), height: hp('3'), borderWidth: 0 }}
                    textProps={{ placeholder: 'Phone number' }}
                    onChangePhoneNumber={(phone) => this.setState({ phone })}
                    ref={(input) => this.phoneInput = input}
                    max={14}
                    allowZeroAfterCountryCode={false}
                    autoFormat
                />


                <TouchableOpacity disabled={!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.phone||loading} style={!this.state.firstName || !this.state.lastName || !this.state.email || !this.state.phone ? styles.buttonDisabled : styles.buttonEnabled} onPress={() => this.onSubmit()}>
                    {!loading && <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: wp('4') }}>Continue</Text>}
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
        backgroundColor: '#ffe2cc',
        paddingVertical: hp('2')

    },
    buttonEnabled: {
        padding: wp('7'),
        borderRadius: wp('2'),
        backgroundColor: '#ff6f00',
        paddingVertical: hp('2')
    }
})



export default withNavigation(LoginTestForm)