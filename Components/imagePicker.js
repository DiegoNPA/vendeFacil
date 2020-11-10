import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';

export default function ImagePickerExample({image, setImage}) {

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);

      console.log(result);

      const file = {
        uri: result.uri,
        name: 'images'+ new Date().valueOf().toString(),
        type: 'image/jpeg'
      }

      console.log(file);

      const config = {
        keyPrefix: 's3/',
        bucket: 'myphotosserverlessapp',
        region: 'us-east-1',
        accessKey: 'AKIAYAUP6UVNE4D7GHFN',
        secretKey: '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',
        successActionStatus: 201
      }

      RNS3.put(file, config)
        .then( (res) => {
          console.log(res);
        } )

    }
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
}