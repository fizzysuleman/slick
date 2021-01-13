import React, { Component } from 'react';
import { View, Text,TouchableOpacity,AsyncStorage,Share } from 'react-native';
import {Icon,Button} from 'react-native-elements'
import {  UIActivityIndicator} from 'react-native-indicators';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'


const userId = AsyncStorage.getItem('userId')
const webToken = AsyncStorage.getItem('webtoken')


export default class CardButtonComponent extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      addedToCart:this.props.addedToCart,
      addedToWishList:this.props.addedToWishList,
      loadingWishList:false,
      loadingCart:false,
      userId:this.props.userId,
      webToken:this.props.webToken
    };
  }



  componentDidMount(){
    this._isMounted=true;
    AsyncStorage.multiGet(['userId','webtoken']).then(result => {
      // this.setState({
      //   userId:result[0][1],
      //     webToken:result[1][1],
      // })
      this.getAdded()
    })
 }

 componentWillUnmount(){
    this._isMounted=false
 }

 componentDidUpdate(prevProps,prevState){
  if(prevProps!=prevState){
    
      this.getAdded()
  
  }
 }
 

  getAdded=async()=>{
    const { postId,sellerId } = this.props
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/postAdded/${postId}`,
             { headers: { 'x-auth-token': this.state.webToken }
             })

            const data = await response.data
            if (this._isMounted) {
                await this.setState({
               addedToWishList: data.addedToWishList,
              addedToCart:data.addedToCart
              })
            }

        }

        catch (error) {
            alert('Something Failed, Could not connect to server')
        }

    }
  
    addToCart=()=>{
      const {sellerId,postId}=this.props
      this.setState({loadingCart:true})
      axios.post('https://slick-project.herokuapp.com/api/addToCart', {
              postId:postId,
              userId:this.state.userId
               }
               ,{
                headers:{
                  'x-auth-token':this.state.webToken
                }
              })
            .then(async(response)=> {
              if(response.status===200){
                await this.getAdded()
                this.setState({loadingCart:false})
                
              }          
            })
            .catch(function (error) {
              alert('Something failed, Could not connect to server')
              this.setState({loadingCart:false,addedToCart:this.props.addedToCart})
            });
    }

    removeFromCart=()=>{
      const {sellerId,postId}=this.props
      this.setState({loadingCart:true})
      axios.post('https://slick-project.herokuapp.com/api/removeFromCart', {
              postId:postId,
              userId:this.state.userId
               }
               ,{
                headers:{
                  'x-auth-token':this.state.webToken
                }
              })
            .then(async(response)=> {
               if(response.status===200){
                await this.getAdded()
                this.setState({loadingCart:false})
  
               }
            })
            .catch(function (error) {
              alert('Something failed, Could not connect to server')
              this.setState({loadingCart:false,addedToCart:this.props.addedToCart})
  });
    }
 

  addToWishList=()=>{
    const {sellerId,postId}=this.props
    this.setState({loadingWishList:true})
    axios.post('https://slick-project.herokuapp.com/api/addToWishList', {
            postId:postId,
            userId:this.state.userId
             }
             ,{
              headers:{
                'x-auth-token':this.state.webToken
              }
            })
          .then(async(response)=> {
            if(response.status===200){
              await this.getAdded()
              this.setState({loadingWishList:false})
              
            }          
          })
          .catch(function (error) {
            alert('Something failed, Could not connect to server')
            this.setState({loadingWishList:false,addedToWishList:this.props.addedToWishList})
          });
  }

  removeFromWishList=()=>{
    const {sellerId,postId}=this.props
    this.setState({loadingWishList:true})
    axios.post('https://slick-project.herokuapp.com/api/removeFromWishList', {
            postId:postId,
            userId:this.state.userId
             }
             ,{
              headers:{
                'x-auth-token':this.state.webToken
              }
            })
          .then(async(response)=> {
             if(response.status===200){
              await this.getAdded()
              this.setState({loadingWishList:false})
             }
          })
          .catch(function (error) {
            alert('Something failed, Could not connect to server')
            this.setState({loadingWishList:false,addedToWishList:this.props.addedToWishList})
});
  }

  shareLink=()=>{
    const {sellerId,postId,itemName}=this.props

    // console.log(sellerId,postId,itemName)
    //brandId//itemName//itemId
    let encodedLink=encodeURIComponent(`slick://share/item/${sellerId}/${itemName}/${postId}`)
    console.log(encodedLink)

    Share.share({
      message:`https://slick-project.herokuapp.com/api/deeplink?url=${encodedLink}`,
    })
      //after successful share return result
      .then(result => console.log(result))
      //If any thing goes wrong it comes here
      .catch(errorMsg => console.log(errorMsg));
  };
  
  

  render() {
    const {addedToCart,addedToWishList,loadingWishList,loadingCart}=this.state
    return (
        <View style={{flexDirection:'row',justifyContent:'space-around',marginTop:'auto',marginBottom:'auto'}}>
            <TouchableOpacity>
              {(!addedToCart.includes(this.state.userId)&&!loadingCart)&&<Icon reverse name='add-shopping-cart' type='material'  color='#517fa4' size={hp('3.5')} onPress={()=>{this.addToCart()}}/> }
              {(addedToCart.includes(this.state.userId)&&!loadingCart)&&<Icon reverse name='md-checkmark' type='ionicon'  color='#4CAF50' size={hp('3.5')} onPress={()=>this.removeFromCart()}/>}
              {loadingCart&&<UIActivityIndicator color='#517fa4' size={hp('3.5')}/>}
              </TouchableOpacity>
            <TouchableOpacity>
              {(!addedToWishList.includes(this.state.userId)&&!loadingWishList)&&<Icon reverse name='wunderlist' type='material-community' color='#00aced' size={hp('3.5')} onPress={()=>this.addToWishList()}/>}
              {(addedToWishList.includes(this.state.userId)&&!loadingWishList)&&<Icon reverse name='md-checkmark' type='ionicon'  color='#4CAF50' size={hp('3.5')} onPress={()=>this.removeFromWishList()}/>}
              {loadingWishList&&<UIActivityIndicator color='#00aced' size={hp('3.5')}/>}

            </TouchableOpacity>
            <TouchableOpacity onPress={()=>{this.shareLink()}}>
            <Icon reverse name='forward' type='entypo' color='#66b3ff' size={hp('3.5')}/>
            </TouchableOpacity>
        </View>
    );
  }
}
