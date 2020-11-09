import React from 'react';
import { StyleSheet, View, Text } from 'react-native'

export default function Header() {
    return (
        <View style={styles.header}>
            <Text style={styles.title}>VendoFacil</Text>
        </View>
    )

}

const styles = StyleSheet.create({
    header: {
        height: 80,
        paddingTop: 30,
        backgroundColor: "coral"
    },
    title: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    }
})