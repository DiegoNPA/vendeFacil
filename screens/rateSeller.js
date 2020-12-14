import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-native'
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import { UserContext } from "../Contexts/UserContext";

export default function RateSeller ({navigation}) {

  const sellerId = navigation.getParam('sellerId');

  const schema = yup.object({
      rating: yup.string()
          .required('Este valor es requerido!')
          .test('isNumber', 'El valor debe ser un numero entre 1 y 5', (val) => {
              return parseInt(val) > 0 && parseInt(val) <= 5;
          })
  })

  return (

    <Formik 
        initialValues={{rating: ''}}
        validationSchema={schema}
        onSubmit = {(values) => {
            const requestOptions = {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    rating: values.rating,
                }),
                };
                fetch(
                    `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/rateSeller/${sellerId}`,
                    requestOptions
                )
                .then((response) => response.json())
                .then((data) => {
                    console.log(data, "data");
                })
                .catch((err) => {
                    console.log(err);
                });
            navigation.navigate('Sellers');
        }}
    >
        {props => (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Calificacion(1-5)'
                    onChangeText={props.handleChange('rating')}
                    onBlur={props.handleBlur('rating')}
                    keyboardType='numeric'
                    value={props.values.rating}
                />
                <Text style={styles.errorText}>{props.touched.rating && props.errors.rating}</Text>
                
                <FlatButton onPress={props.handleSubmit} text='Evaluar'/>
            
            </View>
        )}
    </Formik>

  )

}

const styles = StyleSheet.create({
  list: {
      flex: 1
  },
  title: {
      padding: 16,
      marginTop: 16,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
      justifyContent: 'center',
      alignContent: 'center',
      fontWeight: 'bold',
      textAlign: 'center'
  },
  item: {
      padding: 16,
      marginTop: 16,
      borderColor: '#bbb',
      borderWidth: 1,
      borderStyle: 'dashed',
      borderRadius: 10,
  },
  modalToggle: {
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      borderWidth: 1,
      borderColor: '#f2f2f2',
      padding: 10,
      borderRadius: 10,
      alignSelf: 'center',
  },
  modalClose: {
      marginTop: 20,
      marginBottom: 0,
  },
  modalContent: {
      flex: 1,
  },
  input: {
      marginTop: 40,
      borderWidth: 1,
      borderColor: 'coral',
      padding: 10,
      fontSize: 18,
      borderRadius: 6,
      width: "85%",
      alignSelf: 'center'
  },
  errorText: {
      color: 'crimson',
      fontWeight: 'bold',
      textAlign: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})