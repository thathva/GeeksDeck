import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, Image } from 'react-native';
import axios from 'axios';
import { Button } from 'react-native-paper';

const ViewFlashcard = ({ navigation, route }) => {
  const [flashcards, setFlashcards] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isFlipped, setIsFlipped] = useState(false);
  const [score, setScore] = useState(0)
  const [correct, setCorrect] = useState(0)
  const [incorrect, setIncorrect] = useState(0)
  const { categoryId, quizMode } = route.params;
  
  useEffect(() => {
    axios.get('http://10.0.0.47:5000/view-flashcards?id=' + categoryId).then((response) => {
      setFlashcards(response.data);
      setScore(response.data.length)
      setLoading(false);
    }).catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    if (!loading && correct + incorrect === flashcards.length) {
      navigation.navigate('Final Scores', {
        totalScore: score,  
        correct,
        incorrect
      });
    }
  }, [correct, incorrect]);

  const renderNextFlashcard = () => {
    if(quizMode) {
      if ((index) >= flashcards.length - 1) {
          navigation.navigate('Final Scores', {totalScore: score, correct: correct, incorrect: incorrect})
        } else {
        setIndex(index + 1);
      }
    }
    else {
      if ((index + 1) > flashcards.length - 1) {
        setIndex(0);
      } else {
        setIndex(index + 1);
      }
    }

    setIsFlipped(false);
  };

  const renderPrevFlashcard = () => {
    if ((index - 1) < 0) {
      setIndex(flashcards.length - 1);
    } else {
      setIndex(index - 1);
    }
    setIsFlipped(false);
  };

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  const correctHandler = () => {
    setCorrect(correct + 1)
    renderNextFlashcard()
  }

  const incorrectHandler = () => {
    setIncorrect(incorrect + 1)
    renderNextFlashcard()
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <View style={styles.container}>
          <View style={styles.buttonParent}>
            <Button
              icon="chevron-left-circle-outline"
              onPress={renderPrevFlashcard}
              labelStyle={styles.buttonLabel}
              style={styles.button}
            ></Button>
          </View>
          <View style={styles.formContainer}>
          <Text>{quizMode}</Text>
            <TouchableOpacity style={styles.card} onPress={flipCard}>
              <Text style={styles.cardText}>
                {isFlipped ? flashcards[index].definition : flashcards[index].term}
              </Text>
              {flashcards[index].image && (
                <Image
                  source={{ uri: flashcards[index].image }}
                  style={{ width: 70, height: 70 }}
                />
              )}
            </TouchableOpacity >
          </View>
          <View style={styles.buttonParent}>
            <Button
              icon="chevron-right-circle-outline"
              onPress={renderNextFlashcard}
              labelStyle={styles.buttonLabel}
              style={styles.button}
            ></Button>
          </View>
          {quizMode ? (
          <View>
            <Button mode='contained' onPress={incorrectHandler}>Incorrect</Button>
            <Button mode='contained' onPress={correctHandler}>Correct</Button>
          </View>
          ) : "" }
        </View>
      )}
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  formContainer: {
    width: '67%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  card: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    fontSize: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  buttonParent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 10,
  },
  button: {
    padding: 20,
  },
  buttonLabel: {
    fontSize: 32,
  },
});

export default ViewFlashcard;
