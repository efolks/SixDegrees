import React from 'react';
import {
    Text,
    View
  } from 'react-native';

const CurrentActor = (props) => {
    return (
        <View>
            <Text>{props.actor}</Text>
        </View>
    )
}

export default CurrentActor;
