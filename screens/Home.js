import React, { PureComponent } from 'react';
import { Text, StyleSheet, View, TouchableOpacity, ScrollView, FlatList, AsyncStorage } from 'react-native';
import { Container, Content } from 'native-base'
import { Icon, Header } from 'react-native-elements'
import { DrawerActions , NavigationActions, StackActions} from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'


const webToken = AsyncStorage.getItem('webtoken')
const userId = AsyncStorage.getItem('userId')


//function for shuffling
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}


let tipsArray = [
  'Sellers are advised to use their business phone number for contact',
  'You can follow our instagram @slick.app for updates',
  'Add Item to your wishlist to hype trending/slick products',
  'You can contact a Seller either by Whatsapp,Message or Call in the Cart section',
  'Always consider a Seller rating before buying an item, to prevent contacting a fraud person',
  'Dress Slick and stay Slick 😉',
  'You can report Sellers for selling illegal goods',
  'Electronics are not sold on slick 🚫...please beware and report',
  'Any conversation made outside the app is not monitored , please note⚠️',
  'Gift cards would be given to Top active buyers',
  'Always stay Slick 😉',
  'You can check for an item available in your particular school or location',
  'Dont stress in searching for items, just use Slick',
  'You can report any bug found in the apps',
  'You can share an Idea that Slick needs to improve on, just contact our instagram',
  'Rate quality Seller to appreciate their good service 😊',
  'The fundamental nature of the universe is commerce ',
  'Products are created in the factory, Brands are created in the mind -Walter landers',
  'The app is not held responsible for any contact made outside the app'

];
let shuffledTipsArray = tipsArray.map((item) => {
  return item
})

shuffledTipsArray = shuffle(shuffledTipsArray)

export default class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      textIndex: 0,
      userId: '',
      webToken: '',
      category: [
        {
          title: 'Clothes 👕',
          category: 'Clothes'
        },
        {
          title: 'Shoes 👢',
          category: 'Shoes'
        },
        {
          title: 'Cosmetics 💄',
          category: 'Cosmetics'
        },
        {
          title: 'Jewelry 💍',
          category: 'Jewelry'
        },
        {
          title: 'Bags 👜',
          category: 'Bags'
        },
        {
          title: 'Glasses 👓',
          category: 'Glasses'
        },
        {
          title: 'Others ✨',
          category: 'Others'
        },
      ]
    };
  }

  componentDidMount() {
    //changing the index after every five seconds
    this.timeout = setInterval(() => {
      let currentIndex = this.state.textIndex;
      this.setState({ textIndex: currentIndex + 1 });
    }, 5000);

    //when the component is mounted get the userID and the webtoken 
    AsyncStorage.multiGet(['userId', 'webtoken']).then(result => {
      this.setState({
        userId: result[0][1],
        webToken: result[1][1],
      })
      this.getTips()//calling the get tips function
      this.validUserCheck()
    })

  }

  validUserCheck = async () => {
    try {
      const response = await axios.get(`https://slick-project.herokuapp.com/api/validUser/${this.state.userId}`, { headers: { 'x-auth-token': this.state.webToken } })

      if (!response.data) {
        
        let keys = ['webtoken', 'userId', 'account', 'fullName', 'username'];
        AsyncStorage.multiRemove(keys, (err) => {

          const actionToDispatch = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'LoginBuyer' })] // Array!
          })
          alert('You have been blocked, Contact Slick on instagram for more information'); 
    
        this.props.navigation.dispatch(actionToDispatch)
      
        });
        
          
      }




    }

    catch (error) {
      alert('Something Failed, Could not connect to server')
    }
  }


  getTips = async () => {
    //getting all the tips added by the admin
    try {
      const response = await axios.get(`https://slick-project.herokuapp.com/api/tips`, { headers: { 'x-auth-token': this.state.webToken } })

      const data = await response.data

      tipsArray = tipsArray.concat(data)

      shuffledTipsArray = shuffle(tipsArray)

    }

    catch (error) {
      alert('Something Failed, Could not connect to server')
    }


  }

  componentWillUnmount() {
    //clear interval when the component is unmounted
    clearInterval(this.timeout);
  }


  //navigating to the category and passing in as parameters the category clicked on
  viewCategory = (category) => {
    this.props.navigation.navigate('Category', {
      category: category
    })

  }



  render() {
    //console.log(this.state.userId)
    const { navigate } = this.props.navigation
    let tipThatChanges = shuffledTipsArray[this.state.textIndex % shuffledTipsArray.length]
    return (
      <Container>
        <Header
          leftComponent={<Icon name='user' type='evilicon' color='black' size={hp('6.5')} onPress={() => { this.props.navigation.dispatch(DrawerActions.toggleDrawer()) }} />}
          centerComponent={{ text: 'Home', style: { color: 'black', fontSize: wp('5') } }}
          rightComponent={<Icon name='shoppingcart' type='antdesign' color='black' size={hp('4')} onPress={() => { navigate('Cart') }} />}
          containerStyle={{
            backgroundColor: '#6699ff',
            height: hp('12%'),
          }}
        />
        <View >
          <FlatList

            horizontal={true}
            showsHorizontalScrollIndicator={false}
            data={this.state.category}
            keyExtractor={item => item.category}
            renderItem={({ item }) =>
              <TouchableOpacity style={styles.items} onPress={() => this.viewCategory(item.category)}>
                <Text style={styles.text}>{item.title}</Text>
              </TouchableOpacity>
            }
          />
          <View style={{ marginTop: hp('30'), alignItems: "center", padding: wp('3') }}>
            <Text style={{ fontSize: wp('4') }}>Tips💡 </Text>
            <Text style={{ textAlign: 'center', paddingTop: hp('0.5') }}>{tipThatChanges}</Text>
          </View>
        </View>

      </Container>
    );
  }
}



const styles = StyleSheet.create({
  items: {
    borderColor: '#6699ff',
    borderWidth: wp('0.35'),
    borderRadius: wp('2'),
    padding: wp('0.9'),
    margin: wp('1')

  },
  itemOthers: { borderColor: '#6699ff', borderWidth: wp('0.35'), borderRadius: wp('2'), marginRight: wp('5'), padding: wp('0.5'), margin: wp('1') },
  itemPicked: {
    backgroundColor: '#6699ff',
    //borderWidth: wp('0.35'),
    borderRadius: wp('2'),
    padding: wp('0.8'),
    margin: wp('1')
  },
  text: {
    fontSize: wp('4'),
    color: '#666666'
  },
  textPicked: {
    fontSize: wp('4'),
    color: '#fff'
  }

})




