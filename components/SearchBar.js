import React, { Component } from 'react';
import {Platform,StatusBar,StyleSheet} from 'react-native'
import { SearchBar,Header } from 'react-native-elements';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SearchDisplay from './SearchDisplay'


export default class SearchBarComponent extends Component {
  constructor(){
    super()
    this.state = {
    search: '',
  };
  }
  
  
  
  updateSearch = search => {
    this.setState({ search });
  };

  render() {
    const { search } = this.state;

    return (
      
      <SearchBar
        ref={this.search}
        placeholder="Search for Tags, Sellers, Clothes..."
        onChangeText={this.updateSearch}
        value={search}
        onFocus={()=>console.log('focus')}
        containerStyle={{
          backgroundColor: '#6699ff',
          height:hp('12%'),
          ...Platform.select({
            android: {
              paddingTop: StatusBar.currentHeight,
            }
          })
        }}
        inputContainerStyle={{
          backgroundColor:'white',
          marginTop:5,
          marginBottom:5
        }}
      />
      
    );
  }
}




















// import { Container, Header, Item, Input, Icon, Button, Text } from 'native-base';
// import {Font,AppLoading} from 'expo'


// export default class SearchBar extends Component {
//   constructor(props) {
//     super(props);
//     this.state = { loading: false };
//     }
    
//     async componentWillMount() {
//     await Font.loadAsync({
//     'Roboto': require("native-base/Fonts/Roboto.ttf"),
//     'Roboto_medium': require("native-base/Fonts/Roboto.ttf")
//     });
//     this.setState({ loading: true });
//     }
//   render() {
//     if (!this.state.loading) {
//       return(
//         <AppLoading/>
//       )
//     }else{
//       return (
//           <Header searchBar rounded style={[{ backgroundColor: '#6699ff', height: 70},styles.androidHeader]}>
//             <Item>
//               <Icon name="ios-search" />
//               <Input placeholder="Search" />
//               <Icon name="ios-people" />
//             </Item>
//             <Button transparent>
//               <Text>Search</Text>
//             </Button>
//           </Header>
//       );
//     }
    
//   }
// }

// const styles=StyleSheet.create({


// androidHeader: {
//   ...Platform.select({
//     android: {
//       paddingTop: StatusBar.currentHeight,
//     }
//   })
// }
// })


// <View style={[{backgroundColor: '#6699ff',height:90,justifyContent:'center',paddingHorizontal: 10},styles.androidHeader]}>
//           <View  style={{height:35,backgroundColor:'white', flexDirection:'row',padding:5,borderRadius:15,alignItems:'center'}}>
//            <Animatable.View animation={this.state.searchBarFocused?'fadeInLeft':'fadeInRight'} duration={400}>
//            {<Icon name={this.state.searchBarFocused?'md-arrow-back':'ios-search'} style={{fontSize:20}}/>}
//            </Animatable.View>
//            <TextInput placeholder='Search'style={{fontSize:18,marginLeft:15, flex:1}} />
//           </View>
//           </View>