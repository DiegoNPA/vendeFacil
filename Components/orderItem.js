import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import Card from '../shared/card'

export default function OrderItem({ item }) {

  const date = JSON.stringify(item.startDate);
  const stDate = date.substring(1, 25);
  const date2 = JSON.stringify(item.expDate);
  const expDate = date2.substring(1, 25);

  return (
    <Card>
      <AntDesign name="tagso" size={30} color="black" />
      <Text style={styles.title}>{item.orderStatus} {"\n"}</Text>
      <Text>Comprador: {item.clientName} {"\n"}</Text>
      <Text>Vendedor: {item.sellerName} {"\n"}</Text>
      <Text>Fecha de inicio: {stDate} {"\n"}</Text>
      <Text>Fecha de vencimiento: {expDate} {"\n"}</Text>
      <Text>Producto: {item.productName}{"\n"}</Text>
      <Text>Precio: {item.finalPrice}{"\n"}</Text>
      <Text>Cantidad: {item.quantity}{"\n"}</Text>
      <Text>Id: {item.orderId}{"\n"}</Text>
    </Card>
  )

}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  }
})