import React from 'react';
import { connect } from 'react-redux'
import { toggleIsActiveGame, fetchStartingActor} from '../store/reducer'
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button
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
    this.props.startGame()
}

  render() {
    return (
      <View style={styles.container}>
        {this.props.isWinner ? <Text>You Won! Want to play again?</Text> : <Text />}
        {this.props.isLoser ? <Text>Oh no you lost. Want to play again?</Text> : <Text />}
        {this.props.isActive ? <Game style={styles.welcomeContainer} /> :
        <Button title="Start Game" onPress={this.handlePressSubmit} />}
      </View>
    );
  }

}

const mapDispatch = (dispatch) => (
  {
    startGame: () => dispatch(toggleIsActiveGame()),
    populateStartingActor: () => dispatch(fetchStartingActor())
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
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
});
