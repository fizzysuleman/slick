import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';

export default class componentName extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={{flex:1,justifyContent:'center',alignItems: 'center',}}>
        <Text> Places </Text>
      </View>
    );
  }
}
