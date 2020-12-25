// import React, { Component } from 'react';
// import { ListView, View, Alert, Image,RefreshControl,TouchableOpacity } from 'react-native';
// import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons'
// import EvilIcon from 'react-native-vector-icons/EvilIcons'
// import { Container, Thumbnail, Body, Content, Button, List, ListItem, Text } from 'native-base';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import Modal from 'react-native-modal'
// import Swiper from 'react-native-swiper';
// import { Icon } from 'react-native-elements'
// import CardButton from './CardButton';
// import ViewFullModal from './ViewFullModal'


// const cards = [
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/1.jpg'),
//       require('../assets/feed_images/1_2.jpg'),
//       require('../assets/feed_images/1_3.png')
//     ],
//     itemName: 'Yeezy Boost',
//     sellerName: 'Pick and carry',
//     price: '$100'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/2.jpg'),
//       require('../assets/feed_images/2_2.jpg'),
//       require('../assets/feed_images/2_3.jpg')
//     ],
//     itemName: 'Cap (Red and Blue)',
//     sellerName: 'Donesty clothes',
//     price: '$10'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/3.jpg'),
//       require('../assets/feed_images/3_2.jpg'),
//     ],
//     itemName: 'Nike boots',
//     sellerName: 'Boot merchandizer',
//     price: '$120'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/4.jpg'),
//     ],
//     itemName: 'Earings(Original diamonds)',
//     sellerName: 'Lams Earings',
//     price: '$140'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/5.jpg'),
//     ],
//     itemName: 'Sweat Shirts(Customize Any)',
//     sellerName: 'Mullay',
//     price: '$30'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/6.jpg'),
//     ],
//     itemName: 'Dripping hoddie',
//     sellerName: 'Mullay',
//     price: '$50'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/7.jpg'),
//     ],
//     itemName: 'Cat glasses',
//     sellerName: 'Waju stores',
//     price: '$8'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/8.jpg'),
//     ],
//     itemName: 'Nike Huraches',
//     sellerName: 'Thefootworkshop',
//     price: '$300'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/9.jpg'),
//     ],
//     itemName: 'Adidas NMD r1',
//     sellerName: 'Thefootworkshop',
//     price: '$250'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/10.jpg'),
//     ],
//     itemName: 'Durag Silk Original',
//     sellerName: 'Mullay',
//     price: '$15'
//   },
//   {
//     sender: 'hooligan.nn',
//     imageUri: [
//       require('../assets/feed_images/10.jpg'),
//     ],
//     itemName: 'Dura Silk Original',
//     sellerName: 'Mulla',
//     price: '$15'
//   }

// ]

// export default class RecommendedItems extends Component {
//   constructor(props) {
//     super(props);
//     this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//     this.state = {
//       basic: true,
//       listViewData: cards,
//       isModalVisible: false,
//       itemName: '',
//       image: [],
//       seller: '',
//       price: ''
//     };
//   }
//   openAlert = () => {
//     Alert.alert(
//       'Carry Out!',
//       'Click Pay to pay for product with the bank',
//       [
//         { text: 'Contact Seller', onPress: () => console.log('Contact Seller') },
//         { text: 'Pay', onPress: () => console.log('Pay') },
//         { text: 'Cancel', onPress: () => console.log('Cancel') },

//       ]

//     )
//   }
//   //looping throuh the array of images to the the swipe images
//   renderModalImage = () => {
//     return this.state.image.map((item, index) => {
//       return (
//         <View key={{ index }} style={{ marginLeft: 'auto', marginRight: 'auto', backgroundColor: 'white' }}>
//           <Image resizeMode='contain' style={{ height: hp('35'), width: wp('75') }} source={item} />
//         </View>
//       )
//     })

//   }

//   //open modal and passing in information that would be used in the modal
//   _toggleModal = (itemName, seller, image, price) => {
//     this.setState({
//       isModalVisible: true,
//       itemName: itemName,
//       seller: seller,
//       image: image,
//       price: price
//     });

//   }
//   //close modal
//   _toggleCloseModal = () => {
//     this.setState({ isModalVisible: false })
//   }

//   deleteRow(secId, rowId, rowMap) {
//     rowMap[`${secId}${rowId}`].props.closeRow();
//     const newData = [...this.state.listViewData];
//     newData.splice(rowId, 1);
//     this.setState({ listViewData: newData });
//   }
//   alertPerson = (person) => {
//     Alert.alert(
//       `Contact ${person}`
//     )
//   }
//   render() {
//     const {itemName,seller,price,image}=this.state
//     const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
//     return (
//       <Container>
//         <Content>
//           <List
//             leftOpenValue={wp('30')}
//             rightOpenValue={wp('-30')}
//             dataSource={this.ds.cloneWithRows(this.state.listViewData)}
//             renderRow={card =>
//               <ListItem style={{ height: hp('15') }}>
//                 <Thumbnail square source={card.imageUri[0]} style={{ marginLeft: 10 }} />
//                 <Body>
//                 <TouchableOpacity onPress={() => { this._toggleModal(card.itemName, card.sellerName, card.imageUri, card.price) }}>

//                   <Text style={{ fontSize: wp('3.5') }}><Text>From: </Text><Text style={{ fontSize: wp('4.5') }} onPress={() => this.alertPerson(card.sender)} style={{ textDecorationLine: 'underline' }}>@{card.sender}</Text></Text>
//                   <Text style={{ fontSize: wp('3.5') }}>{card.itemName}</Text>
//                   <Text note style={{ fontSize: wp('3.5') }}>{card.sellerName}</Text>
//                   </TouchableOpacity>
//                 </Body>
//                 <Text style={{ paddingTop: 5, paddingBottom: 5, paddingLeft: 5, paddingRight: 5, fontWeight: 'bold', color: 'white', backgroundColor: '#6699ff', fontSize: wp('4.5'), borderBottomLeftRadius: 5, borderTopLeftRadius: 5 }} >{card.price}</Text>

//               </ListItem>
//               }
//             renderRightHiddenRow={card =>
//               <Button full onPress={() => this.openAlert()}>
//                 <Icon active name="cash" type='material-community' size={wp('8')}  color='white' />
//               </Button>}
//             renderLeftHiddenRow={(card, secId, rowId, rowMap) =>
//               <Button full danger onPress={_ => this.deleteRow(secId, rowId, rowMap)}>
//                 <Icon active name="trash" type='evilicon' size={wp('8')} color='white'  style={{  }} />
//               </Button>}
//           />
//         </Content>


//         <ViewFullModal state={this.state.isModalVisible} close={this._toggleCloseModal} seller={seller} price={price} itemName={itemName} image={image} buttons={<CardButton/>}/>

//       </Container>
//     );
//   }
// }