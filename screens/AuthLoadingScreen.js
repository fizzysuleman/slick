import React from 'react';
import {
  ActivityIndicator,
  AsyncStorage,
  StatusBar,
  StyleSheet,
  View,
  Image,
  Dimensions
} from 'react-native';
import { AppLoading } from 'expo';
import * as SplashScreen from 'expo-splash-screen';
import { withNavigation,NavigationActions,StackActions } from 'react-navigation';

const height=Dimensions.get('window').height
const width=Dimensions.get('window').width


export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    SplashScreen.preventAutoHideAsync(); // Instruct SplashScreen not to hide yet
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let webToken=await AsyncStorage.getItem('webtoken')
    let userId=await AsyncStorage.getItem('userId')
    let account=await AsyncStorage.getItem('account')
    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //I am checking if there is webtoke toke in the async sotrage and storing it in actiontodispatch
    const actionToDispatch = StackActions.reset({
      index: 0,
      key:null,
      actions: [NavigationActions.navigate({routeName:(webToken||account||userId)?(account==='buyer'?'BuyerScreen':'SellerScreen'):'LoginBuyer'})] // Array!
    })
    SplashScreen.hide();
    console.log(actionToDispatch.actions[0].routeName)

    //if action to dispatch is buyerscreen or seller , it means the user is login
    if(actionToDispatch.actions[0].routeName==='BuyerScreen'||actionToDispatch.actions[0].routeName==='SellerScreen'){
      const params = this.props.navigation.state.params;
      //if there is paramter and its then navigate to viewItem search
      console.log(params)
      if(params&&params.routeName&&params.routeName==='item'){
        const actionToDispatch = StackActions.reset({
          index: 0,
          key:null,
         
          actions: [NavigationActions.navigate({routeName:'ViewItemShare',params:{
            itemBrandId:this.props.navigation.state.params.itemBrandId,
            itemName:this.props.navigation.state.params.itemName,
            itemId:this.props.navigation.state.params.itemId
          }})]
           
        })
        this.props.navigation.dispatch(actionToDispatch)
      }
      else{
        this.props.navigation.dispatch(actionToDispatch)
      }
    }
    else{
      this.props.navigation.dispatch(actionToDispatch)
}

    
};

  // Render any loading content that you like here
  render() {
    return (
      <View style={{height:height,width:width,flex:1}}>
        <Image source={require('../assets/splash.png')} style={{height:height,width:width}}/>
      </View>
    );
  }
}