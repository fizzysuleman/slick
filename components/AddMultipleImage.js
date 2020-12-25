import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { ImageBrowser } from 'expo-multiple-media-imagepicker';

export default class AddMultipleImage extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    //not yet in use, for future use.
    render() {
        return (
            <View>
                <ImageBrowser
                    max={101} // Maximum number of pickable image. default is None
                    headerCloseText={'Close'} // Close button text on header. default is 'Close'.
                    headerDoneText={'Done'} // Done button text on header. default is 'Done'.
                    headerButtonColor={'#E31676'} // Button color on header.
                    headerSelectText={'枚の画像を選択中'} // Word when picking.  default is 'n selected'.
                    mediaSubtype={'screenshot'} // Only iOS, Filter by MediaSubtype. default is display all.
                    badgeColor={'#E31676'} // Badge color when picking.
                    emptyText={'選択できる画像がありません'} // Empty Text
                    callback={this.imageBrowserCallback} // Callback functinon on press Done or Cancel Button. Argument is Asset Infomartion of the picked images wrapping by the Promise.
                />
            </View>
        );
    }
}
