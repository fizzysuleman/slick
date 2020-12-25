import React, { Component } from 'react';
import { View, Text,StyleSheet ,Platform,StatusBar} from 'react-native';
import {Container,Content} from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import WishListComponent from '../components/WishListComponent'
import {Icon,Header} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export default class WishList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
      const{goBack,navigate}=this.props.navigation
    return (
        <Container>
       <Header
          leftComponent={ <Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { goBack() }}/>}
          centerComponent={{ text: 'WishList', style: { color: 'black',fontSize:wp('5') } }}
          rightComponent={<Icon name='shoppingcart' type='antdesign' color='black' size={hp('4')} onPress={() => { navigate('Cart') }}/>}
          containerStyle={{
            backgroundColor: '#6699ff',
            height:hp('12%'),
          }}
          />
       
       
       
        
        <WishListComponent/>
        
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