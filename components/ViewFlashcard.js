import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Text, TouchableOpacity, Image, ActivityIndicator, Animated, Easing } from 'react-native';
import axios from 'axios';
import Container, { Toast } from 'toastify-react-native'
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
    if(quizMode) {
      navigation.setOptions({
        title: 'Quiz Mode',
      });
    }
    axios.get(process.env.EXPO_PUBLIC_SERVER_URL + '/view-flashcards?id=' + categoryId).then((response) => {
      if (response.data.length == 0) {
        Toast.error('Add some flashcards!')
        setTimeout(() => {
          navigation.navigate('Home')
        }, 2600);
        return
      }

      setFlashcards(response.data);
      setScore(response.data.length)

      setLoading(false);
    }).catch(err => {
      Toast.error('Something went wrong!')
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
    if (quizMode) {
      if ((index) >= flashcards.length - 1) {
        navigation.navigate('Final Scores', { totalScore: score, correct: correct, incorrect: incorrect })
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

  const [flipAnimation] = useState(new Animated.Value(0));

  //https://reactnative.dev/docs/animations#animated-api
  const startFlipAnimation = () => {
    Animated.timing(flipAnimation, {
      toValue: 180,
      duration: 500,
      easing: Easing.linear,
      useNativeDriver: true,
    }).start(() => {
      setIsFlipped(!isFlipped);
      flipAnimation.setValue(0);
    });
  };

  const flipCard = () => {
    startFlipAnimation();
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
      <Container position="top" width={300} />
      {loading ? (
        <ActivityIndicator size={100} />
      ) : (
        <View style={!quizMode ? styles.container : styles.quizContainer}>
          {!quizMode ?
            <View style={styles.buttonParent}>
              <Button
                icon="chevron-left-circle-outline"
                onPress={renderPrevFlashcard}
                labelStyle={styles.buttonLabel}
                style={styles.button}
              ></Button>
            </View> : ""}
          <View style={styles.formContainer}>
            <Text>{quizMode}</Text>
            <TouchableOpacity
              style={styles.cardContainer}
              activeOpacity={1}
              onPress={flipCard}
            >
              {/* https://reactnative.dev/docs/animations#animated-api */}
              <Animated.View
                style={[
                  styles.card,
                  {
                    transform: [
                      {
                        rotateY: flipAnimation.interpolate({
                          inputRange: [0, 180],
                          outputRange: ['0deg', '180deg'],
                        }),
                      },
                    ],
                  },
                ]}
              >
                <Text style={styles.cardText}>
                  {isFlipped ? flashcards[index].definition : flashcards[index].term}
                </Text>
                {flashcards[index].image && (
                  <Image
                    source={{ uri: flashcards[index].image }}
                    style={{ width: 70, height: 70 }}
                  />
                )}
              </Animated.View>
            </TouchableOpacity>
          </View>
          {!quizMode ?
            <View style={styles.buttonParent}>
              <Button
                icon="chevron-right-circle-outline"
                onPress={renderNextFlashcard}
                labelStyle={styles.buttonLabel}
                style={styles.button}
              ></Button>
            </View> : ""}
          {quizMode ? (
            <View style={styles.buttonContainer}>
              <Button mode='contained' style={styles.incorrectButton} onPress={incorrectHandler}>Incorrect</Button>
              <Button mode='contained' style={styles.correctButton} onPress={correctHandler}>Correct</Button>
            </View>
          ) : ""}
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
  quizContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
  formContainer: {
    width: '67%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  correctButton: {
    flex: 1,
    marginLeft: 20
  },
  incorrectButton: {
    flex: 1,
  },
  cardContainer: {
    height: '50%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backfaceVisibility: 'hidden',
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    position: 'absolute',
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
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    margin: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  button: {
    padding: 20,
  },
  buttonLabel: {
    fontSize: 32,
  },
});

export default ViewFlashcard;
