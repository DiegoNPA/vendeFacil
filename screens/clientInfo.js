import React, { useContext, useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../shared/card'
import UserContextProvider, { UserContext } from "../Contexts/UserContext";

export default function ClientInfo({ navigation }) {

    const {user} = useContext(UserContext);

    const url = `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client/${user.clientId}`
    const [client, setClient] = useState({});
    useEffect(() => {
      fetch(url)
          .then((response) => response.json())
          .then((json) => {
          setClient(json);
          })
          .catch((e) => {
          console.log(e);
          })
  }, []);
    const male = "Masculino";
    const female = "Femenino";
    let message;

    if (client.gender === 'M') {
      message = male;
    } else {
      message = female;
    }
    
    return (
      <Card>
        <Ionicons name="md-person" size={30} color="black" />
        <Text style={styles.title}>{client.clientName}</Text>
        <Text>{client.lastName}</Text>
        <Text>Tipo: {client.type}</Text>
        <Text>Telefono: {client.phone}</Text>
        <Text>Sexo: {message}</Text>
      </Card>
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
    }
})