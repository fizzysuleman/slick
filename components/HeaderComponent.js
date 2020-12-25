import React, { Component } from 'react';
import { View, Text,Platform,StatusBar,StyleSheet } from 'react-native';
import {Header,Left,Body,Right} from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Icon from 'react-native-vector-icons/FontAwesome'
import EvilIcon from 'react-native-vector-icons/EvilIcons'


export default class HeaderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
        <Header style={[{backgroundColor: '#6699ff',height:70,borderBottomColor:'white'},styles.androidHeader]}>
        <Left style={{flex:1}}><EvilIcon name='user' style={{fontSize:35}} /></Left>
        <Right style={{flex:1}}><AntDesign name='shoppingcart' style={{fontSize:25}}/></Right>
      </Header>
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



