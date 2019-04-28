import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Image, Text, ScrollView, StyleSheet } from 'react-native'
import { fetchActorFilmCredits, toggleGameState, updateCurrentActor } from '../store/reducer';

class PotentialActors extends Component {
    constructor(){
        super()
        this.handleOnPress = this.handleOnPress.bind(this);
    }

    handleOnPress() {
        console.log('PROPS ID:', this.props.id)
        this.props.populateActorFilmCredits(this.props.id)
        this.props.updateActor(this.props.name)
    }

    render () {
        const { name, profilePath, id } = this.props
        return (
            <ScrollView>
                <Text onPress={this.handleOnPress}>{name}</Text>
                {/* <Image source={require(`https://image.tmdb.org/t/p/original${posterURL}`)} style={styles.backgroundImage} /> */}
            </ScrollView>
        )

    }

}

const mapDispatch = (dispatch) => (
    {
        populateActorFilmCredits: (id) => dispatch(fetchActorFilmCredits(id)),
        updateActor: (actorName) => dispatch(updateCurrentActor(actorName)),
        toggleGameState: () => dispatch(toggleGameState())
    }
)

export default connect(null, mapDispatch)(PotentialActors);

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100,
        height: 100
    }
})
