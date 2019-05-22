import React from 'react';
import {
    View, StyleSheet
  } from 'react-native';
  import { Text, Image } from 'react-native-elements'

const CurrentActor = (props) => {
    return (
        <View>
            <Image style={styles.image} source={{uri: `https://image.tmdb.org/t/p/original${props.film.posterURL}`}} style={{ width: 200, height: 200 }} />
            <Text h3>{props.film.filmName}</Text>
        </View>
    )
}

export default CurrentActor;

const styles = StyleSheet.create({
    image: {
        flex: 1
    }
})
