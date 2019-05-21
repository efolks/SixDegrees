import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import {Image, Button } from 'react-native-elements'
import { fetchFilmCast, toggleGameState, updateCurrentFilm } from '../store/reducer';


class PotentialFilms extends Component {
    constructor(){
        super()
        this.handleOnPress = this.handleOnPress.bind(this)
    }

    handleOnPress() {
        this.props.populateFilmCast(this.props.id)
        this.props.updateFilm(this.props.title)
    }

    render () {
        const { title, posterURL, id } = this.props
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
        populateFilmCast: (id) => dispatch(fetchFilmCast(id)),
        updateFilm: (filmName) => dispatch(updateCurrentFilm(filmName)),
        toggleGameState: () => dispatch(toggleGameState)
    }
)

export default connect(null, mapDispatch)(PotentialFilms);

const styles = StyleSheet.create({
    container: {
     flexDirection: 'column',
     alignItems: 'center',
     height: 175

    },
    image: {
        // flex: 1,
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
