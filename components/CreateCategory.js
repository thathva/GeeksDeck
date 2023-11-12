import React, { useEffect, useState } from 'react';
import { StyleSheet, View, ImageBackground, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import axios from 'axios';
import Container, { Toast } from 'toastify-react-native';

const CreateCategory = ({ navigation }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [nameError, setNameError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');

  const nameHandler = (newName) => {
    setName(newName);
    setNameError('');
  };

  const descriptionHandler = (newDesc) => {
    setDescription(newDesc);
    setDescriptionError('');
  };


  const onSubmit = () => {
    let isValid = true;
    if (name.trim() === '') {
      setNameError('Name is required');
      isValid = false;
    }
    if (description.trim() === '') {
      setDescriptionError('Description is required');
      isValid = false;
    }

    if (isValid) {
      const data = {
        name: name,
        description: description,
      };
      const headers = {
        'Content-Type': 'application/json',
      };

      axios
        .post(process.env.EXPO_PUBLIC_SERVER_URL + '/create-category', data, headers)
        .then((response) => {
          Toast.success('Created category!')
          setTimeout(() => {
            navigation.navigate('Home');
          }, 2600);
        })
        .catch((err) => {
          Toast.error('Something went wrong!');
        });
    }
  };
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  React.useEffect(() => {
    setIsButtonDisabled(nameError !== '' || descriptionError !== '');
  }, [nameError, descriptionError]);

  return (
    <ImageBackground
      source={require('../assets/background.png')}
      style={styles.container}
      resizeMode="cover"
    >
      <Container position="top" width={300} />
      <View style={styles.formContainer}>
        <TextInput
          label="Name"
          style={styles.input}
          mode='outlined' 
          value={name}
          onChangeText={nameHandler}
          error={nameError !== ''}
        />
        {nameError !== '' && (
          <Text style={styles.errorText}>{nameError}</Text>
        )}
        <TextInput
          label="Description"
          style={styles.input}
          mode='outlined' 
          value={description}
          onChangeText={descriptionHandler}
          error={descriptionError !== ''}
        />
        {descriptionError !== '' && (
          <Text style={styles.errorText}>{descriptionError}</Text>
        )}
        <Button
          mode="contained"
          onPress={onSubmit}
          disabled={isButtonDisabled}
        >
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
  },
  errorText: {
    color: 'red',
    marginBottom: 8,
  },
});

export default CreateCategory;
