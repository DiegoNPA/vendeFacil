import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import Card from '../shared/card'

export default function SellerItem({ item }) {

  return (
    <Card>
      <Entypo name="shop" size={30} color='#333' />
      <Text style={styles.title}>{item.sellerName} {"\n"}</Text>
      <Text>{item.description}{"\n"}</Text>
      <Text>Telefono: {item.phone}{"\n"}</Text>
      <Text>Categoria: {item.category}{"\n"}</Text>
    </Card>
  )

}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  }
})