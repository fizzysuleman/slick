import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Slider,AsyncStorage } from 'react-native';
import Modal from "react-native-modal";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import axios from 'react-native-axios'
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

// const webToken = AsyncStorage.getItem('webtoken')
// const userId = AsyncStorage.getItem('userId')


export default class RatingModal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value:null,
            previouslyRated:this.props.previouslyRated,
            previousRating:this.props.previousRating,
            newRating:this.props.previousRating,
            newlyRated:false,
            loading:false,
            userId:'',
            webToken:'',
            done:false
        };
    }

    static getDerivedStateFromProps(props,state){
        if(props.previousRating !== state.previousRating){
            return{
                previousRating:props.previousRating,
                newRating:props.previousRating,
                previouslyRated:props.previouslyRated
            }    
        }
        return null
    }

    componentDidMount() {
        AsyncStorage.multiGet(['userId','webtoken']).then(result => {
          this.setState({
              userId:result[0][1],
              webToken:result[1][1],
              done:true
          })
      })
    
      }

    onValueChange=(value)=>{
        this.setState({
            newRating:value,
            newlyRated:true
        })
    }

    closeModal=()=>{
        this.props.closeModal()
        this.setState({
            newlyRated:false
        })
    }
    
    submitRating = async () => {
        this.setState({loading:true})
        if(this.state.done){
        axios.post('https://slick-project.herokuapp.com/api/ratingPost', {
                userId:this.state.userId,
                sellerId:this.props.sellerId,
               rating:this.state.newRating 
              }
              ,{
                headers:{
                  'x-auth-token':this.state.webToken
                }
              }
              )
              .then(async(response)=> {
                  await this.setState({loading:false})
                  await this.props.closeSubmitModal()
                  
                  this.setState({
                    newlyRated:false
                })        
              })
              .catch((error)=> {
                  this.setState({loading:false})
                alert(error.response.data);
              });
            }
    }

   

    render() {
        let {loading}=this.state
        return (
            <View >
                <Modal isVisible={this.props.modalVisible}>
                    <View style={styles.modalContent}>
                        <View style={{ alignItems: 'center' }}>
                            <Slider
                                style={{ width: 200, height: 40 }}
                                minimumValue={0}
                                maximumValue={5}
                                step={1}
                                value={this.state.previousRating}
                                onValueChange={value => this.onValueChange(value)}
                                minimumTrackTintColor="#1EB1FC"
                                maximumTrackTintColor="#000000"
                            />
                        </View>
                        {(!this.state.previouslyRated&&!this.state.newlyRated)?<Text>You have not rated this brand before</Text>:null}
                        {(this.state.previouslyRated&&!this.state.newlyRated)?<Text style={{padding:wp('1')}}>You rated this brand {this.state.previousRating}/5 </Text>:null}
                        {(this.state.newlyRated)?<Text style={{padding:wp('1')}}>You are rating this brand {this.state.newRating}/5 </Text>:null}

                        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                            <TouchableOpacity  style={{padding:wp('1')}} onPress={()=>this.submitRating()}>
                                {!loading&&<Text style={{backgroundColor:'#26C281',padding:wp('2'),borderRadius:wp('2'),color:'white'}}>Submit</Text>}
                                {loading && <UIActivityIndicator color='black' size={hp('2')}  />}
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=>this.closeModal()} style={{padding:wp('1')}}><Text style={{backgroundColor:'#C3272B',padding:wp('2'),borderRadius:wp('2'),color:'white'}}>Close</Text></TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    modalContent: {
        backgroundColor: 'white',
        padding: 22,
        justifyContent: 'center',
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
    },

});