import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Card, Right } from 'native-base'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ViewFullModal from './ViewFullModal'
import NumberFormat from 'react-number-format';
import axios from 'react-native-axios'


export default class CardComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isModalVisible: false,
            card:{
                imageUrl:[]
            }
        };
    }


    onReport=()=>{
        //userId is the sellerId
        // let {userId}=this.state
        if(this.props.userId&&this.props.webToken){
    
        axios.post('https://slick-project.herokuapp.com/api/reportItem', {
            userId:this.props.userId,
            postId:this.props.card._id,
            sellerId:this.props.card.brandId,
                   }
                   ,{
                    headers:{
                      'x-auth-token':this.props.webToken
                    }
                  })
                .then(async(response)=> {
                    alert(response.data)
                            
                })
                .catch(function (error) {
                    alert('Something went wrong')
                });
              }
      }



    //opening the modal and passing information needed in the modal
    _toggleModal = (card) => {
        this.setState({
            isModalVisible: true,
            card
        });

    }

    //close the modal
    _toggleCloseModal = () => {
        this.setState({ isModalVisible: false })
    }



    render() {
        return (
            <View>

                <Card style={{ marginLeft: 5, marginRight: 5, marginTop: 20, height: hp('30%'), borderRadius: 5 }}>

                    <TouchableOpacity onPress={() => { this._toggleModal(this.props.card) }} style={{ flexDirection: "row", borderBottomColor: '#E8E8E8', borderBottomWidth: 1 }}>

                        <View style={{ margin: 10, backgroundColor: '#e8e8e8' }}>
                            <Image resizeMode='contain' style={{ height: hp('15%'), width: hp('15%') }} source={{uri:this.props.card.imageUrl[0]}} />
                        </View>
                        <Right style={{ flex: 1, alignItems: 'flex-start', height: 90, paddingHorizontal: 20 }}>
                            <Text style={{ fontSize: wp('3.75%') }}>{this.props.card.nameOfItem}</Text>
                            <Text style={{ color: 'grey', fontSize: wp('2.85%') }} >{this.props.card.brandName}</Text>
                            <TouchableOpacity>
                                <Text style={{ fontSize: wp('3.75%'), color: '#ff9980' }} onPress={() => this.onReport()} >Report Item</Text>
                            </TouchableOpacity>
                        </Right>
                        <View style={{ marginTop: 0 }}>
                        <NumberFormat
                                value={this.props.card.price}
                                displayType={'text'}
                                prefix={'₦'}

                                thousandSeparator={true}
                                renderText={value =>
                                    <Text style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', color: 'white', backgroundColor: '#6699ff', fontSize: wp('3.50%'), borderBottomLeftRadius: 5, borderTopRightRadius: 5, }}>{value}</Text>}
                                    />
                        </View>
                    </TouchableOpacity>
                    {this.props.buttons}


                </Card>

                {/* Modalllllllllllllllllllllllllllllllllllll */}
                <ViewFullModal state={this.state.isModalVisible} close={this._toggleCloseModal} card={this.state.card} buttons={this.props.buttons} showButtons={false} />
            </View>
        );
    }
}

