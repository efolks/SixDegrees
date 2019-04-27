import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchActorCredits, toggleGameState, getStartingActor } from '../store/reducer';
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
        this.props.fetchActorCredits(this.props.first, this.props.last);
        this.props.toggleGameState();
        this.props.fetchStartingActor();
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
        toggleGameState: () => dispatch(toggleGameState()),
        fetchStartingActor: () => dispatch(getStartingActor())
    }
)

export default connect(null, mapDispatch)(SubmitButton)
