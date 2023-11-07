import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Container, { Toast } from 'toastify-react-native';

const CreateFlashcard = ({ navigation }) => {
  const [term, setTerm] = useState('');
  const [definition, setDefinition] = useState('');
  const [categories, setCategories] = useState('');
  const [showDropDown, setShowDropDown] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const [termError, setTermError] = useState('');
  const [definitionError, setDefinitionError] = useState('');

  useEffect(() => {
    axios.get('http://10.0.0.47:5000/get-categories')
      .then((response) => {
        const categoriesData = response.data;
        setCategoryList(categoriesData);
      })
      .catch((err) => {
        Toast.error('Something went wrong!');
      });
  }, []);

  const termHandler = (newTerm) => {
    setTerm(newTerm);
    setTermError('');
  }

  const definitionHandler = (newDef) => {
    setDefinition(newDef);
    setDefinitionError('');
  }

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (!result.canceled) {
      const localUri = result.assets[0].uri;
      const filename = localUri.split('/').pop();
      const newUri = FileSystem.documentDirectory + filename;

      try {
        await FileSystem.copyAsync({
          from: localUri,
          to: newUri,
        });
        setSelectedImage(newUri);
      } catch (error) {
        console.error('Error saving image: ', error);
      }
    }
  }

  const onSubmit = () => {
    let isValid = true;

    if (categories.trim() === '') {
      Toast.error('Please select a category');
      isValid = false;
    }

    if (term.trim() === '') {
      setTermError('Term is required');
      isValid = false;
    }

    if (definition.trim() === '') {
      setDefinitionError('Definition is required');
      isValid = false;
    }

    if (isValid) {
      const category = categoryList.find(x => x.name === categories);
      if (category) {
        const data = {
          categoryId: category.id,
          term: term,
          definition: definition,
          image: selectedImage
        }
        axios.post('http://10.0.0.47:5000/create-flashcard', data)
          .then((response) => {
            Toast.success("Created flashcard!");
            navigation.navigate('Home');
          })
          .catch((err) => {
            Toast.error('Something went wrong!');
          });
      } else {
        Toast.error("Something went wrong");
      }
    }
  }
  const isButtonDisabled = termError !== '' || definitionError !== '' || categories.trim() === '';

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Container position="top" width={300} />
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
        {categories.trim() === '' && <Text style={styles.errorText}>Please select a category</Text>}
        <TextInput mode='outlined' label="Term" value={term} onChangeText={termHandler} style={styles.input} />
        {termError !== '' && <Text style={styles.errorText}>{termError}</Text>}
        <TextInput mode='outlined' label="Definition" value={definition} onChangeText={definitionHandler} style={styles.input} />
        {definitionError !== '' && <Text style={styles.errorText}>{definitionError}</Text>}
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 70, height: 70, marginLeft: '35%', marginTop: 10 }}
          />
        )}
        <Button mode="contained" style={{ marginBottom: 10, marginTop: 10 }} onPress={pickImage}>Upload Image</Button>
        <Button mode="contained" onPress={onSubmit} disabled={isButtonDisabled}>Create</Button>
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
    marginTop: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default CreateFlashcard;
