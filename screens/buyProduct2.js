import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-native'
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import { UserContext } from "../Contexts/UserContext";
import * as Location from 'expo-location';

export default function BuyProduct2 ({navigation}) {

  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [quantity, setQuantity] = useState('');

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const createConfirmAlert = () =>
    Alert.alert(
        "Confirmar la compra",
        "¿Desea confirmar el pedido?",
        [
        {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        { text: "OK", onPress: () => {
            console.log("OK Pressed")
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: parseInt(quantity), latitude: location.coords.latitude, longitude: location.coords.longitude })
                };
                fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client/${user.clientId}/seller/${sellerId}/product/${productId}/order`, requestOptions)
                    .then(response => response.json())
                    .then(data => {
                        console.log(data, 'data');
                    });
        }}
        ],
        { cancelable: false }
    );


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
            setQuantity(values.quantity);
            createConfirmAlert();
            navigation.navigate('AllProducts');
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
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
})