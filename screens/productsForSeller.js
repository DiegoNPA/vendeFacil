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
import * as ImagePicker from 'expo-image-picker';
import { RNS3 } from 'react-native-aws3';
import { ScrollView } from "react-native-gesture-handler";
import FlatButtonDelete from '../shared/deleteButton';


export default function ProductsForSeller({ navigation }) {

  const { user } = useContext(UserContext);
  
  const [image, setImage] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const createDeleteAlert = (productId) =>
    Alert.alert(
      "¿Desea eliminar este producto?",
      "Esta accion es irreversible!",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "OK", onPress: () => {
          console.log("OK Pressed")
          const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
          };
          fetch(`https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}/product/${productId}`, requestOptions)
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
  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });


    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);

      console.log(result);

      const file = {
        uri: result.uri,
        name: 'images'+ new Date().valueOf().toString(),
        type: 'image/jpeg'
      }

      const config = {
        keyPrefix: 's3/',
        bucket: 'myphotosserverlessapp',
        region: 'us-east-1',
        accessKey: '#########',
        secretKey: '#########',
        successActionStatus: 201
      }

      RNS3.put(file, config)
        .then( (res) => {
          console.log(res, "aca");
          console.log(res.body.postResponse.location ,'aca si');
          setImageUrl(res.body.postResponse.location);
        } )
      }
    }

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

  const url = `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}/products`;
  const [products, setProducts] = useState([]);
  fetch(url)
    .then((response) => response.json())
    .then((json) => {
      setProducts(json);
    })
    .catch((e) => {
      console.log(e);
    });
  // useEffect(() => {
  // }, []);


  if (!products[0]) {
    return (
      <View>
        <MaterialIcons
          name="add"
          size={24}
          style={styles.modalToggle}
          onPress={() => setModalOpen(true)}
        />
        <Text style={styles.title}>No tiene productos aun! Agregue uno!</Text>

        <Modal visible={modalOpen} animationType="slide">
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
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
                setModalOpen(false);
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
        </Modal>
      </View>
    );
  } else {
    return (
      <View style={styles.list}>
        <MaterialIcons
          name="add"
          size={24}
          style={styles.modalToggle}
          onPress={() => setModalOpen(true)}
        />

        <Modal visible={modalOpen} animationType="slide">
          <View style={styles.modalContent}>
            <MaterialIcons
              name="close"
              size={24}
              style={{ ...styles.modalToggle, ...styles.modalClose }}
              onPress={() => setModalOpen(false)}
            />
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
              onSubmit={async (values) => {
                setModalOpen(false);
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
                  <ScrollView>
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

                    <Text style={styles.text}>Cantidad disponible: </Text>
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
                  </ScrollView>
                </View>
              )}
            </Formik>
          </View>
        </Modal>

        <FlatList
          data={products}
          keyExtractor={(item, index) => item.SK}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => setModalEdit(true)}>
              <Modal visible={modalEdit} animationType="slide">
                <View style={styles.modalContent}>
                  <MaterialIcons
                    name="close"
                    size={24}
                    style={{ ...styles.modalToggle, ...styles.modalClose }}
                    onPress={() => setModalEdit(false)}
                  />
                  <Formik
                    initialValues={{
                      productName: `${item.productName}`,
                      description: `${item.description}`,
                      category: `${item.category}`,
                      price: `${item.price}`,
                      measureUnit: `${item.measureUnit}`,
                      stock: `${item.stock}`,
                    }}
                    validationSchema={schema}
                    onSubmit={(values) => {
                      setModalEdit(false);
                      const requestOptions = {
                        method: "PUT",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                          productName: values.productName,
                          description: values.description,
                          category: values.category,
                          price: values.price,
                          measureUnit: values.measureUnit,
                          stock: values.stock,
                          imageUrl: imageUrl
                        }),
                      };
                      fetch(
                        `https://2bgo6ptw6j.execute-api.us-east-1.amazonaws.com/dev/seller/${user.sellerId}/product/${item.productId}`,
                        requestOptions
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          console.log(data, "data");
                        })
                        .catch((err) => {
                          console.log(err);
                        });
                    }}
                  >
                    {(props) => (
                        <ScrollView>
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
                          {props.touched.productName &&
                            props.errors.productName}
                        </Text>

                        <Text style={styles.text}>
                          Descripcion del producto:
                        </Text>
                        <TextInput
                          style={styles.input}
                          placeholder="Descripcion del producto"
                          onChangeText={props.handleChange("description")}
                          onBlur={props.handleBlur("description")}
                          value={props.values.description}
                        />
                        <Text style={styles.errorText}>
                          {props.touched.description &&
                            props.errors.description}
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
                          {props.touched.measureUnit &&
                            props.errors.measureUnit}
                        </Text>

                        <Text style={styles.text}>Cantidad disponible: </Text>
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

                        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                          <FlatButton text="Elegir una iamgen" onPress={pickImage} />
                          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
                        </View>

                        <FlatButton
                          onPress={props.handleSubmit}
                          text="Guardar los cambios"
                        />

                        <FlatButtonDelete text="Eliminar producto" onPress={() => {
                          createDeleteAlert(item.productId)
                        }}/> 

                      </View>
                        </ScrollView>
                    )}
                  </Formik>
                </View>
              </Modal>

              <ProductItemForSeller item={item} />
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
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
