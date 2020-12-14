import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Entypo } from '@expo/vector-icons';
import Card from '../shared/card';

export default function SellerItem({ item }) {

  const rating = item.rating;

  return (
    <Card>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end', marginTop:20 }}>
        <Image source={{ uri:item.imageUrl }} style={{ width: 200, height: 200, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, borderTopRightRadius: 20,borderTopLeftRadius: 20 }} />
      </View>
      <View style={{position: 'absolute'}}>
        <Entypo name="shop" size={30} color='#333' />
        <Text style={styles.title}>{item.sellerName} {"\n"}</Text>
        <Text>{item.description}{"\n"}</Text>
        <Text>Telefono: {item.phone}{"\n"}</Text>
        <Text>Categoria: {item.category}{"\n"}</Text>
        <Image source={images.ratings[rating]} style={{flex:1, width:200, height:40}}/>
      </View>
    </Card>
  )

}

const styles = StyleSheet.create({
  title: {
    fontWeight: 'bold',
  },
})

const images = {
  ratings: {
    '1': require('../assets/rating1.png'),
    '2': require('../assets/rating2.png'),
    '3': require('../assets/rating3.png'),
    '4': require('../assets/rating4.png'),
    '5': require('../assets/rating5.png'),
  }
}