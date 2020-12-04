import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Text, TextInput, View } from 'react-native';
import { baseURL } from '../services/api';

import { EditProductPageProps } from "../types";
// import { Container } from './styles';

const EditProduct: React.FC<EditProductPageProps> = ({ route, navigation }) => {
  const [product, setProduct] = useState(route.params.product);
  const [price, setPrice] = useState(route.params.product.price/100);
  const [name, setName] = useState(route.params.product.name);
  const [description, setDescription] = useState(route.params.product.description);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: product.name,
      headerTitleStyle: { padding: 0, margin: 0 },
      headerTitleContainerStyle: { padding: 0, margin: 0 },
      headerShown: true,
    })
  }, [product])
  return (
    <KeyboardAvoidingView
      style={{ flex: 1, }}
    >
      <Image
        style={{
          alignSelf: 'center',
          margin: 20
        }}
        source={{
          uri: `${baseURL}/files/${product.image_url}`,
          width: 300,
          height: 300
        }}
      ></Image>
      <View style={{ height: 50, paddingTop: 15, alignSelf: 'center' }}>
        <TextInput style={{ fontSize: 30, backgroundColor:"#333" }}
          value={(price).toString()}
          onChangeText={(value) => { setPrice(parseInt(value)) }}
        />
        <Text>{(price).toFixed(2)}</Text>
      </View>
      <TextInput style={{ fontSize: 20, padding: 10 }}>{product.description}</TextInput>

    </KeyboardAvoidingView>
  );
}

export default EditProduct;