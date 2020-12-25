import React, { Component } from 'react';
import { View, Text,StyleSheet ,Dimensions} from 'react-native';
import {Container, Content} from 'native-base'
import PaymentHistoryItems from '../components/PaymentHistoryItems'
import {Header,Icon} from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const height=Dimensions.get('window').height

class PaymentHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const{goBack}=this.props.navigation
    return (
      <View style={{height:height,backgroundColor:'grey'}}>
       <Container style={{backgroundColor:'#e8e8e8'}}>
       <Header
          leftComponent={ <Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { goBack() }}/>}
          centerComponent={{ text: 'Payment History', style: { color: 'black',fontSize:wp('5') } }}
          containerStyle={{
            backgroundColor: '#6699ff',
            height:hp('12%'),
          }}
          />
        
        <Content>
        <PaymentHistoryItems/>
        </Content>
        

      </Container>

      </View>
    );
  }
}

export default PaymentHistory;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
  