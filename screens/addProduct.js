import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Modal,
  Image,
  Alert
} from "react-native";
import ProductItemForSeller from "../Components/productItemForSeller";
import { MaterialIcons } from "@expo/vector-icons";
import { Formik } from "formik";
import * as yup from "yup";
import FlatButton from "../shared/button";
import { UserContext } from "../Contexts/UserContext";
import { ScrollView } from "react-native-gesture-handler";

export default function AddProduct({navigation}){

  const { user } = useContext(UserContext);

  const createAddAlert = () =>
  Alert.alert(
    "Añada una foto para su producto!",
    "Edite el producto",
    [
      {
        text: "Cancel",
        onPress: () => console.log("Cancel Pressed"),
        style: "cancel"
      },
      { text: "OK", onPress: () => {
        console.log("OK Pressed")
      }}
    ],
    { cancelable: false }
  );

  const schema = yup.object({
    productName: yup
      .string()
      .required("Este valor es requerido!")
      .min(4, "El valor debe ser mayor a 4 caracteres"),
    description: yup
      .string()
      .required("Este valor es requerido!")
      .meta(8, "El valor debe ser mayor a 8 caracteres"),
    category: yup
      .string()
      .required("Este valor es requerido!")
      .min(5, "El valor debe ser mayor a 5 caracteres"),
    price: yup
      .string()
      .required("Este valor es requerido!")
      .test("isNumber", "El valor debe ser un numero", (val) => {
        return parseInt(val) > 0;
      }),
    measureUnit: yup.string().required("Este valor es requerido!"),
    stock: yup
      .string()
      .required("Este valor es requerido!")
      .test("isNumber", "El valor debe ser un numero", (val) => {
        return parseInt(val) > 0;
      }),
  });

  return(
    <ScrollView>
      <View style={styles.modalContent}>
        <Formik
          initialValues={{
            productName: "",
            description: "",
            category: "",
            price: "",
            measureUnit: "",
            stock: "",
          }}
          validationSchema={schema}
          onSubmit={(values) => {
            const requestOptions = {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                productName: values.productName,
                description: values.description,
                category: values.category,
                price: values.price,
                measureUnit: values.measureUnit,
                stock: values.stock,
                imageUrl: " "
              }),
            };
            fetch(
              `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}/product`,
              requestOptions
            )
              .then((response) => response.json())
              .then((data) => {
                console.log(data, "data");
              })
              .catch((err) => {
                console.log(err);
              });
              createAddAlert();

          }}
        >
          {(props) => (
            <View>
              <Text style={styles.text}>Nombre del producto:</Text>
              <TextInput
                style={styles.input}
                placeholder="Nombre del producto"
                onChangeText={props.handleChange("productName")}
                onBlur={props.handleBlur("productName")}
                value={props.values.productName}
              />
              <Text style={styles.errorText}>
                {props.touched.productName && props.errors.productName}
              </Text>

              <Text style={styles.text}>Descripcion del producto:</Text>
              <TextInput
                style={styles.input}
                placeholder="Descripcion del producto"
                onChangeText={props.handleChange("description")}
                onBlur={props.handleBlur("description")}
                value={props.values.description}
              />
              <Text style={styles.errorText}>
                {props.touched.description && props.errors.description}
              </Text>

              <Text style={styles.text}>Categoria del producto:</Text>
              <TextInput
                style={styles.input}
                placeholder="Categoria del producto"
                onChangeText={props.handleChange("category")}
                onBlur={props.handleBlur("category")}
                value={props.values.category}
              />
              <Text style={styles.errorText}>
                {props.touched.category && props.errors.category}
              </Text>

              <Text style={styles.text}>Precio del producto:</Text>
              <TextInput
                style={styles.input}
                placeholder="Precio del producto"
                onChangeText={props.handleChange("price")}
                onBlur={props.handleBlur("price")}
                keyboardType="numeric"
                value={props.values.price}
              />
              <Text style={styles.errorText}>
                {props.touched.price && props.errors.price}
              </Text>

              <Text style={styles.text}>
                Unidad de medida del producto:
              </Text>
              <TextInput
                style={styles.input}
                placeholder="ej: kilo, unidad, etc"
                onChangeText={props.handleChange("measureUnit")}
                onBlur={props.handleBlur("measureUnit")}
                value={props.values.measureUnit}
              />
              <Text style={styles.errorText}>
                {props.touched.measureUnit && props.errors.measureUnit}
              </Text>

              <Text style={styles.text}>Cantidad disponible:</Text>
              <TextInput
                style={styles.input}
                placeholder="Cantidad disponible"
                onChangeText={props.handleChange("stock")}
                onBlur={props.handleBlur("stock")}
                keyboardType="numeric"
                value={props.values.stock}
              />
              <Text style={styles.errorText}>
                {props.touched.stock && props.errors.stock}
              </Text>

              <FlatButton
                onPress={props.handleSubmit}
                text="Añadir el producto"
              />
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  )

}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  title: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
    justifyContent: "center",
    alignContent: "center",
    fontWeight: "bold",
    textAlign: "center",
  },
  item: {
    padding: 16,
    marginTop: 16,
    borderColor: "#bbb",
    borderWidth: 1,
    borderStyle: "dashed",
    borderRadius: 10,
  },
  modalToggle: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#f2f2f2",
    padding: 10,
    borderRadius: 10,
    alignSelf: "center",
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
    borderColor: "coral",
    padding: 10,
    fontSize: 18,
    borderRadius: 6,
    width: "85%",
    alignSelf: "center",
  },
  errorText: {
    color: "crimson",
    fontWeight: "bold",
    textAlign: "center",
  },
  text: {
    fontWeight: "bold",
    textAlign: "center",
  },
})