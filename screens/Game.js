import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnswerInput from './AnswerInput'
import PotentialFilms from './PotentialFilms'
import SubmitButton from './SubmitButton'
import CurrentActor from './CurrentActor'
import CurrentFilm from './CurrentFilm'
import getStartingActor from '../store/reducer'
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
    // constructor(props){
    //     super(props)

    // }
    // componentDidMount() {
    //     console.log('Game will mount')
    //     this.props.fetchStartingActor();
    // }

    render() {
        return (
            <View>
                {/* <AnswerInput /> */}
                {this.props.isGuessingActor ? <CurrentFilm film={this.props.film} /> : <CurrentActor actor={this.props.currentActor} /> }
                <SubmitButton first={'Matt'} last={'Damon'} />
                {this.props.isGuessingActor ? this.props.filmsToSelectFrom.map(film => <PotentialFilms title={film.title} posterURL={film.posterURL} key={film.id} />)
                : <Text>ActorList</Text> }
            </View>
        )
    }
    
}

console.log('rendered?')

const mapState = (state) => (
    {
        filmsToSelectFrom: state.creditsToSelectFrom,
        isGuessingActor: state.isGuessingActor,
        currentActor: state.currentActor,
        currentFilm: state.currentFilm
    }
)

const mapDispatch = (dispatch) => (
    {
        fetchStartingActor: () => dispatch(getStartingActor())
    }
)

export default connect(mapState, mapDispatch)(Game)
