import React, { Component } from 'react';
import { Platform, StatusBar, View, Keyboard, AsyncStorage } from 'react-native'
import { SearchBar, Header } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container } from 'native-base';
import SearchDisplay from '../components/SearchDisplay'
import SearchFancied from '../components/SearchFancied'
import axios from 'react-native-axios'

const webToken = AsyncStorage.getItem('webtoken')


export default class Search extends Component {
  constructor() {
    super()
    this.state = {
      search: '',
      searchLocation: '',
      searchSchool: '',
      searchTagItems: [],
      searchSellerItems: [],
      searchAvailableInLocationItems: [],
      searchAvailableInSchoolItems: [],
      focus: false,
      finishedTags: false,
      finishedSellers: false,
      finishedAvailableIn: false,
      finishedAvailableInSchool: false,
      loading: false,
      webToken: '',
      done: false
    };
  }


  componentDidMount() {

    AsyncStorage.multiGet(['userId', 'webtoken']).then(result => {
      this.setState({
        webToken: result[1][1],
        done: true
      })
    })

  }

  onFocused = () => {

    this.setState({ focus: true })


  }

  handleCancel = () => {
    this.setState({ focus: false })
  }
  getTagsSearch = async () => {
    if (this.state.done) {
      try {
        this.setState({ loading: true })
        if (this.state.search !== '') {
          const response = await axios.get(`https://slick-project.herokuapp.com/api/search/tags?searchTerm=${this.state.search}&page=${0}&pageSize=${15}`,
            {
              headers: { 'x-auth-token': this.state.webToken }
            })

          const data = await response.data
          await this.setState({
            searchTagItems: data,
            loading: false,
            finishedTags: true
          })
        }
      }


      catch (error) {
        alert('Something Failed, Could not connect to server')
      }
    }
  }

  getSellersSearch = async () => {
    if (this.state.done) {
      try {
        this.setState({ loading: true })
        if (this.state.search !== '') {
          const response = await axios.get(`https://slick-project.herokuapp.com/api/search/sellers?searchTerm=${this.state.search}`,
            {
              headers: { 'x-auth-token': this.state.webToken }
            })

          const data = await response.data
          await this.setState({
            searchSellerItems: data,
            loading: false,
            finishedSellers: true
          })
        }
      }


      catch (error) {
        alert('Something Failed, Could not connect to server')
      }
    }
  }

  getAvailableInSearch = async () => {
    if (this.state.done) {
      try {
        this.setState({ loading: true })
        if (this.state.search !== '') {
          const response = await axios.get(`https://slick-project.herokuapp.com/api/search/availableIn?searchTerm=${this.state.search}&searchLocation=${this.state.searchLocation}`,
            {
              headers: { 'x-auth-token': this.state.webToken }
            })

          const data = await response.data
          await this.setState({
            searchAvailableInLocationItems: data,
            loading: false,
            finishedAvailableIn: true

          })
        }
      }


      catch (error) {
        alert('Something Failed, Could not connect to server')
      }
    }
  }

  getAvailableInSchoolSearch = async () => {
    if (this.state.done) {

      try {
        this.setState({ loading: true })
        if (this.state.search !== '') {
          const response = await axios.get(`https://slick-project.herokuapp.com/api/search/availableInSchool?searchTerm=${this.state.search}&searchSchool=${this.state.searchSchool}`,
            {
              headers: { 'x-auth-token': this.state.webToken }
            })

          const data = await response.data
          await this.setState({
            searchAvailableInSchoolItems: data,
            loading: false,
            finishedAvailableInSchool: true
          })
        }

      }


      catch (error) {
        alert('Something Failed, Could not connect to server')
      }
    }
  }



  updateSearch = async (search) => {
    await this.setState({ search });
    this.getTagsSearch()
    this.getSellersSearch()
    this.getAvailableInSearch()
    this.getAvailableInSchoolSearch()
    if (this.state.search.length == '') {
      this.setState({ loading: false })
    }
  }

  render() {
    const { search, finishedTags, finishedSellers, finishedAvailableIn, finishedAvailableInSchool } = this.state;

    return (
      <View >
        <SearchBar
          platform={Platform.OS === "ios" ? "ios" : "android"}
          showLoading={this.state.loading}
          round
          onCancel={() => this.handleCancel()}
          onSubmitEditing={() => Keyboard.dismiss()}
          clearIcon
          cancelButtonTitle="Cancel"
          placeholder="Search for Tags, Sellers, Clothes..."
          onChangeText={this.updateSearch}
          value={search}
          onFocus={() => this.onFocused()}
          containerStyle={{
            backgroundColor: '#6699ff',
            height: hp('12'),
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: 'auto',
            paddingBottom: 'auto',
            ...Platform.select({
              android: {
                paddingTop: StatusBar.currentHeight,
              },

            }),
          }}
          inputContainerStyle={{
            backgroundColor: 'white',
            height: hp('5'),
            ...Platform.select({
              android: {
                width: wp('94'),
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: hp('2.5')
              },
              ios: {
                paddingTop: StatusBar.currentHeight
              }
            }),
          }}
          cancelButtonProps={{
            buttonStyle: {
              height: hp('12'),
              justifyContent: 'center',

              ...Platform.select({
                android: {
                  paddingTop: StatusBar.currentHeight,
                },
                ios: {
                  paddingTop: StatusBar.currentHeight,
                }
              }),
            },
            color: 'white',

          }}



        />
        <View>
          {this.state.focus ? <SearchDisplay searchTerm={this.state.search} searchTagItems={this.state.searchTagItems} searchSellerItems={this.state.searchSellerItems} searchAvailableInLocationItems={this.state.searchAvailableInLocationItems} searchAvailableInSchoolItems={this.state.searchAvailableInSchoolItems} finishedTags={finishedTags} finishedSellers={finishedSellers} finishedAvailableIn={finishedAvailableIn} finishedAvailableInSchool={finishedAvailableInSchool} /> : <SearchFancied />}
        </View>
      </View>
    );
  }
}