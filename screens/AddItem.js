import React, { Component } from 'react';
import { Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, View ,ScrollView} from 'react-native'
import { Header, Icon, Slider } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Content, ActionSheet } from 'native-base';
import NumberFormat from 'react-number-format';
import ToggleSwitch from 'toggle-switch-react-native'


var BUTTONS = ["Clothes", "Shoes", "Bag", "Cosmetics", "Glasses", "Jewllery", "Others"];
var DESTRUCTIVE_INDEX = 3;
var CANCEL_INDEX = 7;



class AddItem extends Component {
    constructor() {
        super()
        this.state = {
            name: '',
            colors: '',
            sizes: '',
            tags: '',
            location: '',
            school: '',
            price: '',
            category: '',
            negotiable:false
        };
    }


    continueAddItem = () => {
        let { name, colors, sizes, tags, location, school, price, category,negotiable } = this.state;
        this.props.navigation.navigate('AddItemPhotos', {
            name: name,
            price: price,
            tags: tags,
            colors: colors,
            sizes: sizes,
            location: location,
            school: school,
            category: category,
            negotiable
        })
    }




    render() {
        let { name, tags, location, price, category,negotiable } = this.state;
        return (
            <Container>
                <Header
                    leftComponent={<Icon name='ios-arrow-back' type='ionicon' color='black' size={hp('5')} onPress={() => { this.props.navigation.goBack() }} />}
                    centerComponent={{ text: 'Add new Item', style: { color: 'black', fontSize: wp('5') } }}
                    containerStyle={{
                        backgroundColor: '#4d88ff',
                        height: hp('12%'),
                    }}
                />
                <KeyboardAvoidingView 
                //keyboardVerticalOffset={hp('100')}
                behavior={Platform.OS === "ios" ? "padding" : "height"} style={{ flex: 1, backgroundColor: '#6699ff', justifyContent: 'center',height:hp('100') }}>

                    <ScrollView style={{ padding: wp('7') }}>
                        <TextInput
                            style={styles.input}
                            placeholder='Name of Item'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(name) => this.setState({ name })}
                            onSubmitEditing={() => this.priceInput.focus()}
                            maxLength={50}
                        />
                        <TouchableOpacity style={styles.input}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        // cancelButtonIndex: CANCEL_INDEX,
                                        // destructiveButtonIndex: DESTRUCTIVE_INDEX,
                                        title: "Select Category"
                                    },
                                    buttonIndex => {
                                        this.setState({ category: BUTTONS[buttonIndex] });
                                    }
                                )}
                        >
                            {category ? <Text style={{ color: 'white', marginTop: 'auto', marginBottom: 'auto' }}>{category}</Text> : <Text style={{ color: 'rgba(255,255,255,0.7)', marginTop: 'auto', marginBottom: 'auto' }}>Category</Text>}
                        </TouchableOpacity>

                        <NumberFormat
                            value={price}
                            displayType={'text'}
                            thousandSeparator={true}
                            maxLength={8}
                            prefix={'₦'}
                            renderText={value => (
                                <TextInput
                                    style={styles.input}
                                    placeholder='Price'
                                    placeholderTextColor='rgba(255,255,255,0.7)'
                                    returnKeyType='next'
                                    autoCorrect={false}
                                    onChangeText={(price) => this.setState({ price })}
                                    ref={(input) => this.priceInput = input}
                                    onSubmitEditing={() => this.tagInput.focus()}
                                    value={value}
                                    keyboardType="numeric"
                                    maxLength={8}
                                />
                            )}
                        />

                        <TextInput
                            style={styles.input}
                            placeholder='Tags'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(tags) => this.setState({ tags })}
                            ref={(input) => this.tagInput = input}
                            onSubmitEditing={() => this.colorInput.focus()}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Colors Available (optional)'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(colors) => this.setState({ colors })}
                            ref={(input) => this.colorInput = input}
                            onSubmitEditing={() => this.sizeInput.focus()}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Sizes Available (optional)'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(sizes) => this.setState({ sizes })}
                            ref={(input) => this.sizeInput = input}
                            onSubmitEditing={() => this.locationInput.focus()}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Location'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(location) => this.setState({ location })}
                            ref={(input) => this.locationInput = input}
                            onSubmitEditing={() => this.schoolInput.focus()}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='School available (optional)'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(school) => this.setState({ school })}
                            ref={(input) => this.schoolInput = input}
                        />

                        <View style={{ paddingBottom:hp('2') }}>
                            <ToggleSwitch
                                isOn={this.state.negotiable}
                                onColor='#004de6'
                                offColor='#e8e8e8'
                                label='Negotiable'
                                labelStyle={{ color: 'rgba(255,255,255,0.7)', fontWeight: '100' ,fontSize:wp('4') }}
                                size='medium'
                                onToggle={(isOn) => this.setState({negotiable:isOn})}
                            />
                        </View>
                        {/* disabled={!name || !price || !tags || !location || !category} */}
                        
                        <TouchableOpacity disabled={!name || !price || !tags || !location || !category}  style={!name || !price || !tags || !location || !category ? styles.buttonDisabled : styles.buttonEnabled} onPress={() => this.continueAddItem()}>
                            <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700' }}>Continue to Add Images</Text>
                        </TouchableOpacity>

                    </ScrollView>
                </KeyboardAvoidingView>
            </Container>

        );
    }
}


export default withNavigation(AddItem)

const styles = StyleSheet.create({
    input: {
        height: hp('6'),
        backgroundColor: 'rgba(255,255,255,0.2)',
        marginBottom: hp('3.5'),
        color: '#fff',
        paddingHorizontal: wp('4'),
        borderRadius: wp('1'),

    },
    buttonDisabled: {

        padding: wp('7'),
        borderRadius: wp('2'),
        backgroundColor: '#ccddff',
        paddingVertical: 15,
        marginBottom:wp('15')

    },
    buttonEnabled: {
        padding: wp('7'),
        borderRadius: wp('2'),
        backgroundColor: '#4d88ff',
        paddingVertical: 15,
        marginBottom:wp('15')

    }
})
