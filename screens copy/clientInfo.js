import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ClientInfo({ navigation }) {

    const url = "https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client/99a00a42-cbc8-43e7-9b43-14b98684540f"
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
      <View style={styles.item}>
        <Ionicons name="md-person" size={30} color="black" />
        <Text style={styles.title}>{client.clientName}</Text>
        <Text>{client.lastName}{"\n"}</Text>
        <Text>Telefono: {client.phone}{"\n"}</Text>
        <Text>Sexo: {message}{"\n"}</Text>
      </View>
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