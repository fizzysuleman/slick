import React, { Component } from 'react';
import { View, Text,StatusBar } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NetInfo from "@react-native-community/netinfo";


export default class OfflineNotice extends Component {
  constructor(props) {
    super(props);
    this.state = {
        isConnected:null,
        hiddenStatusBar:false
    };
  }

  componentWillMount(){
      this.checkOnlineStatus()
  }


  checkOnlineStatus=()=> {
    NetInfo.addEventListener(this._handleConnectivityChange );
    NetInfo.fetch().done(
        (isConnected) => { this.setState({isConnected}); }
    );
  }

  componentWillUnmount() {
    NetInfo.addEventListener(this._handleConnectivityChange);
  }

  _handleConnectivityChange = (isConnected) => {
    this.setState({
      isConnected,
    });
    if(isConnected==false){
        this.setState({hiddenStatusBar:true})
    }
    else{
        this.setState({hiddenStatusBar:true})
    }

  }


  render() {
      if(!this.state.isConnected){
    return (
        <View>
        <StatusBar hidden={this.state.hiddenStatusBar} />

        <View style={{width:wp('100'),backgroundColor:'#e74c3c',alignItems:'center'}}>
        <Text style={{color:'white', padding:wp('1.5'),justifyContent:'center',textAlign:'center'}} >No Internet Connection</Text>
      </View>
      </View>
    );
      }
      else{
          return null
      }
  }
}
