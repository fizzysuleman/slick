import React, { Component } from 'react';
import {View,Text} from 'react-native'
import { Container, Header, Content, ListItem, Radio, Right, Left } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {Icon} from 'react-native-elements'


export default class PaymentItems extends Component {
  render() {
    return (
      <Container>
        
        <Content>
            <View style={{height:hp('8'),borderBottomColor:'#e8e8e8',borderBottomWidth:2}}>
                <Text style={{marginTop:'auto',marginBottom:'auto',paddingLeft:10,fontSize:wp('4.5')}}>Select Payment Method</Text>
            </View>
          <ListItem style={{height:hp('8')}}>
            <Left>
               <Icon name='creditcard' type='antdesign' size={wp('6')} style={{marginRight: 5,}}/> 
              <Text style={{fontSize:wp('4.5')}}>Add Your Card</Text>
            </Left>
          </ListItem>
          <ListItem style={{height:hp('8')}}>
            <Left>
              <Icon name='cash-multiple' type='material-community' size={wp('6')} style={{marginRight: 5}}/>
              <Text style={{fontSize:wp('4.5')}}>Cash</Text>
            </Left>
            <Right>
              <Radio selected={true} />
            </Right>
          </ListItem>
        </Content>
      </Container>
    );
  }
}