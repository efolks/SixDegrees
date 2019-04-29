import React, { Component } from 'react'
import { connect } from 'react-redux'
import PotentialFilms from './PotentialFilms'
import PotentialActors from './PotentialActors'
import CurrentActor from './CurrentActor'
import CurrentFilm from './CurrentFilm'
import { fetchStartingActorCredits } from '../store/reducer'
import { Text, Badge } from 'react-native-elements'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
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
            <View style={styles.outerContainer}>
                {this.props.count <= 3 ? <Badge value={this.props.count} status="success" containerStyle={{ position: 'absolute', top: -10, right: 0 }}/> : <Badge value={this.props.count} status="warning" />}
                    {this.props.isGuessingActor ? <CurrentFilm film={this.props.currentFilm} /> : <CurrentActor actor={this.props.currentActor} /> }
                <View style={styles.container}>
                    {this.props.isGuessingActor ? this.props.castToSelectFrom.map(actor => <PotentialActors name={actor.name} profilePath={actor.profilePath} key={actor.id} id={actor.id} />) : this.props.filmsToSelectFrom.map(film => <PotentialFilms title={film.title} posterURL={film.posterURL} key={film.id} id={film.id} />)}
                </View>
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
        currentFilm: state.currentFilm,
        count: state.answerCount
    }
)

const mapDispatch = (dispatch) => (
    {
        populateStartingActorCredits: (actor) => dispatch(fetchStartingActorCredits(actor))
    }
)

export default connect(mapState, mapDispatch)(Game)

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap'
  
    },
    outerContainer: {
        flexDirection: 'column',
        alignItems: 'center'
    }
  });
