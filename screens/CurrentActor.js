import React from 'react';
import {
    View, StyleSheet
  } from 'react-native';
  import { Text, Image } from 'react-native-elements'

const CurrentActor = (props) => {
    return (
        <View style ={styles.view}>
            <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/original${props.actor.profilePath}`}} />
            <Text style={styles.actorName} h3>{props.actor.actorName}</Text>
        </View>
    )
}

export default CurrentActor;

const styles = StyleSheet.create({
    image: {
        borderRadius: 25,
        width: 200,
        height: 200
    },
    actorName: {
        textAlign: 'center',
        color: '#FFCA3A'
    }
})
