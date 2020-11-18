import React, { useContext, useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Text } from 'react-native'
import OrderItem from '../Components/orderItem'
import { UserContext } from "../Contexts/UserContext";

export default function RejectedOrdersSeller({ navigation }) {

    const {user} = useContext(UserContext);

    const url = `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}/orders`
    const [orders, setOrders] = useState([]);
        fetch(url)
            .then((response) => response.json())
            .then((json) => {
            setOrders(json);
            })
            .catch((e) => {
            console.log(e);
            })
    // useEffect(() => {
    // }, []);
    
    if(!orders[0]){
        return (
            <Text style={styles.title}>No tiene pedidos rechazados aun</Text>
        )
    }else{
        return (
            
            <View style={styles.list}>
                <FlatList 
                    data={orders}
                    keyExtractor={(item, index) => item.SK}
                    renderItem={({ item }) => (
                        (item.orderStatus == 'Rechazado' ? 
                            <TouchableOpacity onPress={() => navigation.navigate('OrderMap', item)}>
                                <OrderItem item={item}/>
                            </TouchableOpacity> : null)
                    )}
                />
            </View>
        )
    }


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