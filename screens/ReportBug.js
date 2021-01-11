import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Platform,TouchableOpacity,AsyncStorage,ScrollView } from 'react-native';
import { Container,  Button, Left, CardItem } from 'native-base';
import { Icon, Header } from 'react-native-elements'
import Textarea from 'react-native-textarea';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {UIActivityIndicator} from 'react-native-indicators';
import axios from 'react-native-axios'


export default class ReportBug extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text:'',
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
    
      onSubmit=()=>{
            const {done,text } = this.state
            this.setState({ loading: true })
        if(done){
            axios.post('https://slick-project.herokuapp.com/api/reportBug', {
                userId: this.state.userId,
                message:text
            }
                , {
                    headers: {
                        'x-auth-token': this.state.webToken
                    }
                })
                .then(async (response) => {
                    this.setState({ loading: false,text:'' })
                    await alert(response.data)
    
                })
                .catch((error) => {
                    this.setState({ loading: false })
                    alert('Something failed')
                })
              }
      }

    render() {
        const { goBack } = this.props.navigation
        const {loading}=this.state
        return (
            <Container>
                <Header
                    leftComponent={<Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { goBack() }} />}
                    centerComponent={{ text: 'Report a Bug', style: { color: 'black', fontSize: wp('5') } }}
                    containerStyle={{
                        backgroundColor: '#6699ff',
                        height: hp('12%'),
                    }}
                />

                <ScrollView>
                    <View style={styles.textContainer}>
                        <Textarea
                            containerStyle={styles.textareaContainer}
                            style={styles.textarea}
                            onChangeText={(text)=>this.setState({text})}
                            defaultValue={this.state.text}
                            maxLength={120}
                            placeholder={'Hey Genius!!!..Which bug did you observe 。。。'}
                            placeholderTextColor={'#c7c7c7'}
                            underlineColorAndroid={'transparent'}
                        />
                    </View>
                    <TouchableOpacity disabled={!this.state.text} style={!this.state.text?styles.buttonDisabled:styles.buttonEnabled} onPress={()=>this.onSubmit()}>
                        {!loading&& <Text style={{textAlign:'center'}} >Submit</Text>}
                        {loading&& <UIActivityIndicator  size={hp('2')} />}
                    </TouchableOpacity>
                </ScrollView>
            </Container>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    androidHeader: {
        ...Platform.select({
            android: {
                paddingTop: StatusBar.currentHeight,
            }
        })
    },
    textContainer: {
        flex: 1,
        padding: wp('3'),
        justifyContent: 'center',
        alignItems: 'center',
      },
      textareaContainer: {
        height: 180,
        padding: 5,
        backgroundColor: '#fff',
        borderWidth:wp('0.2'),
        borderColor:'#6699ff'
      },
      textarea: {
        textAlignVertical: 'top',  // hack android
        height: hp('20'),
        fontSize: wp('4'),
        color: '#333',
      },
      buttonEnabled:{
        backgroundColor:'#6699ff',
        padding:wp('3'),
        margin:wp('3'),
        borderRadius:wp('1')
      },
      buttonDisabled:{
        backgroundColor:'#ccddff',
        padding:wp('3'),
        margin:wp('3'),
        borderRadius:wp('1')
      }
});