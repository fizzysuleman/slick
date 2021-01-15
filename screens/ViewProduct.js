import React, { Component } from 'react';
import { View, Text,StyleSheet,StatusBar,Platform,ScrollView,AsyncStorage,Share } from 'react-native';
import {Container,ActionSheet} from 'native-base'
import {Icon,Header} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ViewProductContent from '../components/ViewProductContent'
import Dialog from "react-native-dialog";
import axios from 'react-native-axios'
import {withNavigation} from 'react-navigation'

var BUTTONS =
[
'Edit',
'Share link',
'Delete',
'Cancel'
];

// const userId = AsyncStorage.getItem('userId')
// const webToken = AsyncStorage.getItem('webtoken')
 

// var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 3;

class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
        item:this.props.navigation.state.params.item,
        visibleModal:false,
        dialogVisible:false,
        webToken:'',
        done:false

    };
  }

  closeModal=()=>{
    this.setState({visibleModal:false})
  }

  openAction=()=>{
    let {item}=this.state
    ActionSheet.show(
      {
        options: BUTTONS,
        cancelButtonIndex: CANCEL_INDEX,
      },
      buttonIndex => {
        if(buttonIndex==0){
           this.props.navigation.navigate('EditItem', {
            name: item.nameOfItem,
            price: item.price,
            tags: item.hashTags,
            colors: item.colorAvailable,
            sizes: item.sizeAvailable,
            location: item.location,
            school: item.school,
            category:item.category,
            negotiable:item.negotiable,
            postId:item._id
        })
        }
        else if(buttonIndex==1)
        {
          let encodedLink=encodeURIComponent(`slick://share/item/${item.brandId}/${item.nameOfItem}/${item._id}`)
          console.log(encodedLink)
      
          Share.share({
            message:`https://slick-project.herokuapp.com/api/deeplink?url=${encodedLink}`,
          })
            //after successful share return result
            .then(result => console.log(result))
            //If any thing goes wrong it comes here
            .catch(errorMsg => console.log(errorMsg));
        }
        else if(buttonIndex==2){
          this.setState({dialogVisible:true})
        }
        //this.setState({ category: BUTTONS[buttonIndex] });
      }
    )
  }
  
  componentDidMount() {
    AsyncStorage.multiGet(['userId','webtoken']).then(result => {
      this.setState({
          webToken:result[1][1],
          done:true
      })
  })

  }
 

  deletePost=()=>{
    const {item,done}=this.state
    if(done){
    axios.put('https://slick-project.herokuapp.com/api/deletePost', {
            postId:item._id,
            
             }
             ,{
              headers:{
                'x-auth-token':this.state.webToken
              }
            })
          .then(async(response)=> {
              await this.setState({dialogVisible:false})
              await this.props.navigation.goBack()

                     
          })
          .catch(function (error) {
            alert(error.response.data)
            this.setState({dialogVisible:false})
          });
        }
  }

 
  render() {
      const {item}=this.state

      const {goBack}=this.props.navigation
    return (
        <Container style={{backgroundColor:'#E8E8E8'}}>
        <Header
          leftComponent={ <Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { goBack() }}/>}
          centerComponent={{ text: `${item.nameOfItem}`, style: { color: 'black',fontSize:wp('4.5') } }}
          rightComponent={<Icon name='dots-three-vertical' type='entypo' color='black' size={hp('4')} onPress={() => { this.openAction() }}/>}
          containerStyle={{
            backgroundColor: '#6699ff',
            height:hp('12%'),
          }}
          />
        
       <ScrollView style={{}}>
        <ViewProductContent item={item} close={this.closeModal} visibleModal={this.state.visibleModal}/>
       </ScrollView>
       <Dialog.Container visible={this.state.dialogVisible}>
          <Dialog.Title>Delete confirmation</Dialog.Title>
          <Dialog.Description>
            Are you sure you want to delete this item?
          </Dialog.Description>
          <Dialog.Button label="Yes" onPress={()=>{this.deletePost()}} />
          <Dialog.Button label="No" onPress={()=>{this.setState({dialogVisible:false})}}/>
        </Dialog.Container>
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


  export default withNavigation(ViewProduct)