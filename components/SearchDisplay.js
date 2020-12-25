import  React,{Component} from 'react';
import { View, StyleSheet, Dimensions,Text } from 'react-native';
import Tabs from '../components/Tabs'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Tags from './SearchTabs/Tags'
import Sellers from './SearchTabs/Sellers'
import Places from './SearchTabs/Places'
import AvailableIn from './SearchTabs/AvailableIn'

export default class SearchDisplay extends Component{
  render() {
    return (
      <View style={styles.container}>
        <Tabs>
          {/* First tab */}
          <View title="Tags" style={styles.content} >
            <Tags searchTerm={this.props.searchTerm} searchItems={this.props.searchTagItems} finished={this.props.finishedTags}/>
          </View>
          {/* Second tab */}
          <View title="Sellers" style={styles.content}>
           <Sellers searchTerm={this.props.searchTerm} searchItems={this.props.searchSellerItems} finished={this.props.finishedSellers}/>
          </View>
          {/* Third tab */}
           <View title="Available in" style={styles.content}>
            <AvailableIn searchTerm={this.props.searchTerm} searchLocationItems={this.props.searchAvailableInLocationItems}  searchSchoolItems={this.props.searchAvailableInSchoolItems} finishedLocation={this.props.finishedAvailableIn} finishedSchool={this.props.finishedAvailableInSchool} />
          </View>

        </Tabs>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  // App container
  container: {
    backgroundColor: '#6699ff',
    height:hp('86'),
  },
  // Tab content container
  content: {
    flex: 1,                           // Take up all available space
                   // Center horizontally
    backgroundColor: 'white',         // Darker background for content area
  },
  
});