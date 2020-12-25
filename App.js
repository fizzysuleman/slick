import React from 'react';
import { StyleSheet, Text, View, Image ,AsyncStorage} from 'react-native';
import { createAppContainer, createBottomTabNavigator, createStackNavigator, createDrawerNavigator } from 'react-navigation'
import { Root } from "native-base";
import WishList from './screens/WishList'
import PaymentScreen from './screens/Payment'
import PaymentHistory from './screens/PaymentHistory'
import CustomDrawerContentComponent from './components/CustomDrawerContentComponent'
import Profile from './screens/Profile'
import Cart from './screens/Cart'
import LoginBuyer from './screens/LoginBuyer'
import LoginSeller from './screens/LoginSeller'
import BuyerScreen from './screens/BuyerScreen'
import SellerScreen from './screens/SellerScreen'
import Recommended from './screens/Recommended'
import About from './screens/About'
import ViewProduct from './screens/ViewProduct'
import AddItem from './screens/AddItem'
import AddItemPhotos from './screens/AddItemPhotos'
import CreateAccount from './screens/CreateAccount'
import CreateAccountBuyer from './screens/CreateAccountBuyer'
import CreateAccountBuyer2 from './screens/CreateAccountBuyer2'
import CreateAccountSeller from './screens/CreateAccountSeller'
import CreateAccountSeller2 from './screens/CreateAccountSeller2'
import VerifyEmailBuyer from './screens/VerifyEmailBuyer'
import VerifyEmailSeller from './screens/VerifyEmailSeller'
import ViewItemSearch from './screens/ViewItemSearch'
import ViewSeller from './screens/ViewSeller'
import EditItem from './screens/EditItem';
import Category from './screens/Category'
import OfflineNotice from './components/OfflineNotice';
import ChangePassword from './screens/ChangePassword';
import ForgotPassword from './screens/ForgotPassword';
import ForgotPasswordToken from './screens/ForgotPasswordToken';
import ChangeForgotPassword from './screens/ChangeForgotPassword';
import ContactUs from './screens/ContactUs';
import * as Expo from 'expo'
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import ReportBug from './screens/ReportBug';
import AppIntro from './screens/AppIntro';
import ViewItemShare from './screens/ViewItemShare'

// console.log(userId._55,account._55)



const StackNavigator = createAppContainer(createStackNavigator({
  
  AuthLoading:{
    screen:AuthLoadingScreen,
    path:'share/:routeName/:itemBrandId/:itemName/:itemId'
  },
  LoginBuyer: {
    screen: LoginBuyer
  },
  LoginSeller: {
    screen: LoginSeller
  },
  SellerScreen: {
    screen: SellerScreen
  },
  BuyerScreen: {
    screen: BuyerScreen
  },
  AppIntro:{
    screen:AppIntro
  },
  Profile: {
    screen: Profile
  },
  Cart: {
    screen: Cart
  },
  WishList: {
    screen: WishList
  },
  Payment: {
    screen: PaymentScreen
  },
  // PaymentHistory: {
  //   screen: PaymentHistory
  // },
  // Recommended: {
  //   screen: Recommended
  // },
  About: {
    screen: About
  },
  ViewProduct: {
    screen: ViewProduct
  },
  AddItem: {
    screen: AddItem
  },
  AddItemPhotos: {
    screen: AddItemPhotos
  },
  CreateAccount: {
    screen: CreateAccount
  },
  CreateAccountBuyer: {
    screen: CreateAccountBuyer
  },
  CreateAccountBuyer2: {
    screen: CreateAccountBuyer2
  },
  CreateAccountSeller: {
    screen: CreateAccountSeller
  },
  CreateAccountSeller2: {
    screen: CreateAccountSeller2
  },
  VerifyEmailBuyer: {
    screen: VerifyEmailBuyer
  },
  VerifyEmailSeller: {
    screen: VerifyEmailSeller
  },
  ViewItemSearch: {
    screen: ViewItemSearch,
    path:'item'
  },
  ViewItemShare:{
    screen:ViewItemShare
  },
  ViewSeller: {
    screen: ViewSeller
  },
  EditItem: {
    screen: EditItem
  },
  Category: {
    screen: Category
  },
  ChangePassword: {
    screen: ChangePassword
  },
  ForgotPassword: {
    screen: ForgotPassword
  },
  ForgotPasswordToken:{
    screen:ForgotPasswordToken
  },
  ChangeForgotPassword:{
    screen:ChangeForgotPassword
  },
  ContactUs:{
    screen:ContactUs
  },
  ReportBug:{
    screen:ReportBug
  }

}, {
    initialRouteName:'AuthLoading',
    headerMode: 'none',
  })

)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const prefix = Expo.Linking.makeUrl('/');
console.log(prefix)


export default () =>
  <Root>
        <OfflineNotice />

    <StackNavigator uriPrefix={prefix}/>
  </Root>;


//export default createAppContainer(StackNavigator)