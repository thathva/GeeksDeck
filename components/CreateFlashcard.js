import React, { useState, useEffect } from 'react';
import { StyleSheet, View, ImageBackground, Image } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import axios from 'axios';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const CreateFlashcard = ({navigation}) => {
  const [term, setTerm] = useState('')
  const [definition, setDefinition] = useState('')
  const [categories, setCategories] = useState('')
  const [showDropDown, setShowDropDown] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    axios.get('http://10.0.0.47:5000/get-categories')
      .then((response) => {
        const categoriesData = response.data;
        setCategoryList(categoriesData);
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

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
    });

    if (result.canceled) {
      return;
    }

    if (result.assets[0].uri) {
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
  };

  const onSubmit = () => {
    const category = categoryList.find(x => x.name === categories)
    if(category) {
      const data = {
        'categoryId': category.id,
        'term': term,
        'definition': definition,
        'image': selectedImage
      }
      axios.post('http://10.0.0.47:5000/create-flashcard', data).then((response) => {
        console.log(response)
      }).catch((err) => {
        console.error(err)
      })
    }
    else {
      console.log("Something went wrong")
    }
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
              list={categoryList.map((category, index) => ({ label: category.name, value: category.name, key: category.id }))}
            />
        <TextInput label="Term" value={term} onChangeText={termHandler} style={styles.input} />
        <TextInput label="Definition" value={definition} onChangeText={definitionHandler} style={styles.input} />
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 70, height: 70 }}
          />
        )}
        <Button mode="contained" onPress={pickImage}>Upload Image</Button>
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