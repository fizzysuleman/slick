import React, {PureComponent} from 'react';
import { StyleSheet,Text,View,Image,AsyncStorage } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { withNavigation,NavigationActions,StackActions } from 'react-navigation';


let image= require('../assets/appIntro2.png')
const slides = [
    {
        key:'0',
        imageUri: require('../assets/appIntro1.png')
    },
    {
        key:'1',
        imageUri: require('../assets/appIntro2.png')
    },
    {
        key:'2',
        imageUri: require('../assets/appIntro3.png')
    },
    {
        key:'3',
        imageUri: require('../assets/appIntro4.png')
    },
    {
        key:'4',
        imageUri: require('../assets/appIntro5.png')
    }
];

export default class AppIntro extends PureComponent {
    constructor() {
        super()
        this.state = {
            account:'',
            done:false            
        }
    }
    _renderItem = (item) => {
        return (
            <View  style={{flex:1,width:wp('100'),height:hp('100')}}>
            <Image style={{width:wp('100'),height:hp('100')}} source={item.item.imageUri} />
        </View>
        );
    }

    componentDidMount(){
        AsyncStorage.multiGet(['account','webtoken']).then(result => {
            this.setState({
                account:result[0][1],
                done:true
            })
        })
    }

    _onDone = () => {
        if(this.state.done){
            if(this.state.account=='buyer'){
                const actionToDispatch = StackActions.reset({
                    index: 0,
                    key:null,
                    actions: [NavigationActions.navigate({routeName:'BuyerScreen'})] // Array!
                  })
                  this.props.navigation.dispatch(actionToDispatch)
            }
            else{
                const actionToDispatch = StackActions.reset({
                    index: 0,
                    key:null,
                    actions: [NavigationActions.navigate({routeName:'SellerScreen'})] // Array!
                  })
                  this.props.navigation.dispatch(actionToDispatch)
            }
        }
        // User finished the introduction. Show real app through
        // navigation or simply by controlling state
    }
    render() {
        // console.log(slides)
        return (
        <AppIntroSlider 
        renderItem={this._renderItem} 
        slides={slides}
        onDone={this._onDone}
        keyExtractor={item => item.key}
        showSkipButton={true}
        />
        )}
}