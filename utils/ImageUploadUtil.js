import React, { useState } from 'react';
import { View, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const ImageUploadUtil = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
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
    return (
      <View>
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={{ width: 70, height: 70 }}
          />
        )}
        <Button title="Upload Image" onPress={pickImage} />
      </View>
    );
  };
  
export default ImageUploadUtil;
