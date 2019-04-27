import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActorCredits, toggleGameState } from '../store/reducer';
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

  class SubmitButton extends Component {
    constructor(){
        super()
        this.handlePressSubmit = this.handlePressSubmit.bind(this);
    }

    handlePressSubmit(){
        this.props.fetchActorCredits(this.state.actorFirstName, this.state.actorLastName);
        this.props.toggleGameState();
    }


    render () {
        return (
            <View>
                <Button title="Submit" onPress={this.handlePressSubmit} />
            </View>
        )
    }
}
            
const mapDispatch = (dispatch) => (
    {
        fetchActorCredits: (actorFirstName, actorLastName) => dispatch(fetchActorCredits(actorFirstName, actorLastName)),
        toggleGameState: () => dispatch(toggleGameState())
    }
)

export default connect(null, mapDispatch)(SubmitButton)