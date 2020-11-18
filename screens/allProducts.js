import React, { useState, useEffect, useContext } from 'react'
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native'
import ProductItem from '../Components/productItem'
import { MaterialIcons } from '@expo/vector-icons';
import { Formik } from 'formik';
import * as yup from 'yup';
import FlatButton from '../shared/button';
import { UserContext } from "../Contexts/UserContext";

export default function AllProducts({ navigation }) {

    const {user} = useContext(UserContext);

    const url = `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/products`
    const [products, setProducts] = useState([]);
    fetch(url)
        .then((response) => response.json())
        .then((json) => {
        setProducts(json);
        })
        .catch((e) => {
        console.log(e);
        })
    // useEffect(() => {
    // }, []);
    
    return (
        
        <View style={styles.list}>
            <FlatList 
                data={products}
                keyExtractor={(item, index) => item.SK}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => navigation.navigate('BuyProduct2', item)}>

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
    },
    modalToggle: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#f2f2f2',
        padding: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
    modalClose: {
        marginTop: 20,
        marginBottom: 0,
    },
    modalContent: {
        flex: 1,
    },
    input: {
        marginTop: 40,
        borderWidth: 1,
        borderColor: 'coral',
        padding: 10,
        fontSize: 18,
        borderRadius: 6,
        width: "85%",
        alignSelf: 'center'
    },
    errorText: {
        color: 'crimson',
        fontWeight: 'bold',
        textAlign: 'center',
    }
})