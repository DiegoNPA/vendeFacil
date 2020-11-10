import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import Card from '../shared/card'

export default function SellerItem({ item }) {

  return (
    <Card>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
        <Image source={{ uri:item.imageUrl }} style={{ width: 200, height: 200, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20,borderTopLeftRadius: 20 }} />
      </View>
      <View style={{position: 'absolute'}}>
        <Entypo name="shop" size={30} color='#333' />
        <Text style={styles.title}>{item.sellerName} {"\n"}</Text>
        <Text>{item.description}{"\n"}</Text>
        <Text>Telefono: {item.phone}{"\n"}</Text>
        <Text>Categoria: {item.category}{"\n"}</Text>
      </View>
    </Card>
  )

}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  }
})