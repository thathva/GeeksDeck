import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import axios from 'axios';

const CreateFlashcard = ({navigation}) => {
  const [term, setTerm] = useState('')
  const [definition, setDefinition] = useState('')
  const [categories, setCategories] = useState([])
  const [showDropDown, setShowDropDown] = useState(false);
  const [categoryList, setCategoryList] = useState([]);

  useEffect(() => {
    axios.get('http://10.0.0.47:5000/get-categories')
      .then((response) => {
        const categoriesData = response.data;
        const categoryNames = categoriesData.map(category => category.name);
        setCategoryList(categoryNames);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const termHandler = (newTerm) => {
    setTerm(newTerm)
  }

  const definitionHandler = (newDef) => {
    setDefinition(newDef)
  }

  const onSubmit = () => {
    const data = {
      'term': term,
      'definition': definition
    }
    axios.post('http://10.0.0.47:5000/create-flashcard', data).then((response) => {
      console.log(response)
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <View style={styles.formContainer}>
      <DropDown
              label={"Category"}
              mode={"outlined"}
              visible={showDropDown}
              showDropDown={() => setShowDropDown(true)}
              onDismiss={() => setShowDropDown(false)}
              value={categories}
              setValue={setCategories}
              list={categoryList.map((category, index) => ({ label: category, value: category, key: `category_${index}` }))}
            />
        <TextInput label="Term" value={term} onChangeText={termHandler} style={styles.input} />
        <TextInput label="Definition" value={definition} onChangeText={definitionHandler} style={styles.input} />
        <Button mode="contained" onPress={onSubmit}>
          Create
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

export default CreateFlashcard