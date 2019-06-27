import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Image } from 'react-native-elements'
import { fetchFilmCast, toggleGameState, updateCurrentFilm } from '../store/reducer';


class PotentialFilms extends Component {
    constructor(){
        super()
        this.handleOnPress = this.handleOnPress.bind(this)
    }

    handleOnPress() {
        this.props.populateFilmCast(this.props.id, this.props.targetActor.actorName)
        this.props.updateFilm(
            {
                filmName: this.props.title,
                posterURL: this.props.posterURL
            }
        )
    }

    render () {
        const { title, posterURL } = this.props
        return (
            <View style={styles.container}>
                <Image source={{uri: `https://image.tmdb.org/t/p/original${posterURL}`}} style={styles.image} onPress={this.handleOnPress} />
                <TouchableOpacity style={styles.button} onPress={this.handleOnPress} >
                    {title.split(' ').map(word => <Text key={Math.random()}>{word} </Text>)}
                </TouchableOpacity>
            </View>
        )

    }

}

const mapDispatch = (dispatch) => (
    {
        populateFilmCast: (id, actorName) => dispatch(fetchFilmCast(id, actorName)),
        updateFilm: (filmProps) => dispatch(updateCurrentFilm(filmProps)),
        toggleGameState: () => dispatch(toggleGameState)
    }
)

const mapState = (state) => (
    {
        targetActor: state.targetActor
    }
)

export default connect(mapState, mapDispatch)(PotentialFilms);

const styles = StyleSheet.create({
    container: {
     flexDirection: 'column',
     alignItems: 'center',
     height: 175

    },
    image: {
        width: 125,
        height: 125,
        alignSelf: 'stretch',
        resizeMode: 'contain'
    },
    button: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: 100,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
