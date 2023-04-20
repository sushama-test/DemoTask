import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default class Card extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <TouchableOpacity
        style={[styles.cardStyle,{backgroundColor: this.props.is_open === true ? 'transparent' : 'orange'}]}
        onPress={
            this.props.clickCard}
         onAccessibilityTap={true}
        >
          <Text style={[styles.card_text,{color: this.props.is_open === true ? this.props.color : 'orange'}]}>{this.props.name}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    flex:1,
    justifyContent: 'space-between',
    alignItems: "center",
  },
  cardStyle: {
    height: 70, 
    width: '90%', 
    justifyContent: 'center', 
  },
  card_text: {
    fontSize: 25, 
    fontWeight: 'bold', 
    alignSelf: 'center'
  }
});