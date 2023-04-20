import React, { Component } from "react";
import { View, Text } from "react-native";

export default class Score extends Component {
  render() {
    const { score, title } = this.props;

    return (
      <View style={styles.score_container}>
        <Text style={styles.matchText}>{title}:   
        <Text style={styles.score}> {score}</Text></Text>
      </View>
    );
  }
}

const styles = {
  score_container: {
    alignItems: "center"
  },
  matchText: {
    fontSize: 20,
    alignSelf: 'center',
    fontWeight: "bold"
  },
  score: {
    fontSize: 40,
    fontWeight: "bold"
  },
  username: {
    fontSize: 15
  }
};