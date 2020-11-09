import React, { useState, useEffect } from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, SafeAreaView, TouchableOpacity } from 'react-native'
import ProductItem from '../Components/productItem'

export default function AllProducts({ navigation }) {

    const url = `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/products`
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
            setProducts(json);
            })
            .catch((e) => {
            console.log(e);
            })
    }, []);
    
    return (
        
        <View style={styles.list}>
            <FlatList 
                data={products}
                keyExtractor={(item, index) => item.SK}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.item}>
                        <ProductItem item={item}/>
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