import React, { Component } from 'react';
import { View, Text,StyleSheet,Platform,StatusBar,AsyncStorage } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {Container,Content} from 'native-base'
import ViewSellerContent from '../components/ViewSellerContent'
import {Icon,Header} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'




export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: this.props.navigation.state.params.userId,
      storageUserId:'',
          webToken:'',
          done:false
    };
  }


  componentDidMount() {
    
    AsyncStorage.multiGet(['userId','webtoken']).then(result => {
      this.setState({
        storageUserId:result[0][1],
          webToken:result[1][1],
          done:true
      })
  })

  }


  onReport=()=>{
    //userId is the sellerId
    // let {userId}=this.state
    if(this.state.done){

    axios.post('https://slick-project.herokuapp.com/api/reportSeller', {
        userId:this.state.storageUserId,
        sellerId:this.state.userId,
               }
               ,{
                headers:{
                  'x-auth-token':this.state.webToken
                }
              })
            .then(async(response)=> {
                alert(response.data)
                        
            })
            .catch(function (error) {
                alert('Something went wrong')
            });
          }
  }

  render() {
    const {userId}=this.state
    return (
      <Container style={{backgroundColor:'#E8E8E8'}}>
      <Header
          leftComponent={ <Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { this.props.navigation.goBack() }}/>}
        rightComponent={<Text onPress={() => this.onReport()} style={{color:'red',fontSize:wp('4')}}>Report</Text>}
          containerStyle={{
            backgroundColor: '#6699ff',
            height:hp('12%'),
          }}
          />
       {/* <Content> */}
         <ViewSellerContent userId={userId}/>
       {/* </Content> */}
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
  }
});