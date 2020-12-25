import React, { PureComponent } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image,AsyncStorage } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';
import {withNavigation} from 'react-navigation'

const webToken = AsyncStorage.getItem('webtoken')

 class Tags extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searching:false,
      searchItems:[],
      userId:''
    };
  }

  componentDidMount() {

    //when the component is mounted get the userID and the webtoken 
    AsyncStorage.multiGet(['userId', 'webtoken']).then(result => {
      this.setState({
        userId: result[0][1],
        //webToken: result[1][1],
      })

    })

  }

  viewProduct = (brandId,name,id) => {
    this.props.navigation.navigate('ViewItemSearch', {
        itemBrandId: brandId,
        itemName:name,
        itemId:id
    })

}

  render() {
    return (

      this.props.searchTerm.length > 0 && <ScrollView style={{marginBottom:hp("10")}}>
        {this.props.searchItems.map((item, index) => {
          return (
            (this.props.searchItems.length > 0 && item.brandId != this.state.userId)?<TouchableOpacity onPress={() =>this.viewProduct(item.brandId,item.nameOfItem,item._id) } key={item._id} style={styles.emailItem}>
              <View style={{flexDirection:'row',justifyContent:'space-between'}}>
              <View style={{ flexDirection: 'row' }}>
                <Image resizeMode="contain" source={{uri:item.imageUrl[0]}} style={{ width: wp('10'), height: wp('10'), borderRadius: wp('5'), marginRight: wp('2') }} />
                <View>
                  <Text>{item.nameOfItem}</Text>
                  <Text style={styles.emailSubject}>{item.brandName}</Text>
                </View>
              </View>
                <View style={{justifyContent:'center',backgroundColor:'#6699ff',padding:wp('1'),borderBottomLeftRadius:wp('1') ,borderTopLeftRadius:wp('1') }}>
                <NumberFormat
                                value={item.price}
                                displayType={'text'}
                                prefix={'₦'}

                                thousandSeparator={true}
                                renderText={value =>
                                  <Text style={{fontSize:wp('4'),color:'white',fontWeight:'bold'}}>{value}</Text>}
                                  />
                </View>
              </View>
            </TouchableOpacity>:null
          )
        })}
        {this.state.searching?<View><Text style={{color:'grey'}}>Searching for {this.props.searchTerm} ...</Text></View>:null}
        {(this.props.finished&&this.props.searchItems.length==0)&&<View style={{padding:wp('2')}}><Text style={{fontSize:wp('4.5'),color:'grey'}}>No items or tags found</Text></View>}
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
  emailItem: {
    borderBottomWidth: hp('0.1'),
    borderColor: '#e8e8e8',
    padding: 10
  },
  emailSubject: {
    color: 'rgba(0,0,0,0.5)',
    fontSize: wp('3')
  },
  searchInput: {
    padding: 10,
    borderColor: '#CCC',
    borderWidth: 1
  }
});

export default withNavigation(Tags)