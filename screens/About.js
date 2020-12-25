import React, { Component } from 'react';
import {View,Text} from 'react-native'
import {Font,AppLoading} from 'expo'
import { Container, Header, Left, Body, Right, Button, Icon, Title, Segment, Content } from 'native-base';


export default class About extends Component {
  constructor(props) {
    super(props);
    this.state = { loading: false };
    }
    
    // async componentWillMount() {
    // await Font.loadAsync({
    // 'Roboto': require("native-base/Fonts/Roboto.ttf"),
    // 'Roboto_medium': require("native-base/Fonts/Roboto.ttf")
    // });
    // this.setState({ loading: true });
    // }


  render() {
    if (!this.state.loading) {
      return(
        <AppLoading/>
      )
    }
    return (
      <Container>
        
        <Segment>
          <Button first >
            <Text>Puppies</Text>
          </Button>
          <Button >
            <Text>Kittens</Text>
          </Button>
          <Button last >
            <Text>Cubs</Text>
          </Button>
        </Segment>
        <Content padder >
          <Text>Awesome segment</Text>
        </Content>
      </Container>
    );
  }
}