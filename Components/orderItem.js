import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Card from '../shared/card'

export default function OrderItem({ item }) {

  return (
    <Card>
      <AntDesign name="tagso" size={30} color="black" />
      <Text style={styles.title}>{item.orderStatus} {"\n"}</Text>
      <Text>Id: {item.orderId}{"\n"}</Text>
      <Text>Producto: {item.productName}{"\n"}</Text>
      <Text>Precio: {item.finalPrice}{"\n"}</Text>
      <Text>Cantidad: {item.quantity}{"\n"}</Text>
    </Card>
  )

}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  }
})