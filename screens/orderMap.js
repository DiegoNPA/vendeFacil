import React, { useContext, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal, Dimensions, SafeAreaView } from 'react-native'
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import { UserContext } from "../Contexts/UserContext";
import * as Location from 'expo-location';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
const height = Dimensions.get('window').height

export default function OrderMap({navigation}){

  const lat = navigation.getParam('latitude')
  const long = navigation.getParam('longitude')

  return (
    <SafeAreaView forceInset={{ top: 'always' }}>
      <View styles={styles.container}>
        <MapView 
          style={styles.map}
          loadingEnabled={true}
          region={{
            latitude: navigation.getParam('latitude'),
            longitude: navigation.getParam('longitude'),
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121
          }}
        >

          <MapView.Marker
            coordinate = {{latitude: lat, longitude: long}}
            title='Ubicacion del pedido'
          />

        </MapView>
      </View>
    </SafeAreaView>
  )


}

const styles = StyleSheet.create({
  map: {
    height
  }
})


