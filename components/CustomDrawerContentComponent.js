import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar, Dimensions, Share, AsyncStorage, TouchableOpacity,Linking } from 'react-native';
import { Container, Content, Header, Left, Right, Item, Thumbnail, Body, ListItem } from 'native-base'
import EvilIcon from 'react-native-vector-icons/EvilIcons'
import MaterialCommuntiyIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FeatherIcon from 'react-native-vector-icons/Feather'
import { Icon } from 'react-native-elements'
import { withNavigation, NavigationActions, StackActions } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Rate, { AndroidMarket } from 'react-native-rate'



const height = Dimensions.get('window').height
export default class CustomDrawerContentComponent extends React.Component {
  constructor() {
    super()
    this.state = {
      username: '',
      fullName: '',
      done: false

    }
  }
  componentDidMount() {
    AsyncStorage.multiGet(['username', 'fullName']).then(result => {
      this.setState({
        username: result[0][1],
        fullName: result[1][1],
        done: true
      })

    })
    console.log('tt')
  }

  logOut = () => {
    let keys = ['webtoken', 'userId', 'account', 'fullName', 'username'];
    AsyncStorage.multiRemove(keys, (err) => {

      const actionToDispatch = StackActions.reset({
        index: 0,
        key: null,
        actions: [NavigationActions.navigate({ routeName: 'LoginBuyer' })] // Array!
      })
      this.props.navigation.dispatch(actionToDispatch)
      // this.props.navigation.navigate('LoginBuyer')
    });
  }

  shareApp = () => {
    Share.share({
      message: 'I am inviting you to use Slick app, to buy or sell items, if your device is an android download from this link https://play.google.com/store/apps/details?id=com.slick.slick , or an iOS device from this link https://apps.apple.com/ca/app/slick-buy-and-sell/id1510237901'
    })
      //after successful share return result
      .then(result => console.log(result))
      //If any thing goes wrong it comes here
      .catch(errorMsg => console.log(errorMsg));
  }

  rateApp=()=>{
    if(Platform.OS=="ios")
    {
      Linking.openURL("https://apps.apple.com/ca/app/slick-buy-and-sell/id1510237901")
    }
    else if(Platform.OS=="android")
    {
      Linking.openURL("https://play.google.com/store/apps/details?id=com.slick.slick")
    }
  }

  render() {
    const { navigate, push } = this.props.navigation
    return (
      <Container style={{ height: height }}>

        <View style={[{ marginTop: hp('5'), flexDirection: "column", borderBottomWidth: 1, borderBottomColor: '#E8E8E8', alignItems: "center", padding: wp('4') }, styles.androidHeader]}>
          {/* <View style={{ alignItems: 'center' }}>
            <Thumbnail style={{width:wp('16'),height:wp('16'),borderRadius:wp('8')}} source={require('../assets/me.png')} />
          </View> */}
          {(this.state.done) && <Text style={{ fontSize: wp('4') }} >{this.state.fullName}</Text>}
          {(this.state.done) && <Text style={{ color: 'grey', fontSize: wp('3.5') }} >{this.state.username}</Text>}
          <Text style={{ color: '#6699ff', fontSize: wp('4.5') }} onPress={() => { navigate('Profile') }}>Edit profile</Text>
        </View>

        <View style={{ paddingHorizontal: hp('5'), paddingVertical: wp('10') }}>

          {/* <View style={{flexDirection:'row', margin:14}}>
            <Icon name='payment'type='material' size={hp('4')} />
            <Text style={{fontSize:wp('4'), marginLeft:4}} onPress={()=>{navigate('Payment')}}>Payment</Text>
          </View> */}
          {/* <View style={{flexDirection:'row', margin:14}}>
            <AntDesign name='setting' style={{fontSize:25}} />
            <Text style={{fontSize:wp('4.5'), marginLeft:4}}>Settings</Text>
          </View> */}

          {/* <View style={{flexDirection:'row', margin:14}}>
            <Icon name='history' type='material-community' size={wp("5.8")} />
            <Text style={{fontSize:wp('4'), marginLeft:4}} onPress={()=>{navigate('PaymentHistory')}}>Payment history</Text>
          </View> */}
          <TouchableOpacity style={{ flexDirection: 'row', margin: 14 }} onPress={() => { navigate('WishList') }}>
            <Icon name='wunderlist' type='material-community' size={hp('4')} />
            <Text style={{ fontSize: wp('4'), marginLeft: 4, marginTop: 'auto', marginBottom: 'auto' }}  >Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', margin: 14 }} onPress={() => { navigate('ChangePassword') }}>
            <Icon name='key-change' type='material-community' size={wp("5.8")} />
            <Text style={{ fontSize: wp('4'), marginLeft: 4 }}>Change Password</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', margin: 14 }} onPress={() => { navigate('ReportBug') }}>
            <Icon name='bug-report' type='material' size={wp("5.8")} />
            <Text style={{ fontSize: wp('4'), marginLeft: 4 }} >Report a Bug</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', margin: 14 }} onPress={() => { navigate('ContactUs') }}>
            <Icon name='ios-contact' type='ionicon' size={wp("6")} />
            <Text style={{ fontSize: wp('4'), marginLeft: 4 }} >Contact Us</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', margin: 14 }} onPress={() => { this.shareApp() }}>
            <Icon name='share' type='feather' size={wp("5.8")} />
            <Text style={{ fontSize: wp('4'), marginLeft: 4 }} >Share this app</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ flexDirection: 'row', margin: 14 }}
            // onPress={() => {
            //   let options = {
            //     AppleAppID:"1510237901",
            //     GooglePackageName:  "com.slick.slick",
            //     preferredAndroidMarket: AndroidMarket.Google,
            //     preferInApp: true,
            //     openAppStoreIfInAppFails: true,
            //   }
            //   Rate.rate(options, success => {
            //     if (success) {
            //       // this technically only tells us if the user successfully went to the Review Page. Whether they actually did anything, we do not know.
            //       console.log('done', success)
            //     }
            //   })
            // }
            // }
            onPress={()=>{this.rateApp()}}
          >
            <Icon name='star' type='feather' size={wp("5.8")} />
            <Text style={{ fontSize: wp('4'), marginLeft: 4 }} >Rate Us🙏</Text>
          </TouchableOpacity>


        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <TouchableOpacity style={{ flexDirection: 'row', backgroundColor: '#6699ff', paddingTop: wp('3'), paddingBottom: wp('3'), paddingLeft: wp('10') }} onPress={() => this.logOut()}>
            <Icon name='logout' type='antdesign' size={wp("5.8")} />
            <Text style={{ fontSize: wp('4'), marginLeft: 4 }}  >Logout</Text>
          </TouchableOpacity>
        </View>



      </Container>
    )
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
