import React, { Component } from 'react';
import { View, Text, Dimensions, Image, RefreshControl, ScrollView, TouchableOpacity, AsyncStorage } from 'react-native';
import { Card } from 'native-base'
import ViewFullModal from './ViewFullModal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'axios'
import CardButton from './CardButton'
import NumberFormat from 'react-number-format';
import Dialog from "react-native-dialog";


var { height, width } = Dimensions.get('window')
// const userId = AsyncStorage.getItem('userId')
// const webToken = AsyncStorage.getItem('webtoken')

export default class WishListComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
      dialogVisible: false,
      isRefreshing: false,
      finished:false,
      userId: '',
      _id: '',
      card: {
        imageUrl: [],
        addedToCart: [],
        addedToWishList: []
      },
      wishList: [],
      storageUserId:'',
          webToken:'',
          done:false
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(['userId','webtoken']).then(result => {
      this.setState({
        storageUserId:result[0][1],
          webToken:result[1][1],
          done:true
      })
      this.getWishList()
    this._onRefresh()
  })
    
    this.checkInternetConnection()
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

  getWishList = async () => {
    try {
      const response = await axios.get(`https://slick-project.herokuapp.com/api/wishListItems/${this.state.storageUserId}`,
        {
          headers: { 'x-auth-token': this.state.webToken }
        })

      const data = await response.data
      await this.setState({
        wishList: data,
        finished:true
      })

    }

    catch (error) {
      alert('Something Failed, Could not connect to server')
    }

  }


  showDialog = (sellerId, postId) => {
    this.setState({
      dialogVisible: true,
      userId: sellerId,
      _id: postId
    })
  }

  handleCloseDialog = () => {
    this.setState({
      dialogVisible: false
    })
  }

  removeFromWishList = (sellerId, postId) => {
    this.setState({ loadingWishList: true })
    if(this.state.done){
    axios.post('https://slick-project.herokuapp.com/api/removeFromWishList', {
      postId: postId,
      userId: this.state.storageUserId
    }
      , {
        headers: {
          'x-auth-token': this.state.webToken
        }
      })
      .then(async (response) => {
        if (response.status === 200) {
          this._onRefresh()

        }
      })
      .catch(function (error) {
        alert(error.response.data);

      });
    }
  }
  //looping throuh the array of images to the the swipe images
  renderModalImage = () => {
    let { imageUrl } = this.state.wishList
    return imageUrl.map((item, index) => {
      return (
        <View key={{ index }} style={{ marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white' }}>
          <Image resizeMode='contain' style={{ height: hp('35'), width: wp('75') }} source={{ uri: item }} />
        </View>
      )
    })

  }

  //open modal and passing in information that would be used in the modal
  _toggleModal = (card) => {
    this.setState({
      dialogVisible: false,
      isModalVisible: true,
      card
    });

  }

  //close modal
  _toggleCloseModal = () => {
    this.setState({ isModalVisible: false })
  }

  //looping through the card displayed on the wishlist
  renderCard = () => {
    let { wishList } = this.state
    return wishList.map((card, index) => {
      return (
        <Card key={card._id} style={[{ height: height / 2.5, width: (width / 2) - 12.5, borderColor: 'white', borderWidth: 0.5, borderRadius: 5, backgroundColor: 'white', marginBottom: 5 }]}>
          <ScrollView>
            <TouchableOpacity onPress={() => { this._toggleModal(card) }}>
              <View >
                <Image resizeMode='contain' style={{ height: hp('20'), width: wp('40'), borderRadius: 5, marginLeft: 'auto', marginRight: 'auto', marginTop: 10 }} source={{ uri: card.imageUrl[0] }} />
              </View>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ paddingLeft: 12 }}>
                  <Text style={{ fontSize: wp('3.5') }}>{card.nameOfItem}</Text>
                  <Text style={{ fontSize: wp('3'), color: 'grey' }}>{card.brandName}</Text>
                  <NumberFormat
                    value={card.price}
                    displayType={'text'}
                    prefix={'₦'}

                    thousandSeparator={true}
                    renderText={value =>
                      <Text style={{ fontSize: wp('3'), color: 'grey' }}>{value}</Text>}
                  />
                </View>
              </View>
            </TouchableOpacity>
            <View style={{ paddingLeft: 12 }}>
              <Text style={{ fontSize: wp('3'), color: '#ff9980' }} onPress={() => { this.showDialog(card.userId, card._id) }} >Remove</Text>
            </View>
          </ScrollView>
        </Card>
      )
    }).reverse()
  }
  _onRefresh = async () => {
    await this.setState({ isRefreshing: true })
    await this.getWishList()
    this.setState({ isRefreshing: false })


  }

  render() {
    const { itemName, seller, image, price, wishList,finished } = this.state
    return (
      <ScrollView refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} />}>
        <View>
            {!finished&&<View style={{marginTop:hp('40')}}>
                    <Text style={{fontSize:wp('5'),textAlign:'center',color:'grey'}}>Loading Items...</Text>
                </View>}
          {(wishList.length === 0 &&finished ) ? <View style={{ marginTop: hp('40'),padding:wp('1') }}>
            <Text style={{ fontSize: wp('4.5'), textAlign: 'center', color: 'grey' }}>You have not added any Item in your Wishlist 😔</Text>
            <Text style={{ fontSize: wp('3.5'), textAlign: 'center' }}>(Add items to your Wishlist to hype🙌 Items you like)</Text>
          </View> :
            <View style={{ flexDirection: 'row', flexWrap: 'wrap',  justifyContent: 'space-around', backgroundColor: '#e8e8e8' }}>
              {this.renderCard()}
            </View>}

          {/* MMMMMMMMOOOOOOOOODDDDDDDDDAAAAAAALLLLLLLLLL */}

          

{(this.state.done)&&<ViewFullModal  showButtons={true} state={this.state.isModalVisible} close={this._toggleCloseModal} card={this.state.card} buttons={<CardButton addedToWishList={this.state.card.addedToWishList} addedToCart={this.state.card.addedToCart} sellerId={this.state.card.userId} postId={this.state.card._id} userId={this.state.storageUserId} webToken={this.state.webToken} />} />}

          <Dialog.Container visible={this.state.dialogVisible}>
            <Dialog.Title>Delete confirmation</Dialog.Title>
            <Dialog.Description>
              Do you want to delete this item from your Wishlist?
          </Dialog.Description>
            <Dialog.Button label="Yes" onPress={() => { this.removeFromWishList(this.state.userId, this.state._id), this.setState({ dialogVisible: false }) }} />
            <Dialog.Button label="No" onPress={this.handleCloseDialog} />
          </Dialog.Container>

        </View>
      </ScrollView>
    );
  }
}
