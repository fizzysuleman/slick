import React, { Component } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'
import { UIActivityIndicator } from 'react-native-indicators';


export default class ForgotPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      type: this.props.navigation.state.params.type,
      loading: false
    };
  }

  continue = () => {
    if (this.state.type == 'buyer') {
      this.continueBuyer()
    }
    else if (this.state.type == 'seller') {
      this.continueSeller()
    }
    else {
      this.props.navigation.goBack()
    }
  }

  continueBuyer = () => {
    const { name } = this.state
    this.setState({ loading: true })
    axios.post('https://slick-project.herokuapp.com/api/forgotPassword/buyer', {
      username: name,
    })
      .then(async (response) => {
        //if it has stored then navigate to the 
        this.setState({ loading: false })
        this.props.navigation.navigate('ForgotPasswordToken', {
          userId: response.data
        })

      })
      .catch(async (error) => {

        this.setState({ loading: false })
        alert(`${error.response.data}!`)

      });

  }


  continueSeller = () => {
    const { name } = this.state
    this.setState({ loading: true })
    axios.post('https://slick-project.herokuapp.com/api/forgotPassword/seller', {
      brandName: name,
    })
      .then(async (response) => {
        //if it has stored then navigate to the 
        this.setState({ loading: false })
        this.props.navigation.navigate('ForgotPasswordToken', {
          userId: response.data
        })

      })
      .catch(async (error) => {

        this.setState({ loading: false })
        alert(`${error.response.data}!`)

      });

  }



  render() {
    let { loading, name, type } = this.state
    //   console.log(this.state.name)
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
        <View >
          {type == "buyer" && <Text> Please Enter the Username for the account </Text>}
          {type == "seller" && <Text> Please Enter the Brandname for the account </Text>}
        </View>
        {type == "buyer" && <TextInput
          style={styles.input}
          placeholderTextColor='grey'
          placeholder='Username'
          onChangeText={(name) => this.setState({ name })}
        />}


        {type == "seller" && <TextInput
          style={styles.input}
          placeholderTextColor='grey'
          placeholder='Brandname'
          onChangeText={(name) => this.setState({ name })}
        />}
        <TouchableOpacity style={(!name || name.length < 5) ? styles.disabled : styles.enabled} disabled={!name || name.length < 5} onPress={() => this.continue()}>
          {!loading && <Text style={{ textAlign: "center" }}>Continue</Text>}
          {loading && <UIActivityIndicator size={hp('2')} style={{ margin: hp('1.2') }} />}

        </TouchableOpacity>
        <TouchableOpacity style={{ backgroundColor: '#e8e8e8', padding: wp('4'), width: wp('60'), borderRadius: wp('6'), marginTop: wp('2') }} onPress={() => { this.props.navigation.goBack() }}>
          <Text style={{ textAlign: 'center' }}>Go back</Text>
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
    borderColor: '#6699ff',
    borderWidth: wp('0.2'),
    width: wp('90'),
    margin: hp('1')

  },
  enabled: {
    backgroundColor: '#6699ff',
    padding: wp('4'),
    width: wp('60'),
    borderRadius: wp('6')
  },
  disabled: {
    backgroundColor: '#ccddff',
    padding: wp('4'),
    width: wp('60'),
    borderRadius: wp('6')
  }
})