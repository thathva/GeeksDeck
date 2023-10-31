import React, { useState } from 'react';
import { StyleSheet, View, ImageBackground } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios'
import Container, { Toast } from 'toastify-react-native'

const CreateCategory = ({navigation}) => {
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')

  const nameHandler = (newName) => {
    setName(newName)
  }

  const descriptionHandler = (newDesc) => {
    setDescription(newDesc)
  }

  const onSubmit = () => {
    const data = {
      'name': name,
      'description': description
    }
    const headers = { 
      'Content-Type': 'application/json'
    }
    axios.post('http://10.0.0.47:5000/create-category', data, headers).then((response) => {
      Toast.success('Category created successfully!')
      navigation.navigate('Home')
    }).catch((err) => {
      Toast.error('Something went wrong!')
    })
  }

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Container position="top"  width={300}/>
      <View style={styles.formContainer}>
        <TextInput label="Name" style={styles.input} value={name} onChangeText={nameHandler} />
        <TextInput label="Description" style={styles.input} value={description} onChangeText={descriptionHandler} />
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

export default CreateCategory