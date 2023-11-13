import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import axios from 'axios';
import Container, { Toast } from 'toastify-react-native'

const SelectCategory = ({navigation, quizMode}) => {
  const [categories, setCategories] = useState('')
  const [showDropDown, setShowDropDown] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get(process.env.EXPO_PUBLIC_SERVER_URL + '/get-categories')
      .then((response) => {
        const categoriesData = response.data;
        setCategoryList(categoriesData);
      })
      .catch((err) => {
        Toast.error('Something went wrong!')
      });
  }, []);

  const onSubmit = () => {
    const category = categoryList.find(x => x.name === categories)
    if(category) {
      //https://reactnavigation.org/docs/params/
        navigation.navigate('View Flashcards', { categoryId: category.id, quizMode: quizMode });
    }
    else {
      Toast.error('Something went wrong! Select a category')
    }
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Container position="top" width={350}/>
      <View style={styles.formContainer}>
      <DropDown
              label={"Category"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={categories}
              setValue={setCategories}
              list={categoryList.map((category, index) => ({ label: category.name, value: category.name, key: category.id }))}
            />
        <Button style={{marginTop: 10}} mode="contained" onPress={onSubmit}>
          Review
        </Button>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
  },
  input: {
    marginBottom: 16,
  }
});

export default SelectCategory