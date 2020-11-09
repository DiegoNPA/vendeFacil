import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card'

export default function ProductItem({ item }) {

  return (
    <Card>
      <MaterialIcons name="shopping-basket" size={30} color="black" />
      <Text>{item.productName} {"\n"}</Text>
      <Text>Categoria: {item.category}{"\n"}</Text>
      <Text>{item.description}{"\n"}</Text>
      <Text>Precio: {item.price}{"\n"}</Text>
      <Text>Unidad de medida: {item.measureUnit}{"\n"}</Text>
      <Text>Cantidad en stock: {item.stock}{"\n"}</Text>
    </Card>
  )

}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  }
})