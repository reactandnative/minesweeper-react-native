import React from 'react';
import styles from './styles';
import HighScoresPage from './HighScoresPage';
import GamePage from './GamePage';
import { puns } from './puns';
import {
  Image,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
  Text,
  View,
  AsyncStorage,
} from 'react-native';

var MenuPage = React.createClass({
  componentDidMount() {
    this._loadInitialState().done();
  },

  getInitialState() {
    return {
      gameswon: [],
    };
  },

  async _loadInitialState() {
    try {
      var value = await AsyncStorage.getItem('gameswon');
      if (value !== null){
        this.setState({
          gameswon: JSON.parse(value)
        });
      }
    } catch (error) {
      Alert.alert('ERROR', error.message);
    }
  },

  pushGamePage(title, gameType) {
    this.props.navigator.push({
      title: title,
      component: GamePage,
      passProps: { 
        gameType: gameType,
        gameswon: this.state.gameswon,
        onWin: () => this.onWin(),
      },
    });
  },

  onWin() {
     this._loadInitialState().done();
  },

  pushHighScoresPage() {
    this.props.navigator.push({
      title: 'High Scores',
      component: HighScoresPage,
      passProps: { gameswon: this.state.gameswon },
    });
  },

  render() {
    const easyPunsDisabled = (puns['easy'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length === puns['easy'].length)
    const easyPunsCompleted = puns['easy'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length + '/' + puns['easy'].length;
    const mediumPunsDisabled = (puns['medium'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length === puns['medium'].length)
    const mediumPunsCompleted = puns['medium'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length + '/' + puns['medium'].length;
    const hardPunsDisabled = (puns['hard'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length === puns['hard'].length)
    const hardPunsCompleted = puns['hard'].filter(pun => this.state.gameswon.indexOf(pun.id) >= 0).length + '/' + puns['hard'].length;
    
    return (
      <View style={styles.menuPage.mainContainer}>
        <View></View>
        <View></View>
        <TouchableHighlight style={[styles.menuPage.menuButton, easyPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Easy Game', 'easy')} disabled={easyPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Easy Mode</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {easyPunsCompleted} completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.menuPage.menuButton, mediumPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Medium Game', 'medium')} disabled={mediumPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Medium</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {mediumPunsCompleted} completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={[styles.menuPage.menuButton, hardPunsDisabled && styles.menuPage.disabledButton]} onPress={() => this.pushGamePage('Hard Game', 'hard')} disabled={hardPunsDisabled}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>Hard Mode</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {hardPunsCompleted} completed </Text>
          </View>
        </TouchableHighlight>
        <TouchableHighlight style={styles.menuPage.menuButton} onPress={() => this.pushHighScoresPage()}>
          <View>
            <Text style={styles.menuPage.menuButtonText}>View Archive</Text>
            <Text style={styles.menuPage.menuButtonSubtext}> {this.state.gameswon.length} pun{(this.state.gameswon.length !== 1) && 's'} to read </Text>
          </View>
        </TouchableHighlight>
        <View></View>
      </View>
    );
  }
});

export default MenuPage;