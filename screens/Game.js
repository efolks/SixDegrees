import React, { Component } from 'react';
import { connect } from 'react-redux'
import ActorInput from './ActorInput'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Button
} from 'react-native';

export default class Game extends Component {

    render () {
        return (
            <View>
                <ActorInput />
            </View>
        )
    }
}
