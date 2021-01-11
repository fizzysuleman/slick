import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, AsyncStorage, RefreshControl ,ScrollView} from 'react-native';
import Modal from 'react-native-modal'
import Swiper from 'react-native-swiper';
import CardButton from './CardButton'
import { Divider } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';
import axios from 'react-native-axios'
import { withNavigation } from 'react-navigation'
import StarRating from './StarRating';


// const webToken = AsyncStorage.getItem('webtoken')


class ViewItemSearchContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            item: [],
            imageUrl: [],
            addedToWishList: [],
            addedToCart: [],
            isRefreshing: false,
            averageRating: 0,
            peopleRated: 0,
            userId: '',
            webToken: '',
            done: false
        };
    }
    renderImage = () => {
        let { imageUrl } = this.state
        return imageUrl.map((item, index) => {
            return (
                <View key={{ index }} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Image resizeMode='contain' style={{ height: hp('35'), width: wp('80'), borderRadius: 5 }} source={{ uri: item }} />
                </View>
            )
        })


    }
    async componentDidMount() {
        AsyncStorage.multiGet(['userId', 'webtoken']).then(result => {
            this.setState({
                userId: result[0][1],
                webToken: result[1][1],
                done: true
            })
            this.getItem()
            this.getAverageRating()
        })

    }

    getItem = async () => {
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/itemPost/${this.props.itemId}`,
                {
                    headers: { 'x-auth-token': this.state.webToken }
                })

            const data = await response.data
            await this.setState({
                imageUrl: data.imageUrl,
                addedToCart: data.addedToCart,
                addedToWishList: data.addedToWishList,
                item: data
            })
        }



        catch (error) {
            alert('Something Failed, Could not connect to server')
        }

    }

    getAverageRating = async () => {
        const { item } = this.state
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/averageRating/${this.props.itemBrandId}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data

            await this.setState({
                averageRating: data.averageRating,
                peopleRated: data.ratingNumber
            })

        }

        catch (error) {
            alert('Something Failed, Could not connect to server')
        }

    }

    _onRefresh = async () => {
        await this.setState({ isRefreshing: true })
        if (this.state.done) {
            await this.getItem()
            await this.getAverageRating()

            this.setState({ isRefreshing: false })
        }

    }

    viewSeller = (brandName, id) => {
        this.props.navigation.navigate('ViewSeller', {
            brandName: brandName,
            userId: id
        })

    }


    render() {

        const { item,done } = this.state
        return (
            this.state.item != [] &&
            <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} />}>
                <View>
                    <View>
                        <View style={{ backgroundColor: '#e8e8e8', marginTop: hp('6'), height: hp('43') }}>
                            <Swiper style={{ justifyContent: 'center' }}>
                                {this.renderImage()}
                            </Swiper>

                        </View>
                        <View style={{ backgroundColor: 'white' }}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <NumberFormat
                                    value={item.price}
                                    displayType={'text'}
                                    prefix={'₦'}

                                    thousandSeparator={true}
                                    renderText={value =>
                                        <Text style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', color: 'white', backgroundColor: '#6699ff', fontSize: wp('4.5'), borderBottomLeftRadius: 5 }}>{value}</Text>}
                                />
                            </View>
                            <View style={{ height: hp('15'), backgroundColor: 'white' }}>
                                {(done)&&<CardButton addedToWishList={this.state.addedToWishList} addedToCart={this.state.addedToCart} sellerId={item.brandId} postId={this.props.itemId} userId={this.state.userId} webToken={this.state.webToken} />}

                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10 }}>SOLD BY</Text>
                        </View>
                        <View style={{ paddingLeft: wp('10'), backgroundColor: 'white', padding: wp('4') }}>
                            <TouchableOpacity onPress={() => { this.viewSeller(item.brandName, item.brandId) }}><Text style={{ fontSize: wp('4.5'), color: '#6699ff' }}>{item.brandName}</Text></TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Average Rating:</Text>
                                <StarRating averageRating={this.state.averageRating} />
                                <Text style={{ color: 'grey' }}>({this.state.peopleRated} people rated)</Text>
                            </View>
                        </View>
                        <ScrollView>
                            <View>
                                <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10 }}>SPECIFICATIONS</Text>
                            </View>
                            <View style={{ paddingLeft: wp('10'), backgroundColor: 'white', padding: wp('4') }}>
                                <Text style={{ fontSize: wp('3.5') }}>Category: {item.category}</Text>
                                {item.colorAvailable ? <Text style={{ fontSize: wp('3.5') }}>Colors: {item.colorAvailable}</Text> : null}
                                {item.sizeAvailable ? <Text style={{ fontSize: wp('3.5') }}>Sizes: {item.sizeAvailable}</Text> : null}
                                <View style={{flexDirection:'row'}}>
                                    <Text>Status: </Text>
                                    {item.negotiable ? <Text style={{ fontSize: wp('3.5') }}>Negotiable</Text>:null}
                                    {!item.negotiable ? <Text style={{ fontSize: wp('3.5') }}>Not negotiable</Text>:null}

                                </View>

                            </View>
                            <View>
                                <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10 }}>HashTags</Text>
                            </View>
                            <View style={{ paddingLeft: wp('10'), padding: wp('4'), backgroundColor: 'white' }}>
                                <Text style={{ fontSize: wp('3.5') }}>{item.hashTags}</Text>
                            </View>
                            <View>
                                <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10 }}>Places</Text>
                            </View>
                            <View style={{ paddingLeft: wp('10'), padding: wp('4'), backgroundColor: 'white' }}>
                                <Text style={{ fontSize: wp('3.5') }}>Location:{item.location}</Text>
                                {item.school ? <Text style={{ fontSize: wp('3.5') }}>School: {item.school}</Text> : null}
                            </View>
                        </ScrollView>
                    </View>
                    <Modal
                        animationInTiming={1000}
                        animationOutTiming={1000}
                        backdropTransitionInTiming={1000}
                        backdropTransitionOutTiming={1000}
                        isVisible={this.props.visibleModal}
                        style={styles.bottomModal}>
                        <View style={styles.modalContent}>

                            <Text style={{ fontSize: wp('5'), padding: hp('1.8'), color: '#80aaff' }}>Edit</Text>
                            <Divider style={{ backgroundColor: 'grey', width: wp('95'), height: hp('0.1') }} />
                            <Text style={{ fontSize: wp('5'), padding: hp('1.8'), color: '#80aaff' }}>Copy Link</Text>
                            <Divider style={{ backgroundColor: 'grey', width: wp('95'), height: hp('0.1') }} />

                            <Text style={{ fontSize: wp('5'), padding: hp('1.8'), color: '#ff471a' }}>Delete</Text>

                        </View>

                        <TouchableOpacity onPress={this.props.close} style={styles.modalCloseContent}>
                            <Text style={{ fontWeight: 'bold', fontSize: wp('4'), color: 'black' }} >Close</Text>
                        </TouchableOpacity>
                    </Modal>


                </View>
            </ScrollView>

        );
    }
}


const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('3'),
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: wp('95'),
        marginLeft: 'auto',
        marginRight: 'auto'
    },
    modalCloseContent: {
        backgroundColor: 'white',
        marginTop: hp('2'),
        marginBottom: hp('2'),
        padding: hp('3.5'),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp('3'),
        borderColor: 'rgba(0, 0, 0, 0.1)',
        width: wp('95'),
        height: hp('5'),
        marginLeft: 'auto',
        marginRight: 'auto',

    },
    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
})



export default withNavigation(ViewItemSearchContent)