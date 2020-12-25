import React, { Component } from 'react'
import {
    Text,
    View,
    Image,
    Dimensions,
    AsyncStorage,
    RefreshControl,
    ScrollView
} from 'react-native'
import Swiper from 'react-native-swiper'
import { Icon } from 'react-native-elements'
import CardButton from './CardButton'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'
import { withNavigation } from 'react-navigation'
import NumberFormat from 'react-number-format';
import Carousel from 'react-native-snap-carousel'
import { Content } from 'native-base';


// const webToken = AsyncStorage.getItem('webtoken')
// const userId = AsyncStorage.getItem('userId')


const { width } = Dimensions.get('window')

const styles = {
    wrapper: {
        height: hp('65')

    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',

    },
    text: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    image: {
        width,
        flex: 1
    },
    paginationStyle: {
        position: 'absolute',
        bottom: 10,
        right: 10
    },
    paginationText: {
        color: 'black',
        fontSize: wp('6')
    }
}


const renderPagination = (index, total, context) => {
    return (
        <View style={styles.paginationStyle}>
            <Text style={{ color: 'grey' }}>
                <Text style={styles.paginationText}>{index + 1}</Text>/{total}
            </Text>
        </View>
    )
}

class SearchFanciedItems extends Component {
    constructor() {
        super()
        this.state = {
            topFanciedItem: [],
            isRefreshing: false,
            webToken:'',
            userId:'',
            finished:false
        }
    }

    componentDidMount() {
        AsyncStorage.multiGet(['userId','webtoken']).then(result => {
            this.setState({
                userId:result[0][1],
                webToken:result[1][1],
            })
            this.getTopFanciedItems()
            this._sub = this.props.navigation.addListener('didFocus', (payload) => this.getTopFanciedItems(payload))

        })

    }



    componentWillUnmount() {
        this._sub.remove()


    }



    getTopFanciedItems = async () => {
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/topFancied`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data
            this.setState({
                topFanciedItem: data,
                finished:true
            })

        }

        catch (error) {
            alert('Something Failed, Could not connect to server')
        }


    }

    _onRefresh = () => {
        this.setState({ isRefreshing: true,finished:false })
        this.getTopFanciedItems()
        this.setState({ isRefreshing: false })
    }



    render() {
        const { topFanciedItem,finished } = this.state
            return (
                <View>
                {(finished)&&<ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} />}
                    style={{ width: wp('90'), marginTop: hp('5'), marginLeft: 'auto', marginRight: 'auto' }}>
                    <Carousel
                        ref={(c) => { this._carousel = c; }}
                        layout={'tinder'} layoutCardOffset={18}
                        data={topFanciedItem}
                        pagingEnabled={true}
                        sliderWidth={wp('90')}
                        itemWidth={wp('90')}
                        renderItem={({ item }) =>
                            <View key={item._id} style={{ height: hp('65'), width: wp('90'), borderRadius: 5, marginBottom: hp('5'), backgroundColor: '#e6f3ff', marginLeft: 'auto', marginRight: 'auto' }} >
                                <View style={{ backgroundColor: '#6699ff', width: wp('18'), borderTopLeftRadius: 5, borderBottomRightRadius: 5 }}>
                                    <NumberFormat
                                        value={item.price}
                                        displayType={'text'}
                                        prefix={'₦'}

                                        thousandSeparator={true}
                                        renderText={value =>
                                            <Text style={{ color: 'white', marginLeft: 'auto', marginRight: 'auto', paddingTop: hp('0.5'), paddingBottom: hp('0.5') }}>{value}</Text>}
                                    />
                                </View>
                                <Image resizeMode='contain' style={{ width: wp('70'), height: hp('35'), marginLeft: 'auto', marginRight: 'auto', marginTop: 'auto', marginBottom: 'auto' }} source={{ uri: item.imageUrl[0] }} />
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <View style={{ paddingLeft: wp('2') }}>
                                        <Text style={{ fontSize: wp(4.5) }}>{item.nameOfItem}</Text>
                                        <Text style={{ fontSize: wp(3.5), color: "grey" }}>{item.brandName}</Text>
                                    </View>
                                    <View style={{ alignItems: 'center', marginRight: wp('3') }}>
                                        <Icon reverse name='staro' size={wp('3')} color='#6699ff' type='antdesign' />
                                        <Text style={{ fontSize: wp(3.5) }}>{item.addedToWishList.length}</Text>
                                    </View>
                                </View>
                                <CardButton addedToWishList={item.addedToWishList} addedToCart={item.addedToCart} sellerId={item.userId} postId={item._id} userId={this.state.userId} webToken={this.state.webToken} />
                            </View>

                        }

                    />

                </ScrollView>}
                {(!finished)&&<View style={{marginTop:hp('10')}}>
                    <Text style={{color:'black',alignItems:'center',justifyContent:'center',fontSize:wp('4')}}>Loading...</Text>
                </View>}
                </View>
            )
        }
        
    }


export default withNavigation(SearchFanciedItems)