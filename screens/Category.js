import React, { PureComponent } from 'react';
import { View, Text, RefreshControl, AsyncStorage, FlatList,StyleSheet,ActivityIndicator } from 'react-native';
import { Container, Content } from 'native-base';
import { Header, Icon } from 'react-native-elements'
import CardComponent from '../components/CardComponent';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CardButton from '../components/CardButton'
import axios from 'react-native-axios'

// const webToken = AsyncStorage.getItem('webtoken')


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


export default class Category extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            category: this.props.navigation.state.params.category,
            item: [],
            page:0,
            fetching:false,
            finished: false,
            isRefreshing: false,
            end:false,
            webToken:'',
            userId:'',
        };
    }

    componentDidMount() {

        //when components mounts ge the usrId and the webtoen
        AsyncStorage.multiGet(['userId','webtoken']).then(result => {
            this.setState({
                userId:result[0][1],
                webToken:result[1][1],
            })
            //call the functions
        this.getItems()
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

      //fetch the items under the category
    getItems = async (item) => {
        //setting the state of finished to be inttially false and the array item to be empty and starting with a page number of 0
        await this.setState({
            finished: false,
            item: [],
            page:0
        })
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/allPosts?category=${this.state.category}&page=${this.state.page}&pageSize=${10}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data
            let itemsData = await data.map((item) => {
                return item
            })

            // let item = shuffle(itemsData)

            //setting the state of item to the response and setting finished to true
            this.setState({ item:itemsData, finished: true })

        }

        catch (error) {
            alert('Something Failed, Could not connect to server')
        }


    }

    //the style of the footer
    renderFooter() {
        return (
          //Footer View with Load More button
          <View style={styles.footer}>
        
              {this.state.fetching ? (
                <ActivityIndicator color="black" style={{ marginLeft: 8 }} />
              ) : null}
          </View>
        );
      }

    


    loadMoreData=async()=>{
        await this.setState({page:this.state.page+1,fetching:true})
        try {
            const response = await axios.get(`https://slick-project.herokuapp.com/api/allPosts?category=${this.state.category}&page=${this.state.page}&pageSize=${10}`, { headers: { 'x-auth-token': this.state.webToken } })

            const data = await response.data

            if(data.length>0){
                let itemsData = await data.map((item) => {
                return item
            })
            
//fetching more items and adding it to the initial
                this.setState({ 
                item:[...this.state.item,...itemsData],
                fetching:false })
                }
                else{
                    this.setState({
                        fetching:false,
                        end:true
                    })
                }
        }

        catch (error) {
            alert('Something Failed, Could not connect to server')
        }

    }




    
    //the cardcomponent loop and passing in the props
    renderCardComponent = () => {
        const { item, finished } = this.state

        var cards = item

        return (finished && item.length == 0) ? <Content  refreshControl={<RefreshControl refreshing={this.state.isRefreshing} onRefresh={this._onRefresh} />}>
            <Text style={{marginTop: hp('40'), fontSize: wp('5'), textAlign: 'center', color: 'grey' }}>This category does not have any item under it.</Text>
        </Content>
            : <FlatList
                data={cards}
                keyExtractor={item => item._id}
                refreshing={this.state.isRefreshing}
                onRefresh={this._onRefresh}
                onEndReached={!(this.state.end)?this.loadMoreData:null}
                onEndReachedThreshold ={0.1}
                // ItemSeparatorComponent={() => <View style={styles.separator} />}
                ListFooterComponent={this.renderFooter.bind(this)}
                renderItem={({ item }) =>
                    <View >
                        <CardComponent card={item} userId={this.state.userId} webToken={this.state.webToken}
                            buttons={
                                <CardButton addedToWishList={item.addedToWishList} addedToCart={item.addedToCart} sellerId={item.brandId} postId={item._id} itemName={item.nameOfItem} userId={this.state.userId} webToken={this.state.webToken} />
                            } />

                    </View>

                }
            />

    }


//on refresh reget the items 
    _onRefresh = async () => {
        await this.setState({ isRefreshing: true })
        await this.getItems()
        // await this.shuffleItems()
        this.setState({ isRefreshing: false })


    }



    render() {
        const { finished, item } = this.state

        return (
            <Container>
                <Header
                    leftComponent={<Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { this.props.navigation.goBack() }} />}
                    centerComponent={{ text: `${this.state.category}`, style: { color: 'black', fontSize: wp('5') } }}
                    //   rightComponent={<Icon name='shoppingcart' type='antdesign' color='black' size={hp('4')} onPress={() => { this.props.navigation.navigate('Cart') }} />}
                    containerStyle={{
                        backgroundColor: '#6699ff',
                        height: hp('12%'),
                    }}
                />
                {!finished && <View style={{marginTop: hp('40')}}>
                        <Text style={{ fontSize: wp('5'), textAlign: 'center', color: 'grey' }}>Loading Items...</Text>
                </View>} 


                {this.renderCardComponent()}


            </Container>
        );
    }
}


const styles = StyleSheet.create({
    footer: {
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
      },
    separator: {
      height: 0.5,
      backgroundColor: 'rgba(0,0,0,0.4)',
    }

})