import { Provider as PaperProvider, Button } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './components/Home';
import CreateCategory from './components/CreateCategory'
import CreateFlashcard from './components/CreateFlashcard'
import ViewFlashcard from './components/ViewFlashcard'
import Quiz from './components/Quiz'
import SelectCategory from './components/SelectCategory';
import FinalScores from './components/FinalScores';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <PaperProvider>
        <SafeAreaProvider>
          <Stack.Navigator>
          <Stack.Screen name="Home" options={{
              headerShown: false
            }} component={Home} />
            <Stack.Screen name="Create Categories" component={CreateCategory} />
            <Stack.Screen name="Create Flashcards" component={CreateFlashcard} />
            <Stack.Screen name="Select Category" component={SelectCategory} />
            <Stack.Screen name="View Flashcards" component={ViewFlashcard}/>
            <Stack.Screen name="Quiz" component={Quiz}/>
            <Stack.Screen name="Final Scores" component={FinalScores} options={{
            headerShown: false
          }}/>
          </Stack.Navigator>
        </SafeAreaProvider>
      </PaperProvider>
    </NavigationContainer>
  );
}