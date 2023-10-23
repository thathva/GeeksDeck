import { StyleSheet, ImageBackground } from "react-native"
import SelectCategory from './SelectCategory';

const Quiz = ({navigation}) => {
  return (
    <ImageBackground
    source={require('../assets/background.png')}
    style={styles.container}
    resizeMode="cover"
  >
      <SelectCategory navigation={navigation} quizMode={true}/>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
})

export default Quiz