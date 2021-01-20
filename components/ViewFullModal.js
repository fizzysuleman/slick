import React, { PureComponent } from "react";
import { Text, TouchableOpacity, Image, View, AsyncStorage, ScrollView, Platform } from "react-native";
import CameraRoll from '@react-native-community/cameraroll'
import Modal from "react-native-modal";
import { Card, Right } from 'native-base'

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import Swiper from 'react-native-swiper';
import NumberFormat from 'react-number-format';
import axios from 'react-native-axios'
import { withNavigation } from 'react-navigation'
import StarRating from './StarRating';
import * as  Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import { captureRef as takeSnapshotAsync } from 'react-native-view-shot';


// const webToken = AsyncStorage.getItem('webtoken')

class ViewFullModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            averageRating: 0,
            peopleRated: 0,
            webToken: '',
            showLogo: false,
            showButtons: this.props.showButtons,
            screenshottedRef: false
        };
    }

    //looping through the image array to the swiper images
    renderModalImage = () => {
        let { card } = this.props
        return card.imageUrl.map((item, index) => {
            return (
                <View key={{ index }} style={{ marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white' }}>
                    <Image resizeMode='contain' style={{ height: hp('35'), width: wp('75') }} source={{ uri: item }} />
                </View>
            )
        })

    }

    async componentDidUpdate(prevProps) {
        if (this.props.state !== prevProps.state) {
            AsyncStorage.multiGet(['userId', 'webtoken']).then(result => {
                this.setState({
                    webToken: result[1][1],
                })
                this.getAverageRating();
            })
        }
    }

    getAverageRating = async () => {

        let { card } = this.props
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/averageRating/${card.brandId}`, { headers: { 'x-auth-token': this.state.webToken } })

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

    viewSeller = (brandName, id) => {
        this.props.close()
        this.props.navigation.navigate('ViewSeller', {
            brandName: brandName,
            userId: id
        })

    }



    _saveToCameraRollAsync = async () => {
        // this.setState({
        //     showLogo:true
        // })
        let result = await takeSnapshotAsync(this._container, {
            format: 'png',
            result: 'tmpfile',
            height: hp('100'),
            snapshotContentContainer: true
            // height:hp('70')
        }).then(
            async (uri) => {
                const permission = await Permissions.getAsync(Permissions.CAMERA_ROLL);

                if (permission.status !== 'granted') {
                    let askForPermission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
                    if (askForPermission.status === 'granted') {
                        let asset = await MediaLibrary.createAssetAsync(uri);

                        if (MediaLibrary.getAlbumAsync("Slick") == null) {//if an album of the name slick hasnt been created

                            MediaLibrary.createAlbumAsync('Slick', asset)
                                .then(() => {
                                    alert('A shareable image of the item has been saved!');
                                })
                                .catch(error => {
                                    Alert.alert('An Error Occurred!')
                                });
                        }
                        else {
                            MediaLibrary.addAssetsToAlbumAsync(asset, "Slick")
                                .then(() => {
                                    alert('A shareable image of the item has been saved!');
                                })
                                .catch(error => {
                                    Alert.alert('An Error Occurred!')
                                });
                        }
                    }
                }
                else {
                    let asset = await MediaLibrary.createAssetAsync(uri);
                    const check = await MediaLibrary.getAlbumAsync("Slick");

                    if (check == null) {//if an album of the name slick hasnt been created

                        MediaLibrary.createAlbumAsync('Slick', asset)
                            .then(() => {
                                alert('A shareable image of the item has been saved!');
                            })
                            .catch(error => {
                                Alert.alert('An Error Occurred!')
                            });

                    }
                    else {
                        MediaLibrary.addAssetsToAlbumAsync([asset], check, false)
                            .then(() => {
                                alert('A shareable image of the item has been saved!');
                            })
                            .catch(error => {
                                Alert.alert('An Error Occurred!')
                            });
                    }

                }
            }

        )

    }



    render() {
        let { card } = this.props
        let { showButtons } = this.state
        return (

            <View
            >
                <Modal isVisible={this.props.state} style={{ backgroundColor: "#FFFFFF" }}>
                    <ScrollView collapsable={true}
                        style={{ flex: 1, backgroundColor: '#e8e8e8', backgroundColor: '#e8e8e8', borderRadius: wp('2') }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: hp('2') }}>
                            <TouchableOpacity onPress={this.props.close}><MaterialIcon name='cancel' style={{ fontSize: wp('9'), color: '#6699ff' }} /></TouchableOpacity>
                            <Text style={{ fontSize: wp('5') }}>{card.nameOfItem}</Text>
                            {(Platform.OS === 'ios') ? <TouchableOpacity onPress={this._saveToCameraRollAsync}><MaterialCommunityIcon name='cellphone-screenshot' style={{ fontSize: wp('8'), color: '#6699ff' }} /></TouchableOpacity> : <FontAwesome onPress={() => alert('Thank you for using Slick, We love you😊')} name='smile-o' style={{ fontSize: wp('8'), color: '#6699ff' }} />}
                        </View>
                        <View style={{ marginTop: 30, height: hp('42'), backgroundColor: '#e8e8e8' }}>
                            <Swiper style={{ justifyContent: 'center' }}>
                                {this.renderModalImage()}
                            </Swiper>
                        </View>
                        <View style={{ backgroundColor: 'white' }}>
                            <View style={{ alignItems: 'flex-end' }}>
                                <NumberFormat
                                    value={card.price}
                                    displayType={'text'}
                                    prefix={'₦'}

                                    thousandSeparator={true}
                                    renderText={value =>
                                        <Text style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', color: 'white', backgroundColor: '#6699ff', fontSize: wp('4.5'), borderBottomLeftRadius: 5 }}>{value}</Text>}
                                />
                            </View>

                            {showButtons && <View style={{ height: hp('15'), backgroundColor: 'white' }}>
                                {this.props.buttons}
                            </View>}
                        </View>
                        <View>
                            <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10, backgroundColor: '#e8e8e8' }}>SOLD BY</Text>
                        </View>
                        <View style={{ paddingLeft: wp('10'), backgroundColor: 'white', padding: wp('4') }}>
                            <TouchableOpacity onPress={() => { this.viewSeller(card.brandName, card.brandId) }}><Text style={{ fontSize: wp('4.5'), color: '#6699ff' }}>{card.brandName}</Text></TouchableOpacity>
                            <View style={{ flexDirection: 'row' }}>
                                <Text>Average Rating:</Text>
                                <StarRating averageRating={this.state.averageRating} />
                                <Text style={{ color: 'grey' }}>({this.state.peopleRated} people rated)</Text>
                            </View>
                        </View>
                        <View>
                            <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10, backgroundColor: '#e8e8e8' }}>SPECIFICATIONS</Text>
                        </View>
                        <View style={{ paddingLeft: wp('10'), backgroundColor: 'white', padding: wp('4') }}>
                            {card.colorAvailable ? <Text style={{ fontSize: wp('3.5') }}>Colors: {card.colorAvailable}</Text> : null}
                            {card.sizeAvailable ? <Text style={{ fontSize: wp('3.5') }}>Sizes: {card.sizeAvailable}</Text> : null}
                            {card.negotiable ? <Text style={{ fontSize: wp('3.5') }}>Status: Negotiable</Text> : <Text style={{ fontSize: wp('3.5') }}>Status: Not negotiable</Text>}

                        </View>
                        <View>
                            <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10, backgroundColor: '#e8e8e8' }}>HashTags</Text>
                        </View>
                        <View style={{ paddingLeft: wp('10'), padding: wp('4'), backgroundColor: 'white' }}>
                            <Text style={{ fontSize: wp('3.5') }}>{card.hashTags}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: wp('4'), paddingLeft: wp('10'), padding: 10, backgroundColor: '#e8e8e8' }}>Places</Text>
                        </View>
                        <View style={{ paddingLeft: wp('10'), padding: wp('4'), backgroundColor: 'white', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <View>
                                <Text style={{ fontSize: wp('3.5') }}>Location:{card.location}</Text>
                                {card.school ? <Text style={{ fontSize: wp('3.5') }}>School: {card.school}</Text> : null}
                            </View>
                            
                        </View>
                    </ScrollView>
                </Modal>
                {/* Screenshot Card */}

                {this.props.showScreenshot ? <ScrollView collapsable={false} ref={view => {
                    this._container = view;
                }} style={{ backgroundColor: "black" }}>
                    <Card style={{ marginLeft: 5, marginRight: 5, marginTop: 20, height: hp('23%'), borderRadius: 5 }}>

                        <TouchableOpacity style={{ flexDirection: "row"}}>

                            <View style={{ margin: 10, backgroundColor: '#e8e8e8' }}>
                                <Image resizeMode='contain' style={{ height: hp('20%'), width: hp('20%') }} source={{ uri: card.imageUrl[0] }} />
                            </View>
                            <Right style={{ flex: 1, alignItems: 'flex-start', height: 90, paddingHorizontal: 20,width:wp('80') }}>
                                <Text style={{ fontSize: wp('3.75%') ,paddingTop:hp('0.5')}}>{card.nameOfItem}</Text>
                                <Text style={{ color: 'grey', fontSize: wp('2.85%') }} >{card.brandName}</Text>
                                <Text style={{ fontSize: wp('3%'),paddingTop:hp('0.5') }}  >Location: {card.location}</Text>
                                {card.school?<Text style={{ fontSize: wp('3%'),paddingTop:hp('0.5') }}  >School: {card.school}</Text>:null}

                            </Right>
                            <View style={{ marginTop: 0 ,justifyContent:'space-between'}}>
                                <NumberFormat
                                    value={card.price}
                                    displayType={'text'}
                                    prefix={'₦'}

                                    thousandSeparator={true}
                                    renderText={value =>
                                        <Text style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', color: 'white', backgroundColor: '#6699ff', fontSize: wp('3.50%'), borderBottomLeftRadius: 5, borderTopRightRadius: 5, }}>{value}</Text>}
                                />
                                 {(Platform.OS == 'ios') ? <View style={{ alignItems: 'center' }}>
                                <Image style={{ height: wp('6'), width: wp('6') }} source={require('../assets/newIcon.png')} />
                                <Text style={{ fontSize: wp('2'), textAlign: 'center', color: 'grey' }}>Slick</Text>
                            </View> : null}
                            </View>
                           
                        </TouchableOpacity>


                    </Card>
                </ScrollView> : null}
            </View>
        );
    }
}


export default withNavigation(ViewFullModal)