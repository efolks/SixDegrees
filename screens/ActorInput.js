import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActorCredits } from '../store/reducer';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';

class ActorInput extends Component {
    constructor(){
        super()
        this.state = {
            actorFirstName: '',
            actorLastName: ''
        }
    }

    handlePressSubmit(){
        this.displayActorCredits(this.state.actorFirstName, this.state.actorLastName)
    }

    render () {
        return (
            <View>
                <TextInput editable={true} onChangeText={(text) => this.setState({actorFirstName: text})} value={this.state.actorFirstName} />
                <TextInput editable={true} onChangeText={(text) => this.setState({actorLastName: text})} value={this.state.actorLastName} />
                <Button title="Submit" onPress={this.handlePressSubmit} />
            </View>
        )
    }
}
            
const mapDispatch = (dispatch) => (
    {
        displayActorCredits: (actorFirstName, actorLastName) => dispatch(fetchActorCredits(actorFirstName, actorLastName))
    }
)

export default connect(null, mapDispatch)(ActorInput)
