import React from 'react';
import {
    View, StyleSheet
  } from 'react-native';
  import { Text, Image } from 'react-native-elements'

const CurrentActor = (props) => {
    return (
        <View style ={styles.view}>
            <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/original${props.actor.profilePath}`}} style={{ width: 200, height: 200 }} />
            <Text h3>{props.actor.actorName}</Text>
        </View>
    )
}

export default CurrentActor;

const styles = StyleSheet.create({
    image: {
        // flex: 1
        paddingTop: 0
    },
    view: {
        flexDirection: 'column',
        alignItems: 'center',
        padding: 0
    }
})
