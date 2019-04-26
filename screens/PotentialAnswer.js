import React from 'react';
import { View, Image, Text } from 'react-native'

const PotentialAnswer = (props) => {
    
    const { title, posterURL } = props

    return (
        <View>
            <Text>{title}</Text>
            {/* <Image source={{uri: 'https://image.tmdb.org/t/p/original' + posterURL}} /> */}
        </View>
    )
}

export default PotentialAnswer;
