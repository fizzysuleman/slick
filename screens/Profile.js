import React, { Component } from 'react';
import { View, Text,StyleSheet,StatusBar,Platform } from 'react-native';
import{Container,Content} from 'native-base'
import AntDesign from 'react-native-vector-icons/AntDesign'
import ProfileEdit from '../components/ProfileEdit'
import {Icon,Header} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  goBack=()=>{
    this.props.navigation.goBack()
  }

  render() {
    return (
      <Container>
        <ProfileEdit goBack={this.goBack}/>
  </Container>
    );
  }
}

export default Profile;

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
  