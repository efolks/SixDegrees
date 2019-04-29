import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
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
                {/* <Button title={title} onPress={this.handleOnPress} raised={true} /> */}
                <View>
                {this.props.title.length > 10 ?
                <View>
                <Text onPress={this.handleOnPress}>{this.props.title.slice(0, Math.floor(this.props.title.length / 2))}</Text>
                <Text onPress={this.handleOnPress}>{this.props.title.slice(Math.floor(this.props.title.length / 2), this.props.title.length - 1)}</Text>
                </View> :
                <Text onPress={this.handleOnPress}>{this.props.title}</Text>
                }
                </View>
                {/* <Text onPress={this.handleOnPress}>{title}</Text> */}
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
        
    }
})
