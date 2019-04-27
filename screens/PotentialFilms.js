import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native'
import { fetchFilmCast } from '../store/reducer';

class PotentialFilms extends Component {

    render () {
        const { title, posterURL, id } = this.props
        return (
            <ScrollView>
                <Text onPress={this.props.populateFilmCast(id)}>{title}</Text>
                {/* <Image source={require(`https://image.tmdb.org/t/p/original${posterURL}`)} style={styles.backgroundImage} /> */}
            </ScrollView>
        )

    }

}

const mapDispatch = (dispatch) => (
    {
        populateFilmCast: (id) => dispatch(fetchFilmCast(id))
    }
)

export default connect(null, mapDispatch)(PotentialFilms);

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100,
        height: 100
    }
})
