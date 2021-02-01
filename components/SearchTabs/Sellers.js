import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity,Image,AsyncStorage } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import {withNavigation} from 'react-navigation'

const userId = AsyncStorage.getItem('userId')


class Seller extends PureComponent {
 constructor(props) {
    super(props);
    this.state = {
      
    }
  }
  
  viewSeller = (brandName,id) => {
    this.props.navigation.navigate('ViewSeller', {
        brandName: brandName,
        userId:id
    })

}
  

  render() {
  console.log(userId._W)
    return (

    this.props.searchTerm.length>0 &&   <ScrollView>
          {this.props.searchItems.map((item,index) => {
            return (
              (this.props.searchItems.length>0 &&item._id!=userId._W)?<TouchableOpacity onPress={()=>this.viewSeller(item.brandName,item._id)} key={item._id} style={styles.emailItem}>
                <View style={{flexDirection:'row'}}>
                    <Image resizeMode="contain" source={item.imageUrl?{uri:item.imageUrl}:require('../../assets/me.png')} style={{width:wp('10'),height:wp('10'),borderRadius: wp('5'),marginRight:wp('2')}}/>
                <View>
                  <Text>{item.brandName}</Text>
                  <Text style={styles.emailSubject}>Sells: {item.sells}</Text>
                </View>
                </View>
              </TouchableOpacity>:null
            )
          })}
           {(this.props.finished&&this.props.searchItems.length==0)&&<View style={{padding:wp('2')}}><Text style={{fontSize:wp('4.5'),color:'grey'}}>No brand sellers found</Text></View>}
           {/* {(item.brandId!=userId._55)&&<View style={{padding:wp('2')}}><Text style={{fontSize:wp('4.5'),color:'grey'}}>No brand sellers found</Text></View>} */}
       </ScrollView>
    );
  }
}
 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'flex-start'
  },
  emailItem:{
    borderBottomWidth: hp('0.1'),
    borderColor: '#e8e8e8',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)'
  },
  searchInput:{
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});

export default withNavigation(Seller)