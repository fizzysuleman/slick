import React, { PureComponent } from 'react';
import {View,Text,ScrollView} from 'react-native'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment } from 'native-base';
import {Font,AppLoading} from 'expo'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import SchoolSearch from '../SchoolSearch'
import OtherSearch from '../OtherSearch'

export default class SegmentOutsideHeaderExample extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
       loading: false,
       segmentActive:'All'
       };
    }
    
    // async componentWillMount() {
    // await Font.loadAsync({
    // 'Roboto': require("native-base/Fonts/Roboto.ttf"),
    // 'Roboto_medium': require("native-base/Fonts/Roboto.ttf")
    // });
    // this.setState({ loading: true });
    // }
  // render() {
  //   if (!this.state.loading) {
  //     return(
  //       <AppLoading/>
  //     )
  //   }
    render() {
    return (
      <Container>
        
        <Segment style={{backgroundColor:'#e8e8e8',height:hp('8')}}>
          <Button style={{height:hp('7'),borderTopLeftRadius:wp('1'),borderBottomLeftRadius:wp('1'),borderColor:'#6699ff',backgroundColor:this.state.segmentActive==='All'?'#6699ff':'white'}} first active={this.state.segmentActive==='All'} onPress={()=>this.setState({segmentActive:'All'})}>
            <Text style={{fontSize:wp('3.5'),color:this.state.segmentActive==='All'?'white':'#6699ff',padding:wp('2')}}>Others</Text>
          </Button>
          
          <Button style={{height:hp('7'),borderTopRightRadius:wp('1'),borderBottomRightRadius:wp('1'),borderColor:'#6699ff',backgroundColor:this.state.segmentActive==='School'?'#6699ff':'white'}} last active={this.state.segmentActive==='School'} onPress={()=>this.setState({segmentActive:'School'})}>
            <Text style={{fontSize:wp('3.5'),color:this.state.segmentActive==='School'?'white':'#6699ff',padding:wp('2')}}>School</Text>
          </Button>
        </Segment>
        {this.state.segmentActive==='All'&&<ScrollView padder>
        <OtherSearch searchTerm={this.props.searchTerm} searchItems={this.props.searchLocationItems} finished={this.props.finishedLocation} />
        </ScrollView>}
        {this.state.segmentActive==='School'&&<ScrollView padder>
          <SchoolSearch searchTerm={this.props.searchTerm} searchItems={this.props.searchSchoolItems} finished={this.props.finishedSchool}/>
        </ScrollView>}
      </Container>
    );
  }
}