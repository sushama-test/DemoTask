import React, { Component } from "react";
import { View, Text, TouchableOpacity, FlatList } from "react-native";

import Score from "./components/Score";
import Card from "./components/Card";

import shuffleArray from "./helpers/shuffleArray";

import cards_data from "./data/data";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current_selection: [],
      selected_pairs: [],
      score: 0,
      turns: 0,
      opponent_score: 0
    };
    let letters = {
      A: 'A',
      B: 'B',
      C: 'C',
      D: 'D',
      E: 'E',
      F: 'F',
      G: 'G',
      H: 'H'
    };

    let clone = JSON.parse(JSON.stringify(cards_data));
    this.cards = cards_data.concat(clone);
    this.cards.map(obj => {
      let id = Math.random()
        .toString(36)
        .substring(7);
      obj.id = id;
      obj.name = letters[obj.name];
      obj.is_open = false;
    });

    this.cards = shuffleArray(this.cards);
  }

  componentDidMount() {

    this.setState({
      cards: this.cards
    });
  }

  renderCard = ({ item }) => {
    return (
      <Card
        key={item.id}
        name={item.name}
        color={item.color}
        is_open={item.is_open}
        clickCard={this.clickCard.bind(this, item.id)}
      />
    );
  };

  clickCard = id => {
    let selected_pairs = [...this.state.selected_pairs];
    let current_selection = this.state.current_selection;
    let score = this.state.score;
    let turns = this.state.turns;

    let index = this.state.cards.findIndex(card => {
      return card.id == id;
    });

    let cards = [...this.state.cards];

    if (
      cards[index].is_open == false
    ) {
      cards[index].is_open = true;

      current_selection.push({
        index: index,
        name: cards[index].name
      });

      if (current_selection.length == 2) {
        if (current_selection[0].name == current_selection[1].name) {
          score += 1;
          selected_pairs.push(cards[index].name);
          this.setState({
            turns: turns+1
          });
        } else {
          cards[current_selection[0].index].is_open = false;

          setTimeout(() => {
            cards[index].is_open = false;
            this.setState({
              cards: cards,
              turns: turns+1
            });
          }, 500);
        }

        current_selection = [];
      }

      this.setState({
        score: score,
        cards: cards,
        current_selection: current_selection
      });
    }
  };

  resetCards = () => {
    let cards = this.cards.map(obj => {
      obj.is_open = false;
      return obj;
    });

    cards = shuffleArray(cards);

    this.setState({
      current_selection: [],
      selected_pairs: [],
      cards: cards,
      score: 0,
      turns: 0,
      opponent_score: 0
    });
  };

  render() {
    let contents = this.state.cards;

    return (
      <View style={styles.container}>
        <View style={styles.bottomContent}>
          <Score score={this.state.score} title={'Matches'}/>
          <Score score={this.state.turns} title={'Turns'}/>
          </View>
        <View style={styles.body}>
          <FlatList
            data={contents}
            renderItem={this.renderCard}
            numColumns={4}
            keyExtractor={item => item.id}
            columnWrapperStyle={styles.flatlistRow}
          />
        </View>
        <View style={styles.bottomContent}>
          <TouchableOpacity style={styles.refreshButton}>
            <Text style={styles.restartText} onPress={() => {this.resetCards()}}>Restart</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
  },
  body: {
    marginTop: 10
  },
  bottomContent: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: '100%',
    marginTop: '10%'
  },
  flatlistRow: {
    flex: 1,
    padding: 10
  },
  refreshButton: {
    alignSelf: 'center', 
    justifyContent: 'center', 
    padding: '2%'
  },
  restartText: {
    color: 'black', 
    fontSize: 18, 
    alignSelf: 'center', 
    fontWeight: 'bold'
  }
};