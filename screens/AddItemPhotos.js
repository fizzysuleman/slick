import React from 'react';
import { StyleSheet, Text, View, ScrollView, Image, Platform, StatusBar, TouchableOpacity } from 'react-native';
import { ImageBrowser, CameraBrowser } from 'expo-multiple-imagepicker';
import { Button, Header, Icon } from 'react-native-elements'
import NumberFormat from 'react-number-format';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AsyncStorage } from 'react-native';
import axios from 'react-native-axios'
import { Container, Content } from 'native-base';
import {
  BallIndicator,
  BarIndicator,
  DotIndicator,
  MaterialIndicator,
  PacmanIndicator,
  PulseIndicator,
  SkypeIndicator,
  UIActivityIndicator,
  WaveIndicator,
} from 'react-native-indicators';

// const userId = AsyncStorage.getItem('userId')
// const webToken = AsyncStorage.getItem('webtoken')


export default class TestApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.navigation.state.params.name,
      price: this.props.navigation.state.params.price,
      tags: this.props.navigation.state.params.tags,
      colors: this.props.navigation.state.params.colors,
      sizes: this.props.navigation.state.params.sizes,
      location: this.props.navigation.state.params.location,
      school: this.props.navigation.state.params.school,
      category: this.props.navigation.state.params.category,
      negotiable: this.props.navigation.state.params.negotiable,
      photoUrl: [],
      imageBrowserOpen: false,
      cameraBrowserOpen: false,
      photos: [],
      loading: false,
      userId:'',
      webToken:'',
      doneFetchingStorage:false
    }
  }
  

  componentDidMount(){
    AsyncStorage.multiGet(['userId','webtoken']).then(result => {
      this.setState({
          userId:result[0][1],
          webToken:result[1][1],
          doneFetchingStorage:true
      })
  })
  }

  handleFinish = () => {
    const { photos,doneFetchingStorage } = this.state
    this.setState({ loading: true })
    if(doneFetchingStorage){
    const data = new FormData();

    photos.forEach((item, i) => {
      const newFile = {
        uri:
          Platform.OS === "android" ? item.uri : item.file,
          //Platform.OS === "android" ? item.uri : item.uri.replace("file://", ""),
       type: 'image/jpg',
        name: Platform.OS === "android" ? item.uri : item.file
      }
      data.append('productImages', newFile)
    })

    Object.keys({ userId: this.state.userId, itemName: this.state.name }).forEach(key => {
      data.append(key, { userId: this.state.userId, itemName: this.state.name }[key]);
    });
    fetch("https://slick-project.herokuapp.com/api/uploadProductImages", {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "multipart/form-data",
        'x-auth-token': this.state.webToken
      }
    })
      .then(response => response.json())
      .then(async response => {
        if(response.response){
        const photoUrl = await response.response
        
        if (photoUrl.length !== 0) {
          this.postItemDetails(photoUrl)
        }
      }
      else{
        this.setState({ loading: false })
        alert('Could not Upload Image')
      }
      })
      .catch(error => {
        this.setState({ loading: false })
        console.log("upload error", error);
        alert("Uploa failed!");
      });
    }

  }

  postItemDetails = (imageUrl) => {
    let { name, colors, sizes, tags, location, school, price,negotiable, category,doneFetchingStorage } = this.state;
    console.log(negotiable)
    if(doneFetchingStorage){
    axios.post('https://slick-project.herokuapp.com/api/addNewPost', {
      nameOfItem: name,
      price: price,
      colors: colors,
      sizes: sizes,
      hashTags: tags,
      location: location,
      school: school,
      category: category,
      negotiable:negotiable,
      imageUrl: imageUrl,
      brandId: this.state.userId,

    }, {
        headers: {
          'x-auth-token': this.state.webToken
        }
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ loading: false })
          this.props.navigation.navigate('Stats')
        }
      })
      .catch((err) => {
        this.setState({ loading: false })
        alert(err.response.data)
      })
    }
  }

  

 
  callback=(callback)=>{
    callback.then((photos)=>{
      console.log(photos)
      this.setState({
        imageBrowserOpen: false,
        photos
      })
    }).catch((e) => console.log(e))
  }

  imageBrowserCallback =  (callback) => {
    // this.setState({
    //   imageBrowserOpen: false,
    // })
    this.callback(callback)
  }

  renderImage(item, i) {
    //console.log("fefe",item.file)
    return (
      <Image
        style={{ height: wp('40'), width: wp('40'), borderRadius: wp('0.8'), marginBottom: hp('1') }}
        source={{ uri: item.file }}
        key={i}
      />
    )
  }

  render() {
    let { name, colors, sizes, tags, location, school, price, photos, category, loading } = this.state;
    // console.log(this.state)

    if (this.state.imageBrowserOpen) {
      return (<ImageBrowser max={3} callback={this.imageBrowserCallback} />);
    } else if (this.state.cameraBrowserOpen) {
      return (<CameraBrowser max={3} callback={this.imageBrowserCallback} />);
    }
    return (
      <Container>
        <Header
          leftComponent={<Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { this.props.navigation.goBack() }} />}
          centerComponent={{ text: 'Add new Item', style: { color: 'black', fontSize: wp('5') } }}
          containerStyle={{
            backgroundColor: '#4d88ff',
            height: hp('12%'),
          }}
        />

        <View style={styles.container}>
          <ScrollView>

            <View style={{ padding: wp('5') }}>
              <View style={[styles.input]}>
                <Text style={styles.text}>Name of Item:   {name}</Text>
                <Text style={styles.text}>Category:   {category}</Text>

                <NumberFormat
                  value={price}
                  displayType={'text'}
                  prefix={'₦'}

                  thousandSeparator={true}
                  renderText={value => <Text style={styles.text}>Price:   {value}</Text>}
                />

                <Text style={styles.text}>HashTags:   {tags}</Text>
                {colors ? <Text style={styles.text}>Color available:   {colors}</Text> : null}
                {sizes ? <Text style={styles.text}>Sizes:   {sizes}</Text> : null}
                {school ? <Text style={styles.text}>School:   {school}</Text> : null}
                <Text style={{ fontSize: wp('3.5'), padding: wp('1.8'), color: 'white' }}>Location:   {location}</Text>
              </View>
            </View>
            <Button
              raised
              icon={{ name: 'photo-library', type: 'material', color: 'white', size: wp('6') }}
              title='Add Item Photo'
              onPress={() => this.setState({ imageBrowserOpen: true })}
              buttonStyle={{
                backgroundColor: '#4d88ff',
                width: wp('90'),
                height: hp('6')

              }}
              titleStyle={{
                fontSize: wp('4.5')
              }}
              containerStyle={{
                width: wp('90'),
                marginLeft: 'auto',
                marginRight: 'auto'
              }}
            />
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', padding: wp('5'), justifyContent: 'space-around' }} >
              {this.state.photos.map((item, i) => this.renderImage(item, i))}
            </View>
          </ScrollView>

        </View>
        <TouchableOpacity disabled={photos.length === 0} style={photos.length === 0 ? styles.buttonDisabled : styles.buttonEnabled} onPress={() => this.handleFinish()} >
          {!loading && <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: wp('4') }}>Finish! 👌</Text>}
          {loading && <BallIndicator color='#fff' size={hp('4')} style={{ paddingVertical: hp('1.4') }} count={10} />} 
        </TouchableOpacity>
      </Container>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6699ff',
    borderBottomColor: '#e8e8e8',
    borderBottomWidth: wp('0.1'),

  },
  text: {
    fontSize: wp('3.5'),
    padding: wp('1.8'),
    color: '#f2f2f2',
    borderBottomColor: 'white',
    borderBottomWidth: hp('0.1')
  },
  input: {
    // height: hp('6'),
    backgroundColor: 'rgba(255,255,255,0.2)',
    marginBottom: hp('3.5'),
    color: '#fff',
    paddingHorizontal: wp('4'),
    borderRadius: wp('1'),

  },
  buttonEnabled: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4d88ff',
    height: hp('6')
  },
  buttonDisabled: {

    alignItems: 'center',
    justifyContent: 'center',
    height: hp('6'),
    backgroundColor: '#ccddff',


  },
});