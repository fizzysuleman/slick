import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity,ScrollView } from 'react-native';
import { Container, Button, Segment } from 'native-base'
import Modal from 'react-native-modal'
import Swiper from 'react-native-swiper';
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { Divider } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import NumberFormat from 'react-number-format';

export default class ViewProductContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    renderImage = () => {
        let image = this.props.item.imageUrl
        return image.map((item, index) => {
            return (
                <View key={{ index }} style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                    <Image resizeMode='contain' style={{ height: hp('35'), width: wp('80'), borderRadius: 5 }} source={{ uri: item }} />
                </View>
            )
        })

    }
    _renderModalContent = () => {

    };


    render() {
        let item = this.props.item
        return (
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
                        <Segment style={{ height: hp('15'), backgroundColor: 'white' }}>
                            <Button first style={{ width: wp('35'), height: hp('10'), borderColor: '#6699ff', borderWidth: hp('0.1') }} >
                                <View style={{ alignItems: 'center' }}>
                                    <Text style={{ fontSize: wp('3.5') }}>{item.addedToWishList.length}</Text>
                                    <AntDesign name='staro' style={{ fontSize: wp('4') }} />
                                    <Text style={{ fontSize: wp('3.5') }}>  Added to Wishlist</Text>
                                </View>
                            </Button>
                            <Button style={{ width: wp('35'), height: hp('10'), borderColor: '#6699ff', borderWidth: hp('0.1') }}>
                                <View style={{ marginLeft: 'auto', marginRight: 'auto' }}>
                                    <View style={{ alignItems: 'center', }}>
                                        <Text style={{ fontSize: wp('3.5') }}>Status</Text>
                                        <FontAwesome name='handshake-o' style={{ fontSize: wp('4') }} />
                                    </View>
                                    <View style={{ alignSelf: 'auto' }}>
                                        {item.negotiable?<Text style={{ fontSize: wp('3.5') }}>Negotiable</Text>:<Text>Not negotiable</Text>}
                                    </View>
                                </View>
                            </Button>
                        </Segment>
                    </View>
                    <ScrollView>
                        <View>
                            <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10 }}>SPECIFICATIONS</Text>
                        </View>
                        <View style={{ paddingLeft: wp('10'), backgroundColor: 'white', padding: wp('4') }}>
                            <Text style={{ fontSize: wp('3.5') }}>Category: {item.category}</Text>
                            {item.colorAvailable ? <Text style={{ fontSize: wp('3.5') }}>Colors: {item.colorAvailable}</Text> : null}
                            {item.sizeAvailable ? <Text style={{ fontSize: wp('3.5') }}>Sizes: {item.sizeAvailable}</Text> : null}
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