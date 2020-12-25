import React, { Component } from 'react';
import { Text, TextInput, KeyboardAvoidingView, StyleSheet, TouchableOpacity, ScrollView, AsyncStorage, View } from 'react-native'
import { Header, Icon, Slider } from 'react-native-elements'
import { withNavigation } from 'react-navigation';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Container, Content, ActionSheet } from 'native-base';
import NumberFormat from 'react-number-format';
import axios from 'react-native-axios'
import ToggleSwitch from 'toggle-switch-react-native'

import {
    BallIndicator,
    BarIndicator,
    DotIndicator,
    MaterialIndicator,
    PacmanIndicator,
    PulseIndicator,
    SkypeIndicator,
    UIActivityIndicator,
    WaveIndicator,
} from 'react-native-indicators';


var BUTTONS = ["Clothes", "Shoes", "Bag", "Cosmetics", "Glasses", "Jewllery", "Others"];

// const webToken = AsyncStorage.getItem('webtoken')




class EditItem extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: this.props.navigation.state.params.name,
            colors: this.props.navigation.state.params.colors,
            sizes: this.props.navigation.state.params.sizes,
            tags: this.props.navigation.state.params.tags,
            location: this.props.navigation.state.params.location,
            school: this.props.navigation.state.params.school,
            price: this.props.navigation.state.params.price,
            category: this.props.navigation.state.params.category,
            negotiable: this.props.navigation.state.params.negotiable,
            postId: this.props.navigation.state.params.postId,
            loading: false,
            webToken: '',
            done: false
        };
    }

    componentDidMount() {
        AsyncStorage.multiGet(['userId', 'webtoken']).then(result => {
            this.setState({
                webToken: result[1][1],
                done: true
            })
        })

    }

    updateItem = () => {
        let { name, colors, sizes, tags, location, school, price,negotiable, category, postId, done } = this.state;
        this.setState({ loading: true })
        if (done) {
            axios.put('https://slick-project.herokuapp.com/api/editPost', {
                postId: postId,
                nameOfItem: name,
                price: price,
                hashTags: tags,
                colorAvailable: colors,
                sizeAvailable: sizes,
                location: location,
                category: category,
                negotiable:negotiable,
                school: school,

            }
                , {
                    headers: {
                        'x-auth-token': this.state.webToken
                    }
                })
                .then(async (response) => {
                    await alert(response.data)
                    this.setState({ loading: false })
                    this.props.navigation.goBack()

                })
                .catch((error) => {
                    this.setState({ loading: false })
                    alert(error.response.data)
                });
        }
    }




    render() {
        let { name, tags, location, price, category, negotiable, colors, sizes, school, loading } = this.state;

        return (
            <Container>
                <Header
                    leftComponent={<Icon name='ios-arrow-back' type='ionicon' color='white' size={hp('5')} onPress={() => { this.props.navigation.goBack() }} />}
                    centerComponent={{ text: 'Edit Item', style: { color: 'white', fontSize: wp('5') } }}
                    containerStyle={{
                        backgroundColor: '#4d88ff',
                        height: hp('12%'),
                    }}
                />
                <KeyboardAvoidingView behavior='padding' style={{ flex: 1, backgroundColor: '#6699ff', justifyContent: 'center' }}>

                    <Content style={{ padding: wp('7') }}>
                        <TextInput
                            style={styles.input}
                            placeholder='Name of Item'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            onChangeText={(name) => this.setState({ name })}
                            onSubmitEditing={() => this.priceInput.focus()}
                            maxLength={30}
                            value={name}
                        />
                        <TouchableOpacity style={styles.input}
                            onPress={() =>
                                ActionSheet.show(
                                    {
                                        options: BUTTONS,
                                        // cancelButtonIndex: 7,
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
                            value={tags}
                            onChangeText={(tags) => this.setState({ tags })}
                            ref={(input) => this.tagInput = input}
                            onSubmitEditing={() => this.colorInput.focus()}
                        />
                        {colors ? <TextInput
                            style={styles.input}
                            placeholder='Colors Available (optional)'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            value={colors}
                            onChangeText={(colors) => this.setState({ colors })}
                            ref={(input) => this.colorInput = input}
                            onSubmitEditing={() => this.sizeInput.focus()}
                        /> : null}
                        {sizes ? <TextInput
                            style={styles.input}
                            placeholder='Sizes Available (optional)'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            value={sizes}
                            onChangeText={(sizes) => this.setState({ sizes })}
                            ref={(input) => this.sizeInput = input}
                            onSubmitEditing={() => this.locationInput.focus()}
                        /> : null}
                        <TextInput
                            style={styles.input}
                            placeholder='Location'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            value={location}
                            onChangeText={(location) => this.setState({ location })}
                            ref={(input) => this.locationInput = input}
                            onSubmitEditing={() => this.schoolInput.focus()}
                        />
                        {school ? <TextInput
                            style={styles.input}
                            placeholder='School available (optional)'
                            placeholderTextColor='rgba(255,255,255,0.7)'
                            returnKeyType='next'
                            autoCorrect={false}
                            value={school}
                            onChangeText={(school) => this.setState({ school })}
                            ref={(input) => this.schoolInput = input}
                        /> : null}

                        <View style={{ paddingBottom: hp('2') }}>
                            <ToggleSwitch
                                isOn={negotiable}
                                onColor='#004de6'
                                offColor='#e8e8e8'
                                label='Negotiable'
                                labelStyle={{ color: 'rgba(255,255,255,0.7)', fontWeight: '100', fontSize: wp('4') }}
                                size='medium'
                                onToggle={(isOn) => this.setState({ negotiable: isOn })}
                            />
                        </View>
                        <TouchableOpacity disabled={!name || !price || !tags || !location || !category} style={!name || !price || !tags || !location || !category ? styles.buttonDisabled : styles.buttonEnabled} onPress={() => this.updateItem()}>
                            {!loading && <Text style={{ textAlign: 'center', color: 'white', fontWeight: '700', fontSize: wp('4') }}>Update</Text>}
                            {loading && <BarIndicator color='#fff' size={hp('4')} count={5} />}
                        </TouchableOpacity>

                    </Content>
                </KeyboardAvoidingView>
            </Container>

        );
    }
}

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
        paddingVertical: hp('2')

    },
    buttonEnabled: {
        padding: wp('7'),
        borderRadius: wp('2'),
        backgroundColor: '#4d88ff',
        paddingVertical: hp('2')
    }
})

export default (EditItem)