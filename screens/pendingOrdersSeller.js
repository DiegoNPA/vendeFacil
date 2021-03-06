import React, { useContext, useState, useEffect } from 'react'
import { View, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native'
import OrderItem from '../Components/orderItem'
import { UserContext } from "../Contexts/UserContext";
import FlatButtonConfirm from '../shared/confirmButton';
import FlatButtonDelete from '../shared/deleteButton';

export default function PendingOrdersSeller({ navigation }) {

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

    const createConfirmAlert = (productId) =>
    Alert.alert(
        "Confirmar pedido",
        "¿Desea confirmar el pedido?",
        [
        {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        { text: "OK", onPress: () => {
            console.log("OK Pressed")
            const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paramName: "orderStatus", paramValue: "Confirmado" })
            };
            fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}/order/${productId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data, 'data');
                })
                .catch((err) => {
                    console.log(err);
                });
        }}
        ],
        { cancelable: false }
    );

    const createRejectAlert = (productId) =>
    Alert.alert(
        "Rechazar pedido",
        "¿Desea rechazar el pedido?",
        [
        {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel"
        },
        { text: "OK", onPress: () => {
            console.log("OK Pressed")
            const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ paramName: "orderStatus", paramValue: "Rechazado" })
            };
            fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}/order/${productId}`, requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data, 'data');
                })
                .catch((err) => {
                    console.log(err);
                });
        }}
        ],
        { cancelable: false }
    );

    if(!orders[0]){
        return (
            <Text style={styles.title}>No tiene pedidos pendientes aun</Text>
        )
    }
    else{
        return (
            
            <View style={styles.list}>
                <FlatList 
                    data={orders}
                    keyExtractor={(item, index) => item.SK}
                    renderItem={({ item }) => (
                        (item.orderStatus == 'Pendiente' ? 
                        <TouchableOpacity onPress={() => navigation.navigate('OrderMap', item)}>
                            <OrderItem item={item}/>
                            <FlatButtonConfirm onPress={() => createConfirmAlert(item.orderId)} text='Confirmar el pedido'/>
                            <FlatButtonDelete onPress={() => createRejectAlert(item.orderId)} text='Rechazar el pedido'/>
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