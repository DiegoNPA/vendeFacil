import React, { useState, useEffect, useContext } from 'react'
import { View, Text, StyleSheet, Modal, TextInput, ScrollView, Alert, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../shared/card';
import { UserContext } from "../Contexts/UserContext";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';

export default function SellerInfo({ navigation }) {

    const {user} = useContext(UserContext);

    const [modalOpen, setOpenModal] = useState(false);

    const url = `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}`
    const [seller, setSeller] = useState({});
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
        setSeller(json);
        })
        .catch((e) => {
        console.log(e);
        })
  //   useEffect(() => {
  // }, []);

  const createDeleteAlert = () =>
    Alert.alert(
      "¿Desea eliminar su cuenta?",
      "Esta accion es irreversible!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          console.log("OK Pressed")
          const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          };
          fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}`, requestOptions)
          .then(response => response.json())
          .then(data => {
            console.log(data, 'data');
          })
          .catch((err) => {
            console.log(err);
          });
          BackHandler.exitApp();
        }}
      ],
      { cancelable: false }
    );

    const schema = yup.object({

      sellerName: yup.string()
        .required('El valor es requerido!')
        .min(4, 'El valor debe ser mayor a 4 caracteres'),
      phone: yup.string()
        .required('El valor es requerido!')
        .min(8, 'El valor debe ser igual a 8 caracteres')
        .max(8, 'El valor debe ser igual a 8 caracteres')
        .test('is num', 'El valor ingresado debe ser un numero de telefono', (val) => {
          return parseInt(val) > 59999999 && parseInt(val) < 80000000; 
        }),
      description: yup.string()
        .required('El valor es requerido!')
        .min(15, 'El valor debe ser mayor a 15 caracteres')
        .max(100, 'El valor no puede exceder los 100 caracteres'),
      category: yup.string()
        .required('El valor es requerido!')
        .min(5, 'El valor minimo de caracteres debe ser de 5')
    })
    
    return (

      <ScrollView>

        <View>

        <Modal visible={modalOpen} animationType='slide'>
              <View style={styles.modalContent}>
                  <MaterialIcons 
                      name='close'
                      size={24}
                      style={{...styles.modalToggle, ...styles.modalClose}}
                      onPress={() => setOpenModal(false)}
                  />
                  <Formik 
                    initialValues={{sellerName: `${user.sellerName}`, description: `${user.description}`, phone: `${user.phone}`, category: `${user.category}` }}
                    validationSchema={schema}
                    onSubmit = {(values) => {
                        setOpenModal(false);
                        const requestOptions = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ sellerName: values.sellerName, description: values.description, phone: values.phone, category: values.category })
                            };
                            fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}`, requestOptions)
                                .then(response => response.json())
                                .then(data => {
                                    console.log(data, 'data');
                                })
                                .catch((err) => {
                                  console.log(err);
                                })
                    }}
                  >
                      {props => (
                          <View>
                            
                            <Text style={styles.text}>Nombre de su empresa:</Text>
                            <TextInput
                              style={styles.input}
                              placeholder='Nombre del cliente'
                              onChangeText={props.handleChange('sellerName')}
                              onBlur={props.handleBlur('sellerName')}
                              value={props.values.sellerName}
                            />
                            <Text style={styles.errorText}>{props.touched.sellerName && props.errors.sellerName}</Text>

                            <Text style={styles.text}>Descripcion de su empresa:</Text>
                            <TextInput
                              style={styles.input}
                              placeholder='Apellido'
                              onChangeText={props.handleChange('description')}
                              onBlur={props.handleBlur('description')}
                              value={props.values.description}
                            />
                            <Text style={styles.errorText}>{props.touched.description && props.errors.description}</Text>

                            <Text style={styles.text}>Numero telefonico:</Text>
                            <TextInput
                              style={styles.input}
                              placeholder='Numero telefonico'
                              onChangeText={props.handleChange('phone')}
                              onBlur={props.handleBlur('phone')}
                              value={props.values.phone}
                            />
                            <Text style={styles.errorText}>{props.touched.phone && props.errors.phone}</Text>

                            <Text style={styles.text}>Categoria de su empresa:</Text>
                            <TextInput
                              style={styles.input}
                              placeholder='Sexo'
                              onChangeText={props.handleChange('category')}
                              onBlur={props.handleBlur('category')}
                              value={props.values.category}
                            />
                            <Text style={styles.errorText}>{props.touched.category && props.errors.category}</Text>

                            <FlatButton onPress={props.handleSubmit} text='Guardar los cambios' />
                          
                          </View>
                      )}
                  </Formik>
              </View>
          </Modal>

          <Card>
            <Ionicons name="md-person" size={30} color="black" />
            <Text style={styles.title}>{seller.sellerName}</Text>
            <Text>Descripcion: {seller.description}</Text>
            <Text>Categoria: {seller.category}</Text>
            <Text>Telefono: {seller.phone}</Text>
          </Card>

          <View style={{ alignItems: 'center'}}>
            <AntDesign 
              name="edit" 
              size={30} 
              color="black" 
              style={{...styles.modalToggle, ...styles.modalClose}}
              onPress={() => setOpenModal(true)}
            />

            <AntDesign 
              name="deleteuser" 
              size={30} 
              style={{margin: 10}}
              color="red" 
              onPress={() => createDeleteAlert()}
            />
          </View>

        </View>

      </ScrollView>

    )

}

const styles = StyleSheet.create({
    list: {
        flex: 1
    },
    title: {
      fontWeight: 'bold',
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
    text: {
      fontWeight: 'bold',
      marginLeft: 20
    }
})