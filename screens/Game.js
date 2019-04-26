import React, { Component } from 'react';
import { connect } from 'react-redux'
import ActorInput from './ActorInput'
import PotentialAnswer from './PotentialAnswer'
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

class Game extends Component {

    render () {
        return (
            <View>
                <ActorInput />
                {this.props.filmsToSelectFrom.map(film => <PotentialAnswer title={film.title} posterURL={film.posterURL} key={film.id} />
                )}
            </View>
        )
    }
}

const mapState = (state) => (
    {
        filmsToSelectFrom: state.creditsToSelectFrom
    }
)

export default connect(mapState, null)(Game)
