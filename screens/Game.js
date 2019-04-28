import React, { Component } from 'react'
import { connect } from 'react-redux'
import AnswerInput from './AnswerInput'
import PotentialFilms from './PotentialFilms'
import PotentialActors from './PotentialActors'
import SubmitButton from './SubmitButton'
import CurrentActor from './CurrentActor'
import CurrentFilm from './CurrentFilm'
import { fetchStartingActorCredits } from '../store/reducer'
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

    componentDidMount(){
        this.props.populateStartingActorCredits(this.props.currentActor)
    }

    render() {
        return (
            <View>
                {/* <AnswerInput /> */}
                {this.props.isGuessingActor ? <CurrentFilm film={this.props.currentFilm} /> : <CurrentActor actor={this.props.currentActor} /> }
                {/* <SubmitButton first="Matt" last="Damon" /> */}
                {this.props.isGuessingActor ? this.props.castToSelectFrom.map(actor => <PotentialActors name={actor.name} profilePath={actor.profilePath} key={actor.id} id={actor.id} />) : this.props.filmsToSelectFrom.map(film => <PotentialFilms title={film.title} posterURL={film.posterURL} key={film.id} id={film.id} />)}
            </View>
        )
    }
    
}

const mapState = (state) => (
    {
        filmsToSelectFrom: state.creditsToSelectFrom,
        castToSelectFrom: state.castToSelectFrom,
        isGuessingActor: state.isGuessingActor,
        currentActor: state.currentActor,
        currentFilm: state.currentFilm
    }
)

const mapDispatch = (dispatch) => (
    {
        populateStartingActorCredits: (actor) => dispatch(fetchStartingActorCredits(actor))
    }
)

export default connect(mapState, mapDispatch)(Game)
