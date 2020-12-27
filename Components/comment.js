import React from 'react'
import { Text, StyleSheet } from 'react-native'
import Card from '../shared/card'
import { FontAwesome } from '@expo/vector-icons';

export default function Comment({ item }) {

  return (
    <Card>
      <FontAwesome name="comments" size={24} color="black" />
      <Text>{item}</Text>
    </Card>
  )

}