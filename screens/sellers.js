import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native'
import SellerItem from '../Components/sellerItem'
import Card from '../shared/card'

export default function Sellers({navigation}) {
    
    const url = "https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/sellers"
    const [sellers, setSellers] = useState([]);
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
        setSellers(json);
        })
        .catch((e) => {
        console.log(e);
        })
    // useEffect(() => {
    // }, []);
    
    return (
        
        <View style={styles.list}>
            <FlatList 
                data={sellers}
                keyExtractor={(item, index) => item.PK}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('Products', item)}> 
                        <SellerItem item={item}/>
                    </TouchableOpacity>
                )}
            />
        </View>
    )

}

const styles = StyleSheet.create({
    list: {
        flex: 1
    },
    title: {
        padding: 16,
        marginTop: 16,
        borderColor: '#bbb',
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 10,
        justifyContent: 'center',
        alignContent: 'center',
        fontWeight: 'bold',
        textAlign: 'center'
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