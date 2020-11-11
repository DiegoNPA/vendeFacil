import React, { useContext, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, TextInput, TouchableOpacity, Modal } from 'react-native'
import ProductItem from '../Components/productItem'
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import { UserContext } from "../Contexts/UserContext";

export default function BuyProduct ({navigation}) {

  const {user} = useContext(UserContext);

  const productId = navigation.getParam('productId');
  const sellerId = navigation.getParam('sellerId');

  const schema = yup.object({
      quantity: yup.string()
          .required('Este valor es requerido!')
          .test('isNumber', 'El valor debe ser un numero', (val) => {
              return parseInt(val) > 0;
          })
  })

  return (

    
    <Formik 
        initialValues={{quantity: ''}}
        validationSchema={schema}
        onSubmit = {(values) => {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: values.quantity })
                };
                fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client/${user.clientId}/seller/${sellerId}/product/${productId}/order`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data, 'data');
                    });
        }}
    >
        {props => (
            <View>
                <TextInput
                    style={styles.input}
                    placeholder='Cantidad que desea comprar'
                    onChangeText={props.handleChange('quantity')}
                    onBlur={props.handleBlur('quantity')}
                    keyboardType='numeric'
                    value={props.values.quantity}
                />
                <Text style={styles.errorText}>{props.touched.quantity && props.errors.quantity}</Text>

                <FlatButton onPress={props.handleSubmit} text='Realizar la compra'/>
            
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
  }
})