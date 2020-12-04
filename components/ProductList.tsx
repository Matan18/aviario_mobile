import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { baseURL } from "../services/api";

// import { Container } from './styles';

export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  price: number;
}

export interface ListProps {
  products: Product[];
}

const ProductList: React.FC<ListProps> = ({ products }) => {
  const navigation = useNavigation();
  const nav = React.useCallback((id: string) => {
    navigation.navigate('Product', { id })

  }, [navigation])
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: '#8255e6', width: '100%', padding: 10 }}
      data={products}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={({ item: product }) => (
        <TouchableOpacity
          onPress={() => { nav(product.id) }}
          style={
            {
              margin: 5,
              flex: 1,
              backgroundColor: '#555',
              minHeight: 200,
            }}>
          <Text
            style={
              {
                padding: 5
              }
            }
          >{product.name}</Text>
          <Image
            style={
              {
                margin: 10,
                alignSelf: 'center',
              }
            }
            source={{
              uri: `${baseURL}/files/${product.image_url}`,
              height: 100,
              width: 100
            }}></Image>
          <Text
            style={
              {
                padding: 10,
                paddingTop: 2
              }
            }
          >{product.description}</Text>
        </TouchableOpacity>
      )} />
  )
}

export default ProductList;