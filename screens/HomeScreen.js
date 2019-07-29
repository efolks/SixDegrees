import React from 'react';
import { connect } from 'react-redux'
import { toggleIsActiveGame, fetchStartingAndTargetActor, resetGame } from '../store/reducer'
import {
  StyleSheet,
  View
} from 'react-native';
import { Container, Header, Content, Footer, Button, Text} from 'native-base'
import Game from './Game'

class HomeScreen extends React.Component {
  constructor(){
    super()
    this.handlePressSubmit = this.handlePressSubmit.bind(this);
  }

  componentDidMount() {
    this.props.populateStartingActorAndTargetActor()
  }

  handlePressSubmit(){
    this.props.reset()
    this.props.startGame()

}

  render() {
    return (
    <Container style={styles.container}>
      <Header style={styles.headerAndFooter} />
      <Content>
          {this.props.isWinner ? <Text>You Won! Want to play again?</Text> : <Text />}
          {this.props.isLoser ? <Text>Oh no you lost. Want to play again?</Text> : <Text />}
          {this.props.isActive ? <Game style={styles.container} /> :
          <View style={styles.landingPageContainer}>
            <Text h2 style={styles.landingPageTitle}>Welcome to Six Degrees</Text>
            <Text style={styles.gameDescription}>The game where all that hardwork of watching summer movies on TBS finally pays off. Given a star, you must connect them to another star via their film credits in less than six degrees. Can you do it?</Text>
            <Button rounded onPress={this.handlePressSubmit} raised={true} style={styles.newChallengeButton}><Text style={styles.newChallengeButtonText}>New Challenge</Text></Button>
          </View>
          }
      </Content>
      <Footer style={styles.headerAndFooter} />
    </Container>
    );
  }

}

const mapDispatch = (dispatch) => (
  {
    startGame: () => dispatch(toggleIsActiveGame()),
    populateStartingActorAndTargetActor: () => dispatch(fetchStartingAndTargetActor()),
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
    backgroundColor: '#5941A9',
    flexDirection: 'column',
    // alignItems: 'center'

  }, 
  landingPageContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '75%',
    height: 640
  },
  landingPageTitle: {
    paddingBottom: '10%',
    fontSize: 75,
    textAlign: 'center',
    color: '#FFCA3A',
    fontFamily: 'Marker Felt'
  },
  gameDescription: {
    paddingBottom: '10%',
    color: '#FFCA3A',
    fontFamily: 'Marker Felt',
    fontSize: 25,
    textAlign: 'center'
  },
  newChallengeButton: {
    backgroundColor: '#FFCA3A'
  },
  newChallengeButtonText: {
    color: '#5941A9',
    fontSize: 25
  },
  headerAndFooter: {
    backgroundColor: '#E8B835'
  }
});
