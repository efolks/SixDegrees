import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native'
import { fetchActorFilmCredits } from '../store/reducer';

class PotentialActors extends Component {

    render () {
        const { name, profilePath, id } = this.props
        return (
            <ScrollView>
                <Text onPress={this.props.populateActorFilmCredits(id)}>{name}</Text>
                {/* <Image source={require(`https://image.tmdb.org/t/p/original${posterURL}`)} style={styles.backgroundImage} /> */}
            </ScrollView>
        )

    }

}

const mapDispatch = (dispatch) => (
    {
        populateActorFilmCredits: (id) => dispatch(fetchActorFilmCredits(id))
    }
)

export default connect(null, mapDispatch)(PotentialActors);

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100,
        height: 100
    }
})
