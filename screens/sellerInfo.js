import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../shared/card'

export default function SellerInfo({ navigation }) {

    const url = "https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/ac277012-9bb8-4476-a709-ff9ab433d6b3"
    const [seller, setSeller] = useState({});
    useEffect(() => {
      fetch(url)
          .then((response) => response.json())
          .then((json) => {
          setSeller(json);
          })
          .catch((e) => {
          console.log(e);
          })
  }, []);
    
    return (
      <Card>
        <Ionicons name="md-person" size={30} color="black" />
        <Text style={styles.title}>{seller.sellerName}</Text>
        <Text>Descripcion: {seller.description}</Text>
        <Text>Categoria: {seller.category}</Text>
        <Text>Telefono: {seller.phone}</Text>
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