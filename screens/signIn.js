import React, { useState } from "react";
import { CognitoUserPool } from "amazon-cognito-identity-js";
import { CognitoUser, AuthenticationDetails } from 'amazon-cognito-identity-js';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from "react-native";
import { useContext } from "react/cjs/react.development";
import { UserContext } from "../Contexts/UserContext";
import HeaderSignIn from '../shared/headerSignIn';
import { Formik } from 'formik';
import * as yup from 'yup';
import { ScrollView } from "react-native-gesture-handler";
import FlatButton from '../shared/button'

const schemaLogin = yup.object({
  userName: yup.string()
    .required('El valor es requerido!'),
  password: yup.string()
    .required('El valor es requerido!')
    .min(6, 'El valor debe ser mayor a 6 caracteres')
})

const schemaSignUpClient = yup.object({
  userName: yup.string()
    .required('El valor es requerido!'),
  password: yup.string()
    .required('El valor es requerido!')
    .min(6, 'El valor debe ser mayor a 6 caracteres'),
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

const schemaSignUpSeller = yup.object({
  
  userName: yup.string()
    .required('El valor es requerido!'),
  password: yup.string()
    .required('El valor es requerido!')
    .min(6, 'El valor debe ser mayor a 6 caracteres'),
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
})

export default function SignIn() {
  const {setUser} = useContext(UserContext);
  const [isSignIn, setIsSignIn] = useState(true);
  const [isSeller, setIsSeller] = useState(false);

  const poolData = {
    UserPoolId: "us-east-1_oOKW7yssq",
    ClientId: "arhleavsr2lstjb5tsbhn689q",
  };

  const onSeller = () => {
    setIsSeller(true);

  }

  const onClient = () => {
    setIsSeller(false);
  }

  const createPasswordAlert = () =>
    Alert.alert(
      "Nombre de usuario o contraseña incorrecta",
      "Por favor intente nuevamente",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => console.log("OK Pressed") }
      ],
      { cancelable: false }
    );

  const onSubmitClient = (userName, password, name, phone, lastName, gender) => {
    UserPool.signUp(userName, password, [], null, (err, data) => {
      console.log("SignUp complete", err, data);
      console.log(data.userSub, 'userSub');
      if(err){
        console.log(err);
      }
      else{
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({clientName: name, lastName: lastName, gender: gender, phone: phone, cognitoId: data.userSub })
          };
          fetch('https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client', requestOptions)
              .then(response => response.json())
              .then(data1 => {
                  const user = {
                      clientName: name,
                      lastName,
                      gender,
                      phone,
                      cognitoId: data.userSub,
                      type: 'client'
                  }
                  setUser(user)
                  console.log(user, 'globaluser');
              });
          }
    });
  }

  const onSubmitSeller = (userName, password, name, phone, description, category) => {
    UserPool.signUp(userName, password, [], null, (err, data) => {
      console.log("SignUp complete", err, data);
      if(err){
        console.log(err);
      }
      else{
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({sellerName: name, description: description, category: category, phone: phone, cognitoId: data.userSub, imageUrl: " " })
          };
          fetch('https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller', requestOptions)
              .then(response => response.json())
              .then(data1 => {
                  const user = {
                      userName: userName,
                      sellerName: name,
                      phone: phone,
                      description: description,
                      category: category,
                      type: 'seller',
                      imageUrl: " "
                  }
                  setUser(user);
              });
          }
    });
  }

  const onLogin = (userName, password) => {

    const user = new CognitoUser({
      Username: userName,
      Pool: UserPool
    })

    const authDetails = new AuthenticationDetails({
      Username: userName,
      Password: password
    })

    user.authenticateUser(authDetails, {
      onSuccess: data => {
        console.log('onSuccess', data);
        const cogId = data.accessToken.payload.sub;
        fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/user/${cogId}`)
          .then((response) => response.json())
          .then((json) => {
            const user1 = {
              userName: userName,
              clientName: json.clientName,
              lastName: json.lastName,
              sellerId: json.sellerId,
              gender: json.gender,
              phone: json.phone,
              clientId: json.clientId,
              type: json.type,
              sellerName: json.sellerName,
              description: json.description,
              category: json.category,
              imageUrl: json.imageUrl
            }
            setUser(user1);
            console.log(user1);
          })
          .catch((e) => {
          console.log(e);
          })
        
      },
      onFailure: err => {
        createPasswordAlert();
        console.error('onFailure', err);
      },
      newPasswordRequired: data => {
        console.log('newPasswordRequired', data);
      }
    })
  }

  const UserPool = new CognitoUserPool(poolData);

  if (isSignIn){
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View>
        <HeaderSignIn/>
        
        <Formik
          initialValues = {{userName: '', password: ''}}
          validationSchema={schemaLogin}
          onSubmit = {(values) => {
            onLogin(values.userName, values.password);
          }}
        >
          {props => (
            <View>
              <TextInput
                style={styles.input}
                placeholder='Nombre de usuario'
                onChangeText={props.handleChange('userName')}
                onBlur={props.handleBlur('userName')}
                value={props.values.userName}
              />
              <Text style={styles.errorText}>{props.touched.userName && props.errors.userName}</Text>

              <TextInput
                secureTextEntry={true}
                style={styles.input}
                placeholder='Contraseña'
                onChangeText={props.handleChange('password')}
                onBlur={props.handleBlur('password')}
                value={props.values.password}
              />
              <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

              <FlatButton onPress={props.handleSubmit} text='Iniciar sesion' />
              <FlatButton onPress={() => setIsSignIn(false)} text='Registrarse' />
              
            </View>
          )}
        </Formik>
      </View>
      </TouchableWithoutFeedback>
    )
  }else{
    if(isSeller){
      return(
      <ScrollView>
        <View>
          <HeaderSignIn/>
          <FlatButton onPress={onSeller} text='Vendedor' />
          <FlatButton onPress={onClient} text='Comprador' />
          <Formik
            initialValues = {{userName: '', password: '', sellerName: '', phone: '', description: '', category: ''}}
            validationSchema={schemaSignUpSeller}
            onSubmit = {(values) => {
            onSubmitSeller(values.userName, values.password, values.sellerName, values.phone, values.description, values.category);
          }}
          >
            {props => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder='Nombre de usuario'
                  onChangeText={props.handleChange('userName')}
                  onBlur={props.handleBlur('userName')}
                  value={props.values.userName}
                />
                <Text style={styles.errorText}>{props.touched.userName && props.errors.userName}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Contraseña'
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
                <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Nombre de la empresa'
                  onChangeText={props.handleChange('sellerName')}
                  onBlur={props.handleBlur('sellerName')}
                  value={props.values.sellerName}
                />
                <Text style={styles.errorText}>{props.touched.sellerName && props.errors.sellerName}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Numero telefonico'
                  onChangeText={props.handleChange('phone')}
                  onBlur={props.handleBlur('phone')}
                  value={props.values.phone}
                />
                <Text style={styles.errorText}>{props.touched.phone && props.errors.phone}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Descripcion del vendedor'
                  onChangeText={props.handleChange('description')}
                  onBlur={props.handleBlur('description')}
                  value={props.values.description}
                />
                <Text style={styles.errorText}>{props.touched.description && props.errors.description}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Categoria del vendedor'
                  onChangeText={props.handleChange('category')}
                  onBlur={props.handleBlur('category')}
                  value={props.values.category}
                />
                <Text style={styles.errorText}>{props.touched.category && props.errors.category}</Text>

                <FlatButton onPress={props.handleSubmit} text='Registrarse' />
                <FlatButton onPress={() => setIsSignIn(true)} text='Iniciar sesion' />

              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      )
    }else{
      return(
        <ScrollView>
          <View>
          <HeaderSignIn/>
          <FlatButton onPress={onSeller} text='Vendedor' />
          <FlatButton onPress={onClient} text='Comprador' />
          <Formik
            initialValues = {{userName: '', password: '', clientName: '', phone: '', lastName: '', gender: ''}}
            validationSchema={schemaSignUpClient}
            onSubmit = {(values) => {
              onSubmitClient(values.userName, values.password, values.clientName, values.phone, values.lastName, values.gender);
            }}
          >
            {props => (
              <View>
                <TextInput
                  style={styles.input}
                  placeholder='UserName'
                  onChangeText={props.handleChange('userName')}
                  onBlur={props.handleBlur('userName')}
                  value={props.values.userName}
                />
                <Text style={styles.errorText}>{props.touched.userName && props.errors.userName}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Contraseña'
                  onChangeText={props.handleChange('password')}
                  onBlur={props.handleBlur('password')}
                  value={props.values.password}
                />
                <Text style={styles.errorText}>{props.touched.password && props.errors.password}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Nombre del cliente'
                  onChangeText={props.handleChange('clientName')}
                  onBlur={props.handleBlur('clientName')}
                  value={props.values.clientName}
                />
                <Text style={styles.errorText}>{props.touched.clientName && props.errors.clientName}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Apellido'
                  onChangeText={props.handleChange('lastName')}
                  onBlur={props.handleBlur('lastName')}
                  value={props.values.lastName}
                />
                <Text style={styles.errorText}>{props.touched.lastName && props.errors.lastName}</Text>

                <TextInput
                  style={styles.input}
                  placeholder='Numero telefonico'
                  onChangeText={props.handleChange('phone')}
                  onBlur={props.handleBlur('phone')}
                  value={props.values.phone}
                />
                <Text style={styles.errorText}>{props.touched.phone && props.errors.phone}</Text>


                <TextInput
                  style={styles.input}
                  placeholder='M para masculino F para femenino'
                  onChangeText={props.handleChange('gender')}
                  onBlur={props.handleBlur('gender')}
                  value={props.values.gender}
                />
                <Text style={styles.errorText}>{props.touched.gender && props.errors.gender}</Text>

                <FlatButton onPress={props.handleSubmit} text='Registrarse' />
                <FlatButton onPress={() => setIsSignIn(true)} text='Iniciar sesion' />
                
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
      )
    }
  }

}

const styles = StyleSheet.create({
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