import React, { useContext, useState, useEffect } from 'react'
import { View, Text, StyleSheet, Modal, TextInput, ScrollView, Alert, BackHandler } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../shared/card'
import { UserContext } from "../Contexts/UserContext";
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';

export default function ClientInfo({ navigation }) {

    const {user} = useContext(UserContext);

    const [modalOpen, setOpenModal] = useState(false);

    const url = `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client/${user.clientId}`
    const [client, setClient] = useState({});
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
        setClient(json);
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
          fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client/${user.clientId}`, requestOptions)
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

    clientName: yup.string()
      .required('El valor es requerido!')
      .min(4, 'El valor debe ser mayor a 4 caracteres'),
    lastName: yup.string()
      .required('El valor es requerido!')
      .min(4, 'El valor debe ser mayor a 4 caracteres'),
    phone: yup.string()
      .required('El valor es requerido!')
      .min(8, 'El valor debe ser igual a 8 caracteres')
      .max(8, 'El valor debe ser igual a 8 caracteres')
      .test('is num', 'El valor ingresado debe ser un numero de telefono', (val) => {
        return parseInt(val) > 59999999 && parseInt(val) < 80000000; 
      }),
    gender: yup.string()
      .required('El valor es requerido!')
      .test('is gender', 'Solo puede ingresar valores M o F', (val) => {
        return val === 'M' || val === 'F'
      })
  })

    const vend = "Vendedor";
    const cli = "Cliente";
    const male = "Masculino";
    const female = "Femenino";
    let message;
    let message2;

    if (user.gender === 'M') {
      message = male;
    } else {
      message = female;
    }

    if (user.type === "client"){
      message2 = cli;
    } else {
      message2 = vend;
    }
    
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
                    initialValues={{clientName: `${user.clientName}`, lastName: `${user.lastName}`, phone: `${user.phone}`, gender: `${user.gender}` }}
                    validationSchema={schema}
                    onSubmit = {(values) => {
                        setOpenModal(false);
                        const requestOptions = {
                            method: 'PUT',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ clientName: values.clientName, lastName: values.lastName, phone: values.phone, gender: values.gender })
                            };
                            fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client/${user.clientId}`, requestOptions)
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
                            
                            <Text style={styles.text}>Nombre:</Text>
                            <TextInput
                              style={styles.input}
                              placeholder='Nombre del cliente'
                              onChangeText={props.handleChange('clientName')}
                              onBlur={props.handleBlur('clientName')}
                              value={props.values.clientName}
                            />
                            <Text style={styles.errorText}>{props.touched.clientName && props.errors.clientName}</Text>

                            <Text style={styles.text}>Apellido:</Text>
                            <TextInput
                              style={styles.input}
                              placeholder='Apellido'
                              onChangeText={props.handleChange('lastName')}
                              onBlur={props.handleBlur('lastName')}
                              value={props.values.lastName}
                            />
                            <Text style={styles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>

                            <Text style={styles.text}>Numero telefonico:</Text>
                            <TextInput
                              style={styles.input}
                              placeholder='Numero telefonico'
                              onChangeText={props.handleChange('phone')}
                              onBlur={props.handleBlur('phone')}
                              value={props.values.phone}
                            />
                            <Text style={styles.errorText}>{props.touched.phone && props.errors.phone}</Text>

                            <Text style={styles.text}>Sexo:</Text>
                            <TextInput
                              style={styles.input}
                              placeholder='Sexo'
                              onChangeText={props.handleChange('gender')}
                              onBlur={props.handleBlur('gender')}
                              value={props.values.gender}
                            />
                            <Text style={styles.errorText}>{props.touched.gender && props.errors.gender}</Text>

                            <FlatButton onPress={props.handleSubmit} text='Guardar los cambios' />
                          
                          </View>
                      )}
                  </Formik>
              </View>
          </Modal>

          <Card>
            <Ionicons name="md-person" size={30} color="black" />
            <Text style={styles.title}>{user.clientName}</Text>
            <Text>{user.lastName}</Text>
            <Text>Tipo: {message2}</Text>
            <Text>Telefono: {user.phone}</Text>
            <Text>Sexo: {message}</Text>
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