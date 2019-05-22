import React, {Component} from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Image } from 'react-native-elements';
import { fetchActorFilmCredits, toggleGameState, updateCurrentActor } from '../store/reducer';

class PotentialActors extends Component {
    constructor(){
        super()
        this.handleOnPress = this.handleOnPress.bind(this);
    }

    handleOnPress() {
        console.log('PROPS ID:', this.props.id)
        this.props.populateActorFilmCredits(this.props.id)
        this.props.updateActor(
            {name: this.props.name,
            profilePath: this.props.profilePath}
            )
    }

    render () {
        const { name, profilePath } = this.props
        return (
            <View style={styles.container}>
                <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/original${profilePath}`}} style={{ width: 200, height: 200 }} />
                <TouchableOpacity style={styles.button}>
                    <Text onPress={this.handleOnPress}>{name}</Text>
                </TouchableOpacity>
            </View>
        )

    }

}

const mapDispatch = (dispatch) => (
    {
        populateActorFilmCredits: (id) => dispatch(fetchActorFilmCredits(id)),
        updateActor: (currentActorProps) => dispatch(updateCurrentActor(currentActorProps)),
        toggleGameState: () => dispatch(toggleGameState())
    }
)

export default connect(null, mapDispatch)(PotentialActors);

const styles = StyleSheet.create({
    backgroundImage: {
        width: 100,
        height: 100
    },
    container: {
        flexDirection: 'column',
        alignItems: 'center'
    },
    image: {
        flex: 1,
        width: null,
        height: null,
        resizeMode: 'contain'
    },
    button: {
        height: 50,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

