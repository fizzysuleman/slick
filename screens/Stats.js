import React, { Component } from 'react';
import { View, Text,StyleSheet,Platform,StatusBar,AsyncStorage } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import {Container,Content} from 'native-base'
import StatsView from '../components/StatsView'
import {Icon,Header} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const userId=AsyncStorage.getItem('userId')


export default class Stats extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
    };
  }

  render() {
    const {userId}=this.state
    return (
      <Container style={{backgroundColor:'#E8E8E8'}}>
       <Header
          leftComponent={ <Icon name='ios-add-circle-outline' type='ionicon'  size={hp('5')} onPress={() => {this.props.navigation.navigate('AddItem')}}/>}
          containerStyle={{
            backgroundColor: '#6699ff',
            height:hp('12%'),
          }}
          /> 
       {/* <Content> */}
         <StatsView userId={userId}/>
       {/* </Content> */}
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