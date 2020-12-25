import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, AsyncStorage } from 'react-native';
import SearchInput, { createFilter } from 'react-native-search-filter';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextField from 'react-native-text-field'
import axios from 'react-native-axios'
import NumberFormat from 'react-number-format';
import {withNavigation} from 'react-navigation'


// const webToken = AsyncStorage.getItem('webtoken')
const userId = AsyncStorage.getItem('userId')


class Location extends Component {
    constructor(props) {
        super(props);
        this.state = {
            locationSearchText: '',
            searchAvailableInItems: [],
            loading:false,
            finishedLocation:false,
            webToken:'',
            done:false,
            userId:""
        };
    }

    componentDidMount() {
        AsyncStorage.multiGet(['userId','webtoken']).then(result => {
          this.setState({
            userId: result[0][1],
            webToken:result[1][1],
              done:true
          })
      })
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.searchTerm !== prevProps.searchTerm) {
            if(this.state.done){
            this.getItemLocation();
            }
        }
    }

    getItemLocation = async () => {
        this.setState({loading:true})
        if(this.state.done){
        try {
            // this.setState({loading:true})
            const response = await axios.get(`https://slick-project.herokuapp.com/api/search/availableIn?searchTerm=${this.props.searchTerm}&searchLocation=${this.state.locationSearchText}`,
                {
                    headers: { 'x-auth-token': this.state.webToken }
                })

            const data = await response.data
            await this.setState({
                searchAvailableInItems: data,
                loading:false,
                finishedLocation:true
            })
        
        }



        catch (error) {
            alert('Something Failed, Could not connect to server')
        }
    }
    }

    onInputChange = async (text) => {
        await this.setState({ locationSearchText: text })
        this.getItemLocation()
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
            <View>
                <TextField
                    placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                    textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                    placeholder="In which location..."
                    cellHeight={hp('7')}
                    value=""
                    
                    textType="default"
                    onInputChange={(text) => this.onInputChange(text)}
                />

                {(this.state.locationSearchText.length === 0 && this.props.searchTerm.length > 0) && <ScrollView>
                    {this.props.searchItems.map((item, index) => {
                        return (
                            (this.props.searchItems.length>0 &&item.brandId!=this.state.userId)? <TouchableOpacity onPress={() =>this.viewProduct(item.brandId,item.nameOfItem,item._id) } key={item._id} style={styles.emailItem}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image resizeMode="contain" source={{ uri: item.imageUrl[0] }} style={{ width: wp('10'), height: wp('10'), borderRadius: wp('5'), marginRight: wp('2') }} />
                                        <View>
                                            <Text>{item.nameOfItem}</Text>
                                            <Text style={styles.emailSubject}>{item.brandName}</Text>
                                            <Text style={styles.emailSubject}>{item.location}</Text>

                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'center', backgroundColor: '#6699ff', padding: wp('1'), borderBottomLeftRadius: wp('1'), borderTopLeftRadius: wp('1') }}>
                                        <NumberFormat
                                            value={item.price}
                                            displayType={'text'}
                                            prefix={'₦'}

                                            thousandSeparator={true}
                                            renderText={value =>
                                                <Text style={{ fontSize: wp('4'), color: 'white', fontWeight: 'bold' }}>{value}</Text>}
                                        />
                                    </View>
                                </View>
                            </TouchableOpacity> : null
                        )
                    })}
                    {(this.props.finished&&this.props.searchItems.length==0)&&<View style={{padding:wp('2')}}><Text style={{fontSize:wp('4.5'),color:'grey'}}>No items or tags found</Text></View>}
                </ScrollView>}
                {(this.state.locationSearchText.length > 0) && <ScrollView>
                    {this.state.searchAvailableInItems.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() =>this.viewProduct(item,item._id) } key={item._id} style={styles.emailItem}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ flexDirection: 'row' }}>
                                        <Image resizeMode="contain" source={{ uri: item.imageUrl[0] }} style={{ width: wp('10'), height: wp('10'), borderRadius: wp('5'), marginRight: wp('2') }} />
                                        <View>
                                            <Text>{item.nameOfItem}</Text>
                                            <Text style={styles.emailSubject}>{item.brandName}</Text>
                                            <Text style={styles.emailSubject}>{item.location}</Text>

                                        </View>
                                    </View>
                                    <View style={{ justifyContent: 'center', backgroundColor: '#6699ff', padding: wp('1'), borderBottomLeftRadius: wp('1'), borderTopLeftRadius: wp('1') }}>
                                        <NumberFormat
                                            value={item.price}
                                            displayType={'text'}
                                            prefix={'₦'}

                                            thousandSeparator={true}
                                            renderText={value =>
                                                <Text style={{ fontSize: wp('4'), color: 'white', fontWeight: 'bold' }}>{value}</Text>}
                                        />

                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    })}
                    {this.state.loading?<View><Text style={{color:'grey'}}>Searching for {this.props.searchTerm} in {this.state.locationSearchText}..</Text></View>:null}
                    {(this.state.finishedLocation&&this.state.searchAvailableInItems.length==0)&&<View style={{padding:wp('2')}}><Text style={{fontSize:wp('4.5'),color:'grey'}}>No item with that particular location was found</Text></View>}

            </ScrollView>}
            </View>
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

export default withNavigation(Location)