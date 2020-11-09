import React, { useContext, useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import OrderItem from '../Components/orderItem'
import { UserContext } from "../Contexts/UserContext";

export default function Orders({ navigation }) {

    const {user} = useContext(UserContext);

    const url = `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/client/${user.clientId}/orders`
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
    
    return (
        
        <View style={styles.list}>
            <FlatList 
                data={orders}
                keyExtractor={(item, index) => item.SK}
                renderItem={({ item }) => (
                    <TouchableOpacity>
                        <OrderItem item={item}/>
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