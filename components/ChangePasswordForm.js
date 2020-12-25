import React, { Component } from 'react';
import { View, Text ,TextInput,StyleSheet,TouchableOpacity,AsyncStorage} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'
import { withNavigation } from 'react-navigation'
import { BarIndicator } from 'react-native-indicators';

const webToken = AsyncStorage.getItem('webtoken')
const userId = AsyncStorage.getItem('userId')

class ChangePasswordForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
        oldPassword:'',
        newPassword:'',
        confirmNewPassword:'',
        loading:false,
        userId:'',
          webToken:'',
          done:false
    };
  }

  componentDidMount() {
   
    AsyncStorage.multiGet(['userId','webtoken']).then(result => {
      this.setState({
        userId:result[0][1],
          webToken:result[1][1],
          done:true
      })
  })

  }

  submitPassword=()=>{
        const { oldPassword,newPassword,confirmNewPassword,done } = this.state
        this.setState({ loading: true })
    if(done){
        axios.put('https://slick-project.herokuapp.com/api/changePassword', {
            userId: this.state.userId,
            password: oldPassword,
            currentPassword: newPassword,
            currentConfirmPassword:confirmNewPassword
        }
            , {
                headers: {
                    'x-auth-token': this.state.webToken
                }
            })
            .then(async (response) => {
                await alert(response.data)
                this.setState({ loading: false })
                this.props.navigation.navigate('Home')

            })
            .catch((error) => {
                alert(error.response.data)
                this.setState({ loading: false })
            })
          }
  }

  render() {
      let {oldPassword,newPassword,confirmNewPassword,loading}=this.state
    //   console.log(oldPassword,newPassword,confirmNewPassword)
    return (
        <View>
      <View style={{padding:wp('2')}}>
        <TextInput
          style={styles.input}
          placeholderTextColor='grey'
          placeholder='Old Password'
          secureTextEntry
        onChangeText={(oldPassword) => this.setState({ oldPassword })}
        />
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
      </View>
      <TouchableOpacity disabled={!oldPassword ||!newPassword ||!confirmNewPassword ||(newPassword.length<6) ||(newPassword!==confirmNewPassword) } style={!oldPassword ||!newPassword ||!confirmNewPassword ||(newPassword.length<6) ||(newPassword!==confirmNewPassword) ?styles.buttonDisabled:styles.buttonEnabled} onPress={() =>{this.submitPassword()} }>
          {!loading&&<Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: wp('4') }}>Update</Text>}
          {loading && <BarIndicator color='#fff' size={hp('4')} style={{ paddingVertical: hp('1.4') }} count={5} />}
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
      borderWidth:wp('0.2')
  
    },
    buttonDisabled: {

        padding: wp('7'),
        borderRadius: wp('2'),
        backgroundColor: '#ccddff',
        padding:hp('2'),
        width:wp('90'),
        marginLeft:'auto',
        marginRight:'auto'
    
      },
      buttonEnabled: {
        padding: wp('7'),
        borderRadius: wp('2'),
        backgroundColor: '#6699ff',
        padding:hp('2'),
        width:wp('90'),
        marginLeft:'auto',
        marginRight:'auto'
      }
})

export default withNavigation(ChangePasswordForm)