import React, { Component } from 'react';
import { Text, View, StyleSheet,RefreshControl } from 'react-native'
import SearchFanciedItems from './SearchFanciedItems'
import { Container, Content, Tab, Tabs, ScrollableTab, TabHeading } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ListItem, Icon } from 'react-native-elements'
import PTRView from 'react-native-pull-to-refresh';


export default class SearchFancied extends Component {
    constructor(props) {
        super(props);
        this.state = {
          isRefreshing:false
        }

    }
    _onRefresh=async()=>{
        await this.setState({isRefreshing: true})
         
        this.setState({isRefreshing: false})
        
        
       }
    render() {
        return (
            <View   >
                <ListItem 
                    linearGradientProps={{
                        colors: ['#6699ff', '#99ccff'],
                        start: [1, 0],
                        end: [0.4, 0],
                    }}
                    title="Top Fancied Products 🔥🙌"
                    titleStyle={{fontSize:wp('4'), color: 'white', fontWeight: 'bold' }}
                    containerStyle={{
                        height:hp('8')
                    }}
                />
                <SearchFanciedItems/>
            </View>
        )
    }
}

