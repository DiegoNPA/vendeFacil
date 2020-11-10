import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import Card from '../shared/card'
import { AntDesign } from '@expo/vector-icons';

export default function ProductItemForSeller({ item }) {

  return (
    <Card>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Image source={{ uri:item.imageUrl }} style={{ width: 300, height: 300, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20,borderTopLeftRadius: 20 }} />
      </View>
      <View style={{position: 'absolute'}}>
        <MaterialIcons name="shopping-basket" size={30} color="black" />
        <Text style={{fontWeight:'bold'}}>{item.productName} {"\n"}</Text>
        <Text>{item.description}{"\n"}</Text>
        <Text>Categoria: {item.category}{"\n"}</Text>
        <Text>Precio: {item.price}{"\n"}</Text>
        <Text>Unidad de medida: {item.measureUnit}{"\n"}</Text>
        <Text>Cantidad en stock: {item.stock}{"\n"}</Text>
        <View style={styles.edit}>
          <MaterialIcons name="add-a-photo" size={30} color="black" />
          <AntDesign name="edit" size={30} color="black" />
        </View>
      </View>
    </Card>
  )

}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
  edit: {
    flex: 1,
    justifyContent: 'flex-end',
  }
})