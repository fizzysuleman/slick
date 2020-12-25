import React from 'react';
import { StyleSheet, Text, View ,Image} from 'react-native';
import {createAppContainer,createBottomTabNavigator,createDrawerNavigator} from 'react-navigation'
import AntDesign from 'react-native-vector-icons/AntDesign'
import Home from './Home'
import Search from './Search'
import Message from './Message'
import CustomDrawerContentComponent from '../components/CustomDrawerContentComponent'
import Foundation from 'react-native-vector-icons/Foundation'
import Stats from './Stats'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


//For the bottom navigation
const bottomTabNavigator= createBottomTabNavigator({
  Home:{
    screen:Home,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(
        <AntDesign name='eyeo' style={{color:tintColor,fontSize: wp('5')}}/>
    )
    
    }
  },
//   Message:{
//     screen:Message,
//     navigationOptions:{
//       tabBarIcon:({tintColor})=>(
// <AntDesign name='message1' style={{color:tintColor,fontSize:wp('4')}}/>    )
    
//     }
//   },
  Search:{
    screen:Search,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(
        <AntDesign name='search1' style={{color:tintColor,fontSize:wp('4')}}/>
    )
    
    }
  },
  Stats:{
    screen:Stats,
    navigationOptions:{
      tabBarIcon:({tintColor})=>(
        <Foundation name='graph-trend' style={{color:tintColor,fontSize:wp('6')}}/>
    )
    
    }
  }
},{
  tabBarOptions:{
    activeTintColor:'#6699ff',
    inactiveTintColor:'black',
    animationEnabled:true,
  swipeEnabled:true,
    style:{
      height: hp('7'),
      backgroundColor:'white',
      borderTopWidth:1,
      borderTopColor:'#e8e8e8',
       elevation:5,
       
    }
  }
})

const BuyerScreen = createDrawerNavigator({
  Home:{
      screen: bottomTabNavigator
  }
},{
  drawerPosition:'left',
  drawerWidth:wp(80),
  contentComponent:CustomDrawerContentComponent,
  drawerOpenRoute:'DrawerOpen',
  drawerCloseRoute:'DrawerClose',
  drawerToggleRoute:'DrawerToggle'
});




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default createAppContainer(BuyerScreen)