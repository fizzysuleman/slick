import React, { PureComponent } from 'react';
import {ActivityIndicator,StyleSheet, View, Text, Image, TouchableOpacity, RefreshControl,FlatList } from 'react-native';
import { withNavigation } from 'react-navigation';
import { Icon, Header } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AsyncStorage } from 'react-native';
import axios from 'react-native-axios'
import NumberFormat from 'react-number-format';
import { Content, Container } from 'native-base'
import StarRating from './StarRating';
import RatingModal from './RatingModal';
import DropdownAlert from 'react-native-dropdownalert'


const webToken = AsyncStorage.getItem('webtoken')
const userId = AsyncStorage.getItem('userId')


class ViewSellerContent extends PureComponent {
    _isMounted = false;
    constructor(props) {
        super(props);
        this.state = {
            isRefreshing: false,
            userId: this.props.userId,
            finished:false,
            sellerId:'',
            user: [],
            cards: [],
            averageRating:0,
            peopleRated:0,
            modalVisible:false,
            previousRating:null,
            previouslyRated:false,
            fetching:false,
            page:0,
            end:false,
            storageUserId:'',
            webToken:'',
            done:false
        };
    }

    async componentDidMount() {

        AsyncStorage.multiGet(['userId','webtoken']).then(result => {
            this.setState({
                storageUserId:result[0][1],
                webToken:result[1][1],
                done:true
            })
            this.getUserDetails()
            this.getItemDetails()
            this.getAverageRating()
            this.getRatingDetails()
        })
        
        this.checkInternetConnection()
        // this.subs1=this.props.navigation.addListener('didFocus', (payload) => this.getItemDetails(payload))
        // this.sub2=this.props.navigation.addListener('didFocus', (payload) => this.getUserDetails(payload))

    }

    checkInternetConnection=async()=>{
        setTimeout(() => {
          fetch('https://www.google.com')
          .then((response)=>{
            //just continue with the normal process
          })
          .catch((err)=>{
            alert('Could not connect to the internet, Please check your connection and try again')
            this.setState({loading:false})
    
          })
        }, 60000);
      }

    getAverageRating = async () => {
        const { userId } = this.state
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/averageRating/${userId}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data

            await this.setState({
                 averageRating: data.averageRating,
                 peopleRated:data.ratingNumber 
                })

        }

        catch (error) {
               alert('Something Failed, Could not connect to server')
        }

    }

    
    

    getUserDetails = async () => {
        const { userId } = this.state
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/sellerProfile/${userId}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data
            await this.setState({ user: data })

        }

        catch (error) {
               alert('Something Failed, Could not connect to server')
        }

    }

    getItemDetails = async () => {
        const { userId } = this.state
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/sellerItems/${userId}?page=${this.state.page}&pageSize=${5}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data

            await this.setState({ 
                cards: data,
                finished:true
            })

        }

        catch (error) {
               alert('Something Failed, Could not connect to server')
        }

    }

    renderFooter() {
        return (
          //Footer View with Load More button
          (this.state.finished&&!this.state.end)&&<View style={styles.footer}>
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={this.loadMoreData}
            //On Click of button calling loadMoreData function to load more data
            style={styles.loadMoreBtn}>
            <Text style={styles.btnText}>Load More</Text>
            {this.state.fetching ? (
              <ActivityIndicator color="white" style={{ marginLeft: 8 }} />
            ) : null}
          </TouchableOpacity>
        </View>
        );
      }


      loadMoreData=async()=>{
        await this.setState({page:this.state.page+1,fetching:true})
        if(this.state.done){
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/sellerItems/${this.state.userId}?page=${this.state.page}&pageSize=${5}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data
            if(data.length>0){
                this.setState({ 
                    cards:[...this.state.cards,...data],
                    fetching:false })
            }
            else{
                this.setState({
                    fetching:false,
                    end:true
                })
            }
    
        }

        catch (error) {
               alert('Something Failed, Could not connect to server')
        }
    }
    }



    viewProduct = (brandId,name,id) => {
        this.props.navigation.navigate('ViewItemSearch', {
            itemBrandId: brandId,
            itemName:name,
            itemId:id
        })
    
    }

    renderItems = () => {
        const { cards } = this.state
        return <FlatList
            data={cards}
            keyExtractor={item => item._id}
            // onEndReached={!(this.state.end)?this.loadMoreData:null}
            // onEndReachedThreshold ={0.3}
            ListFooterComponent={this.renderFooter.bind(this)}
            renderItem={({ item }) =>
                <TouchableOpacity 
                    style={{ padding: wp('1'), flexDirection: 'row', marginBottom: hp('3'), borderBottomColor: '#e8e8e8', borderBottomWidth: hp('0.1') }}
                    onPress={() => this.viewProduct(item.brandId,item.nameOfItem,item._id)}
                >
                    <View
                        style={{ justifyContent: 'flex-start', paddingLeft: wp('2') }}>
                        <Image resizeMode='contain'
                            source={{ uri: `${item.imageUrl[0]}` }}
                            style={{ width: wp('20'), height: wp('20') }} />
                    </View>
                    <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                        <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Text style={{ fontSize: wp('3.8') }} >{item.nameOfItem}</Text>
                        </View>
                        <View style={{ marginLeft: 'auto', marginRight: 'auto', marginTop: hp('2'), borderRadius: 3, backgroundColor: '#6699ff' }}>
                            <NumberFormat
                                value={item.price}
                                displayType={'text'}
                                prefix={'₦'}

                                thousandSeparator={true}
                                renderText={value => <Text style={{ color: 'white', padding: 5, fontSize: wp('4') }}>{value}</Text>}
                            />
                        </View>
                        {item.blocked === true ? <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                            <Text style={{ color: 'red' }}>Blocked!!</Text>
                        </View> : null}
                    </View>

                </TouchableOpacity>

            }
        />
    }


   
    getRatingDetails = async () => {
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/ratingPost/${this.state.storageUserId}/${this.state.userId}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data
            this.setState({
                previousRating:data.rating,
                previouslyRated:true
            })            

        }
        catch (error) {
            if(error.response.status==404){
                this.setState({
                    previouslyRated:false
                })
            }
            else{
                   alert('Something Failed, Could not connect to server')
            }
        }

    }

    _toggleModal = async(sellerId) => {
       await  this.getRatingDetails()

        this.setState({
            modalVisible: true,
            sellerId
        });
    }

        _toggleCloseModal = () => {
            this.setState({ modalVisible: false })

        }
        _toggleCloseSubmitModal = () => {
            this.setState({ modalVisible: false })
            this.dropdown.alertWithType('success', 'Success', 'Rated Seller');

        }


    _onRefresh = async () => {
        await this.setState({ isRefreshing: true,end:false })
        if(this.state.done){
        await this.getUserDetails()
        await this.getItemDetails()
        await this.getAverageRating()
        .then(() => {
          this.setState({isRefreshing: false});
    })
}
    }
    render() {
        const { cards,finished } = this.state

        return (
            
            <Content style={{}} refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} />} >
                <View style={{ backgroundColor: 'white', flexDirection: 'row', justifyContent: 'flex-start', paddingBottom: hp('3'), paddingTop: hp('3'), borderBottomWidth: 2, borderBottomColor: "#e8e8e8" }}>
                    <View
                        style={{ justifyContent: 'flex-start', paddingLeft: hp('1.5') }}>
                        <Image source={this.state.user.imageUrl?{uri:this.state.user.imageUrl}:require('../assets/me.png')}
                            style={{ width: wp('16'), height: wp('16'), borderRadius: wp('8') }} />
                    </View>
                    <View style={{ justifyContent: 'flex-start', paddingLeft: hp('1') }}>
                        <Text style={{ fontSize: wp('4') }}>{this.state.user.brandName}</Text>
                        <Text style={{ fontSize: wp('4') }}>Sells: {this.state.user.sells}</Text>
                        <Text style={{ color: 'grey', fontSize: wp('3') }}>Available at: {this.state.user.location} </Text>
                        {this.state.user.website?<Text style={{ color: 'grey', fontSize: wp('3') }}>Website: {this.state.user.website} </Text>:null}
                        <View style={{flexDirection:'row'}}>
                            <Text>Average Rating:</Text>
                            <StarRating averageRating={this.state.averageRating}/>
                            <Text style={{color:'grey'}}>({this.state.peopleRated} people rated)</Text>
                        </View>
                        <TouchableOpacity style={{alignItems:'flex-start',paddingTop:hp('0.5')}} onPress={() => { this._toggleModal(this.state.userId) }}>
                        <Text style={{color:'white',backgroundColor:'#6699ff',padding:wp('2'),borderRadius:wp('2.5')}}>Rate this Seller!</Text>
                    </TouchableOpacity>
                    </View>
                    
                </View>
                {!finished&&<View style={{marginTop:hp('25')}}>
                    <Text style={{fontSize:wp('5'),textAlign:'center',color:'grey'}}>Loading Items...</Text>
                </View>}
                {(cards.length===0&&finished)?<View style={{marginTop:hp('25')}}>
                    <Text style={{fontSize:wp('5'),textAlign:'center',color:'grey'}}>This brand does not any item for sale 🤷.</Text>
                </View>:
                <View style={{ marginTop: 50, backgroundColor: 'white' }}>
                    {this.renderItems()}
                </View>}
                
                <RatingModal modalVisible={this.state.modalVisible} closeSubmitModal={this._toggleCloseSubmitModal} closeModal={this._toggleCloseModal} sellerId={this.state.sellerId} previouslyRated={this.state.previouslyRated} previousRating={this.state.previousRating} />
                <DropdownAlert ref={ref => this.dropdown = ref} />

            </Content>
        );
    }
}

const styles = StyleSheet.create({
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor:'#E8E8E8' 
      },
    separator: {
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.4)',
    },
    loadMoreBtn: {
        padding: 10,
        backgroundColor: '#6699ff',
        borderRadius: 4,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      btnText: {
        color: 'white',
        fontSize: 15,
        textAlign: 'center',
      },

})

export default withNavigation(ViewSellerContent)







