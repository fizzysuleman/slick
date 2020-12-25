import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { Rating, AirbnbRating } from 'react-native-ratings';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';

export default class StarRating extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ marginTop: 'auto', marginBottom: 'auto' }}>
                <Rating
                    showRating={false}
                    type="star"
                    fractions={1}
                    startingValue={this.props.averageRating}
                    readonly
                    imageSize={heightPercentageToDP('2')}
                    style={{ paddingHorizontal: widthPercentageToDP('0.5') }}
                />
            </View>
        );
    }
}
