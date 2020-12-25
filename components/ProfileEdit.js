import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, KeyboardAvoidingView,Platform } from 'react-native';
import { Container, Thumbnail, ListItem, List, Radio, Left, Right, Body, Content } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Icon, Header } from 'react-native-elements'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TextField from 'react-native-text-field'
import axios from 'react-native-axios'
import { withNavigation } from 'react-navigation'
import { UIActivityIndicator } from 'react-native-indicators';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';





class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
            homeAddress: "",
            location: "",
            sells: "",
            website: "",
            username: "",
            brandName: "",
            loadingSaved: false,
            loading: false,
            photo:{},
            imageUrl:'',
            userId:'',
            webToken:'',
            account:'',
            done:false

        };
    }
    componentDidMount() {
        AsyncStorage.multiGet(['userId','webtoken','account']).then(result => {
            this.setState({
              userId:result[0][1],
                webToken:result[1][1],
                account:result[2][1],
                done:true
            })
            this.getProfileDetails()

        })
    }

    getProfileDetails = () => {
        if (this.state.account == 'buyer') {
            this.buyerProfile()
        }
        else if (this.state.account == 'seller') {
            this.sellerProfile()
        }
        else {
            return null
        }

    }

    buyerProfile = async () => {
        this.setState({ loading: true })
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/buyerProfile/${this.state.userId}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data

            await this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                homeAddress: data.homeAddress,
                username: data.username,
                imageUrl:data.imageUrl
            })

            this.setState({ loading: false })


        }

        catch (error) {

            alert('Something Failed, Could not connect to server')
            this.setState({ loading: false })

        }
    }

    sellerProfile = async () => {
        this.setState({ loading: true })

        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/sellerProfile/${this.state.userId}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data

            await this.setState({
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phone: data.phone,
                homeAddress: data.homeAddress,
                brandName: data.brandName,
                location: data.location,
                sells: data.sells,
                website: data.website,
                imageUrl:data.imageUrl
            })
            this.setState({ loading: false })


        }

        catch (error) {
            alert('Something Failed, Could not connect to server')
            this.setState({ loading: true })

        }
    }

    onSave = (imageUrl) => {
        if (this.state.account == 'buyer') {
            this.buyerSave(imageUrl)
        }
        else if (this.state.account == 'seller') {
            this.sellerSave(imageUrl)
        }
        else {
            return null
        }
    }

    buyerSave = async (imageUrl) => {
        const { firstName, lastName, email, phone, homeAddress, username,done } = this.state
        this.setState({ loadingSaved: true })
        if(done){
        axios.put('https://slick-project.herokuapp.com/api/updateProfile/buyer', {
            userId: this.state.userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            homeAddress: homeAddress,
            username: username,
            imageUrl:imageUrl

        }
            , {
                headers: {
                    'x-auth-token': this.state.webToken
                }
            })
            .then(async (response) => {

                let multi_merge_pairs = [
                    ['username', this.state.username],
                    ['fullName', this.state.firstName+' '+this.state.lastName],
                  ];

                AsyncStorage.multiSet(multi_merge_pairs,err=>{
                    this.setState({ loadingSaved: false })
                    alert(response.data)
                    this.props.navigation.navigate('Home')

                })
                


            })
            .catch((error) => {
                this.setState({ loadingSaved: false })
                alert(error.response.data)
            })
        }
    }


    sellerSave = async (imageUrl) => {
        const { firstName, lastName, email, phone, homeAddress, location, sells, website, username, brandName,done } = this.state
        this.setState({ loadingSaved: true })
        if(done){

        axios.put('https://slick-project.herokuapp.com/api/updateProfile/seller', {
            userId: this.state.userId,
            firstName: firstName,
            lastName: lastName,
            email: email,
            phone: phone,
            homeAddress: homeAddress,
            brandName: brandName,
            location: location,
            sells: sells,
            website: website,
            imageUrl:imageUrl

        }
            , {
                headers: {
                    'x-auth-token': this.state.webToken
                }
            })
            .then(async (response) => {
                
                let multi_merge_pairs = [
                    ['username', this.state.brandName],
                    ['fullName', this.state.firstName+' '+this.state.lastName],
                  ];
                  
                AsyncStorage.multiSet(multi_merge_pairs,err=>{
                    this.setState({ loadingSaved: false })
                    alert(response.data)
                    this.props.navigation.navigate('Home')

                })

            })
            .catch((error) => {
                this.setState({ loadingSaved: false })
                alert(error.response.data)
            })
        }
    }

    getPermissionAsync = async () => {
        if (Constants.platform.ios) {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            if (status !== 'granted') {
                alert('Sorry, we need camera roll permissions to make this work!');
            }
        }
    }

    changePhoto = async () => {
        this.getPermissionAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [4, 3],
        });


        if (!result.cancelled) {
            // alert(result.uri)
            this.setState({imageUrl:result.uri})
            this.setState({photo:result})
        }
    };


    handleFinish = () => {
        const { photo } = this.state
        this.setState({ loadingSaved: true })
        if(this.state.done){

        const data = new FormData();
    
        data.append("profileImage", {
            name: photo.uri,
            type: 'image/jpg',
            uri:photo.uri 
        });
        
          Object.keys({ userId: this.state.userId}).forEach(key => {
            data.append(key, { userId: this.state.userId}[key]);
          });


        fetch("https://slick-project.herokuapp.com/api/uploadProfileImage", {
          method: "POST",
          body: data,
          headers: {
            "Content-Type": "multipart/form-data",
            'x-auth-token': this.state.webToken
          }
        })
          .then(response => response.json())
          .then(async response => {
            if(response){
            const photoUrl = await response.url
            
            if (photoUrl !== "") {
              this.onSave(photoUrl)
            }
          }
          else{
            this.setState({ loadingSaved: false })
            alert('Could not Upload Image')
          }
          })
          .catch(error => {
            this.setState({ loadingSaved: false })
            console.log("upload error", error);
            alert("Uploa failed!");
          });
        }
      }


    render() {
        const {account,photo, loading, loadingSaved,imageUrl, firstName, lastName, email, phone, homeAddress, location, sells, website, username, brandName } = this.state
        // const {goBack}=this.props.navigation

        return (
            <Container>
                <Header
                    leftComponent={<Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => this.props.goBack()} />}
                    centerComponent={{ text: 'Edit Profile', style: { color: 'black', fontSize: wp('4.5') } }}
                    rightComponent={<TouchableOpacity>
                        {!loadingSaved && <Icon name='save' type='antdesign' color='black' size={hp('4')} onPress={() => { (Object.keys(photo).length!==0)?this.handleFinish():this.onSave(imageUrl) }} />}
                        {loadingSaved && <UIActivityIndicator color='black' size={hp('3.5')} />}
                    </TouchableOpacity>}
                    containerStyle={{
                        backgroundColor: '#6699ff',
                        height: hp('12%'),
                    }}
                />
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1 }}>

                    <Content>
                        <View style={[{ marginTop: 30, flexDirection: "column", marginLeft: hp('2'), marginRight: hp('2'), marginBottom: hp('2'), height: hp('25'), borderBottomWidth: 1, borderBottomColor: '#E8E8E8' }]}>
                            <View style={{ alignItems: 'center' }}>
                                <Thumbnail style={{ width: wp('26'), height: wp('26'), borderRadius: wp('13') }} source={imageUrl?{uri:imageUrl}:require('../assets/me.png')} />
                            </View>
                            <View style={{ marginTop: 10, flex: 1, justifyContent: "flex-start", alignItems: 'center' }}>

                                <TouchableOpacity onPress={this.changePhoto}><Text style={{ color: 'grey', fontSize: wp('4') }} >Change Photo</Text></TouchableOpacity>
                            </View>
                            {/* <View><Text>{photo.file}</Text></View>
                            <View><Text>{imageUrl}</Text></View> */}

                        </View>
                        {(loading) && <View style={{ paddingTop: 'auto', marginBottom: 'auto' }}>
                            <UIActivityIndicator color={'grey'} size={hp('5')} />
                        </View>}
                        {!loading && <View>
                            <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='Firstname'
                                cellHeight={hp('7')}
                                value={firstName}
                                textType="default"
                                max
                                onInputChange={(firstName) => this.setState({ firstName })}
                            />
                            <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='Lastname'
                                cellHeight={hp('7')}
                                value={lastName}
                                textType="default"
                                onInputChange={(lastName) => this.setState({ lastName })}
                            />
                            {account==='buyer' ? <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='Username'
                                cellHeight={hp('7')}
                                value={username}
                                textType="default"
                                onInputChange={(username) => this.setState({ username })}
                            /> : null}
                            {account==='seller' ? <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='Brandname'
                                cellHeight={hp('7')}
                                value={brandName}
                                textType="default"
                                onInputChange={(brandName) => this.setState({ brandName })}
                            /> : null}
                            <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                keyboardType={'numeric'}
                                textType={'cel-phone'}
                                title='Phone number'
                                cellHeight={hp('7')}
                                value={phone}
                                onInputChange={(phone) => this.setState({ phone })}
                            />
                            <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='Email'
                                cellHeight={hp('7')}
                                value={email}
                                textType="default"
                                onInputChange={(email) => this.setState({ email })}
                            />
                            <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='Home Address'
                                cellHeight={hp('7')}
                                value={homeAddress}
                                textType="default"
                                onInputChange={(homeAddress) => this.setState({ homeAddress })}
                            />
                            {account==='seller' ? <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='General location of items'
                                cellHeight={hp('7')}
                                value={location}
                                textType="default"
                                onInputChange={(location) => this.setState({ location })}
                            /> : null}
                            {account==='seller' ? <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='Sells'
                                cellHeight={hp('7')}
                                value={sells}
                                textType="default"
                                onInputChange={(sells) => this.setState({ sells })}
                            /> : null}
                            {account==='seller' ? <TextField
                                placeholderStyle={{ color: 'grey', fontSize: wp('4') }}
                                textFieldStyle={{ borderColor: 'white', borderBottomWidth: hp('0.2'), borderBottomColor: '#e8e8e8' }}
                                titleStyle={{ color: 'grey', padding: hp('1') }}
                                title='Website'
                                cellHeight={hp('7')}
                                value={website}
                                textType="default"
                                onInputChange={(website) => this.setState({ website })}
                            /> : null}
                        </View>}
                    </Content>
                </KeyboardAvoidingView>
            </Container>
        );
    }
}

export default withNavigation(ProfileEdit)
