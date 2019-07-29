import React, { Component } from 'react'
import { connect } from 'react-redux'
import PotentialFilms from './PotentialFilms'
import PotentialActors from './PotentialActors'
import CurrentActor from './CurrentActor'
import CurrentFilm from './CurrentFilm'
import { fetchStartingActorCredits } from '../store/reducer'
import { Badge } from 'react-native-elements'
import { Content, Container, Header, Text } from 'native-base'
import {
  StyleSheet,
  View
} from 'react-native';

class Game extends Component {

    componentDidMount(){
        this.props.populateStartingActorCredits(this.props.currentActor.actorName)
    }

    render() {
        return (
        <Container style={styles.container}>
            <Header style={styles.header}>
                <View style={styles.currentActorOrFilmContainer}>                 
                    {this.props.isGuessingActor ? 
                    <CurrentFilm film={this.props.currentFilm} /> : 
                    <CurrentActor actor={{...this.props.currentActor}} />}
                </View>
            </Header>
            <Content style={styles.content}>
                {this.props.count <= 3 ? 
                <Badge value={this.props.count} status="success" containerStyle={{ position: 'absolute', top: 10, right: 10 }}/> : 
                <Badge value={this.props.count} status="warning" />}
                <View style={styles.outerContainer}>
                    <View  style={styles.filmsOrActorsToSelectContainer}>
                        {this.props.isGuessingActor ? 
                            this.props.castToSelectFrom.map(actor => <PotentialActors name={actor.name} profilePath={actor.profilePath} key={Math.random()} id={actor.id} />) : 
                            this.props.filmsToSelectFrom.map(film => <PotentialFilms title={film.title} posterURL={film.posterURL} key={Math.random()} id={film.id} />)}
                    </View>
                </View>
            </Content>
        </Container>
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
    filmsOrActorsToSelectContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      flex: 1,
      backgroundColor: '#5941A9' 
    },
    outerContainer: {
        flexDirection: 'column',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#5941A9'   
    },
    scrollContainer: {
        flex: 1
    },
    header: {
        height: 260,
        backgroundColor: '#5941A9',
        borderBottomColor: '#FFCA3A',
        borderBottomWidth: 5
    },
    currentActorOrFilmContainer: {
        backgroundColor: '#5941A9' 
    },
    content: {
        backgroundColor: '#5941A9'
    }
  });
