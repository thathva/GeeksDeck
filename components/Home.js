import { StyleSheet, View, ImageBackground } from 'react-native';
import { Text } from 'react-native-paper';
import { Button } from 'react-native-paper';


export default function Home({ navigation }) {
    return (
      <ImageBackground source={require('../assets/background.png')} style={styles.container} resizeMode="cover">
        <Text variant="headlineLarge" style={styles.text}>Welcome to GeekDecks!</Text>
        <View style={styles.spacer} />
        <Button mode="contained-tonal" style={styles.button} onPress={() => navigation.navigate('Create Categories')}>
          Create Category
        </Button>
        <Button mode="contained-tonal" style={styles.button} onPress={() => navigation.navigate('Create Flashcards')}>
          Create Flashcards
        </Button>
        <Button mode="contained-tonal" style={styles.button} onPress={() => navigation.navigate('Select Category', { quizMode: false })}>
          View Flashcards
        </Button>
        <Button mode="contained-tonal" style={styles.button} onPress={() => navigation.navigate('Quiz')}>
          Quiz
        </Button>
      </ImageBackground>
    );
  }


const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
    text: {
      marginVertical: 50,
    },
    spacer: {
      height: 20,
    },
    button: {
      alignItems: 'center',
      marginTop: 10,
      justifyContent: 'center',
      width: '50%',
      backgroundColor: '#FEAC5E'
    }
  });