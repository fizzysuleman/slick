import React, { Component } from 'react';
import { StyleSheet,StatusBar,Platform ,Text,AsyncStorage} from 'react-native';
import {Container,Content} from 'native-base'
import {Icon,Header} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ViewItemSearchContent from '../components/ViewItemSearchContent'
import axios from 'react-native-axios'


export default class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        itemBrandId:this.props.navigation.state.params.itemBrandId,
        itemName:this.props.navigation.state.params.itemName,
        itemId:this.props.navigation.state.params.itemId,
        visibleModal:false,
        userId:'',
        webToken:'',
        account:'',
        done:false
  };
}


componentDidMount() {
  
  AsyncStorage.multiGet(['userId','webtoken','account']).then(result => {
    this.setState({
      userId:result[0][1],
        webToken:result[1][1],
        account:result[2][1],
        done:true
    })
})



}

onBack=()=>{
    if(this.state.account==='buyer'){
        this.props.navigation.navigate('BuyerScreen')
    }
    else{
        this.props.navigation.navigate('SellerScreen')
    }
}
  closeModal=()=>{
    this.setState({visibleModal:false})
  }


  onReport=()=>{
    //userId is the sellerId
    // let {userId}=this.state
    if(this.state.done){

    axios.post('https://slick-project.herokuapp.com/api/reportItem', {
        userId:this.state.userId,
        postId:this.state.itemId,
        sellerId:this.state.itemBrandId,
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
      const {itemName,itemBrandId}=this.state

      const {goBack}=this.props.navigation
    return (
        <Container style={{backgroundColor:'#E8E8E8'}}>
        <Header
          leftComponent={ <Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { this.onBack() }}/>}
          centerComponent={{ text: `${itemName}`, style: { color: 'black',fontSize:wp('4.5') } }}
          rightComponent={<Text onPress={() => this.onReport()} style={{color:'red',fontSize:wp('4')}}>Report</Text>}
          containerStyle={{
            backgroundColor: '#6699ff',
            height:hp('12%'),
          }}
          />
        
        <ViewItemSearchContent itemId={this.state.itemId} itemBrandId={this.state.itemBrandId} close={this.closeModal} visibleModal={this.state.visibleModal} />
       
      </Container>
      
      
    );
  }
}

