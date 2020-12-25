import React, { Component } from 'react';
import { View, Alert, Linking, TouchableOpacity, AsyncStorage, RefreshControl, Platform, StyleSheet, FlatList } from 'react-native';
import { Container, Thumbnail, Body, Content, Button, List, ListItem, Text,SwipeRow } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements'
import CardButton from './CardButton';
import ViewFullModal from './ViewFullModal'
import axios from 'axios'
import NumberFormat from 'react-number-format';
import Dialog from "react-native-dialog";
import { Call, TextMessage } from 'react-native-openanything';


// const userId = AsyncStorage.getItem('userId')
// const webToken = AsyncStorage.getItem('webtoken')



export default class CartItems extends Component {
  constructor(props) {
    super(props);
    //this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      basic: true,
      isModalVisible: false,
      isRefreshing: false,
      cart: [],
      finished: false,
      userId: '',
      _id: '',
      sellerPhone: '',
      name: '',
      card: {
        imageUrl: [],
        addedToCart: [],
        addedToWishList: []
      },
      dialogContactVisible: false,
      dialogDeleteVisible: false,
      storageUserId: '',
      webToken: '',
      done: false
    };
  }

  componentDidMount() {
    AsyncStorage.multiGet(['userId', 'webtoken']).then(result => {
      this.setState({
        storageUserId: result[0][1],
        webToken: result[1][1],
        done: true
      })
      this.getCart()
      this._onRefresh()
    })

    this.checkInternetConnection()
  }

  contactMade = (platform, name) => {
    //userId is the sellerId
    // let {userId}=this.state
    if (this.state.done) {

      axios.post('https://slick-project.herokuapp.com/api/contactMade', {
        sellerId: this.state.userId,
        userId: this.state.storageUserId,
        platform,
        name
      }
        , {
          headers: {
            'x-auth-token': this.state.webToken
          }
        })
        .then(async (response) => {

        })
        .catch(function (error) {

        });
    }
  }

  getSellerPhone = async () => {
    const { userId } = this.state
    if (this.state.done) {

      try {
        const response = await axios.get(`https://slick-project.herokuapp.com/api/sellerProfile/${userId}`, { headers: { 'x-auth-token': this.state.webToken } })

        const data = await response.data
        await this.setState({ sellerPhone: data.phone })

      }

      catch (error) {
        alert('Something went wrong')
      }
    }

  }

  openWhatsapp = () => {
    let { sellerPhone, name } = this.state

    if (sellerPhone) {
      // Linking.canOpenURL(`whatsapp://send?phone=${sellerPhone}`).then(isInstalled => {
      //     if (isInstalled) {
      this.setState({ dialogContactVisible: false })
      Linking.openURL(`whatsapp://send?text=${`Hello, I would like to buy ${name} which is sold by you on Slick`}&phone=${sellerPhone}`).catch((err) => alert('Something failed, Make sure Whatsapp is installed on your device'))
      this.contactMade('whatsapp', name)
      //   }
      //   else {
      //     alert('Whatsapp is not installed on your device')
      //   }
      // });

    }
    else {
      alert('Chill....Getting Sellers Phone Number....')
    }
  }

  callSeller = () => {
    let { sellerPhone, name } = this.state
    if (sellerPhone) {
      this.setState({ dialogContactVisible: false })
      Call(sellerPhone).catch(err => alert(err));
      this.contactMade('call', name)
    } else {
      alert('Chill....Getting Sellers Phone Number....')
    }
  }

  messageSeller = () => {
    let { sellerPhone, name } = this.state
    if (sellerPhone) {
      this.setState({ dialogContactVisible: false })
      TextMessage(sellerPhone, `Hello, I would like to buy ${name} which is sold by you on Slick`, autoEncode = true)
      this.contactMade('message', name)

    } else {
      alert('Chill....Getting Sellers Phone Number....')
    }
  }

  checkInternetConnection = async () => {
    setTimeout(() => {
      fetch('https://www.google.com')
        .then((response) => {
          //just continue with the normal process
        })
        .catch((err) => {
          alert('Could not connect to the internet, Please check your connection and try again')
          this.setState({ loading: false })

        })
    }, 60000);
  }

  getCart = async () => {

    try {
      const response = await axios.get(`https://slick-project.herokuapp.com/api/cartItems/${this.state.storageUserId}`,
        {
          headers: { 'x-auth-token': this.state.webToken }
        })

      const data = await response.data
      await this.setState({
        cart: data,
        finished: true
      })

    }

    catch (error) {
      alert('Something Failed, Could not connect to server')
    }

  }




  //open modal and passing in information that would be used in the modal
  _toggleModal = (card) => {
    this.setState({
      isModalVisible: true,
      card
    });

  }
  //close modal
  _toggleCloseModal = () => {
    this.setState({ isModalVisible: false })
  }

  showContactDialog = async (sellerId, nameOfItem) => {
    await this.setState({
      sellerPhone: '',
      dialogContactVisible: true,
      userId: sellerId,
      name: nameOfItem
    })
    this.getSellerPhone()
  }

  showDeleteDialog = (sellerId, postId) => {
    this.setState({
      dialogDeleteVisible: true,
      userId: sellerId,
      _id: postId
    })
  }
  removeFromCart = (sellerId, postId) => {
    if (this.state.done) {
      axios.post('https://slick-project.herokuapp.com/api/removeFromCart', {
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
          alert('Something failed, Could not connect to server')
          this.setState({ loadingCart: false, addedToCart: this.props.addedToCart })
        });
    }
  }

  _onRefresh = async () => {
    await this.setState({ isRefreshing: true })
    await this.getCart()
    this.setState({ isRefreshing: false })


  }


  // renderItemComponent=(itemData)=>
  // {}

  render() {
    let { cart, finished } = this.state
    return (
      <Container >
        <Content refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} />}>
          {!finished && <View style={{ marginTop: hp('40') }}>
            <Text style={{ fontSize: wp('5'), textAlign: 'center', color: 'grey' }}>Loading Items...</Text>
          </View>}
          {(cart.length === 0 && finished) ? <View style={{ marginTop: hp('40'), padding: wp('1') }}>
            <Text style={{ fontSize: wp('4.5'), textAlign: 'center', color: 'grey' }}>You have not added any Item in your Cart 😔</Text>
          </View> :
            <FlatList
              data={this.state.cart}
              keyExtractor={(item, index) => index.toString()}
              
              renderItem={({item}) => <SwipeRow
                leftOpenValue={wp('30')}
                rightOpenValue={wp('-30')} 
                body={
                  <ListItem style={{ height: hp('15') ,width:wp('100') }}>
                    <Body style={{flexDirection:'row',justifyContent:'space-between'}}>
                   <Thumbnail square source={{ uri:item.imageUrl[0]}} style={{ marginLeft: 10 }} />
                      <TouchableOpacity onPress={() => { this._toggleModal(item) }} style={{alignItems:'center',padding:7}}>
                        <Text style={{ fontSize: wp('4') }}>{item.nameOfItem}</Text>
                        <Text note style={{ fontSize: wp('4') }}>{item.brandName}</Text>
                      </TouchableOpacity>
                    <NumberFormat
                      value={item.price}
                      displayType={'text'}
                      prefix={'₦'}

                      thousandSeparator={true}
                      renderText={value =>
                        <Text style={{alignSelf:'flex-end', paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', color: 'white', backgroundColor: '#6699ff', fontSize: wp('4.5'), borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }} >{value}</Text>}
                    />
                  </Body>
                  </ListItem>
                }
                right={
                  <Button full onPress={() => { this.showContactDialog(item.brandId, item.nameOfItem) }}>
                  <Icon active name="contacts" type='antdesign' size={wp('8')} color='white' />
                </Button>
                }
                left={
                  <Button full danger onPress={() => { this.showDeleteDialog(item.brandId, item._id) }} >
                  <Icon active name="trash" type='evilicon' size={wp('8')} color='white' style={{}} />
                </Button>
                }
              />
              }
             
            />}
        </Content>


        {(this.state.done) && <ViewFullModal showButtons={true} state={this.state.isModalVisible} close={this._toggleCloseModal} card={this.state.card} buttons={<CardButton addedToWishList={this.state.card.addedToWishList} addedToCart={this.state.card.addedToCart} sellerId={this.state.card.userId} postId={this.state.card._id} userId={this.state.storageUserId} webToken={this.state.webToken} />} />}

        <Dialog.Container visible={this.state.dialogDeleteVisible}>
          <Dialog.Title>Delete confirmation</Dialog.Title>
          <Dialog.Description>
            Do you want to delete this item from your Cart?
          </Dialog.Description>
          <Dialog.Button label="Yes" onPress={() => { this.removeFromCart(this.state.userId, this.state._id), this.setState({ dialogDeleteVisible: false }) }} />
          <Dialog.Button label="No" onPress={() => this.setState({ dialogDeleteVisible: false })} />
        </Dialog.Container>

        <Dialog.Container visible={this.state.dialogContactVisible}>
          <Dialog.Title>Contact Seller</Dialog.Title>
          <Dialog.Description>
            Select the Platform contact this Seller in...
          </Dialog.Description>
          <Dialog.Button label="WhatsApp" style={styles.fontIos} onPress={() => { this.openWhatsapp() }} />
          <Dialog.Button label="Message" style={styles.fontIos} onPress={() => this.messageSeller()} />
          <Dialog.Button label="Call" onPress={() => this.callSeller()} />
          <Dialog.Button label="Cancel" style={{ color: 'red' }} onPress={() => this.setState({ dialogContactVisible: false })} />

        </Dialog.Container>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fontIos: {
    ...Platform.select({
      ios: {
        fontSize: wp('2.8'),
      }
    })
  }
});