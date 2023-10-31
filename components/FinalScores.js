import React from 'react';
import { View, Text, ImageBackground, StyleSheet, Image, Button } from 'react-native';

const FinalScores = ({ navigation, route }) => {
  const { totalScore, correct, incorrect } = route.params;
  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.scoreContainer}>
        <Text style={styles.title}>Final Scores</Text>
        <View style={styles.scoreItem}>
          <Text style={styles.label}>Total Cards: </Text>
          <Text style={styles.value}>{totalScore}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.label}>Total Correct: </Text>
          <Text style={styles.value}>{correct}</Text>
        </View>
        <View style={styles.scoreItem}>
          <Text style={styles.label}>Total Incorrect: </Text>
          <Text style={styles.value}>{incorrect}</Text>
        </View>
        <Image source={require('../assets/giphy.gif')} style={styles.gif} />
      </View>
      <Button title='Return to Home' mode="contained" onPress={() => navigation.navigate('Home')}></Button>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scoreContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scoreItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  label: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
  },
  gif: {
    width: 200,
    height: 100,
    marginTop: 20
  },
});

export default FinalScores;
