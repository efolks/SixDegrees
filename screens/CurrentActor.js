import React from 'react';
import {
    View
  } from 'react-native';
  import { Text } from 'react-native-elements'

const CurrentActor = (props) => {
    return (
        <View>
            <Text h3>{props.actor}</Text>
        </View>
    )
}

export default CurrentActor;
