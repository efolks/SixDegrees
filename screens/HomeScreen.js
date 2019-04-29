import React from 'react';
import { connect } from 'react-redux'
import { toggleIsActiveGame, fetchStartingActor, resetGame } from '../store/reducer'
import { Button, Text } from 'react-native-elements'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated
} from 'react-native';
import { WebBrowser } from 'expo';
import { MonoText } from '../components/StyledText';
import Game from './Game'

class HomeScreen extends React.Component {
  constructor(){
    super()
    this.handlePressSubmit = this.handlePressSubmit.bind(this);
  }

  componentDidMount() {
    this.props.populateStartingActor()
  }

  handlePressSubmit(){
    this.props.reset()
    this.props.startGame()

}

  render() {
    return (
    <Animated.ScrollView >
      <View style={styles.container} >
        {this.props.isWinner ? <Text>You Won! Want to play again?</Text> : <Text />}
        {this.props.isLoser ? <Text>Oh no you lost. Want to play again?</Text> : <Text />}
        {this.props.isActive ? <Game style={styles.container} /> :
        <View style={styles.container}>
          <Text h2>Connect Your Way</Text>
          <Text h2>To Kevin Bacon!</Text>
          <Text h2>In Six Degrees!</Text>
          <Button title="Start Game" onPress={this.handlePressSubmit} raised={true} />
        </View>}
      </View>
    </Animated.ScrollView>
    );
  }

}

const mapDispatch = (dispatch) => (
  {
    startGame: () => dispatch(toggleIsActiveGame()),
    populateStartingActor: () => dispatch(fetchStartingActor()),
    reset: () => dispatch(resetGame())
  }
)

const mapState = (state) => (
  {
    isActive: state.isActiveGame,
    isWinner: state.isWinner,
    isLoser: state.isLoser
  }
)
        
export default connect(mapState, mapDispatch)(HomeScreen)
         
//////////////////////////////////////////////////

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    alignItems: 'center'

  },
  button: {
    // flexDirection: 'row',
    // justifyContent: 'center'
  }
});
