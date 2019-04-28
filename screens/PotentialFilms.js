import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native';
import { fetchFilmCast, toggleGameState, updateCurrentFilm } from '../store/reducer';

class PotentialFilms extends Component {
    constructor(){
        super()
        this.handleOnPress = this.handleOnPress.bind(this)
    }

    handleOnPress() {
        this.props.populateFilmCast(this.props.id)
        this.props.updateFilm(this.props.title)
        // this.props.toggleGameState()
    }

    render () {
        const { title, posterURL, id } = this.props
        return (
            <ScrollView>
                <Text onPress={this.handleOnPress}>{title}</Text>
                {/* <Image source={require(`https://image.tmdb.org/t/p/original${posterURL}`)} style={styles.backgroundImage} /> */}
            </ScrollView>
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
    backgroundImage: {
        width: 100,
        height: 100
    }
})
