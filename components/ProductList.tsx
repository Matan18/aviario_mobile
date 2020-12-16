import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { FlatList, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { baseURL } from "../services/api";

import colors from "../constants/Colors";

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
      style={styles.container}
      data={products}
      keyExtractor={item => item.id}
      numColumns={2}
      renderItem={({ item: product }) => (
        <TouchableOpacity
          onPress={() => { nav(product.id) }}
          style={styles.card}>
          <Text
            style={styles.cardTitle}
          >{product.name}</Text>
          <Image
            style={styles.cardImage}
            source={{
              uri: `${baseURL}/files/${product.image_url}`,
              height: 100,
              width: 100
            }}></Image>
          <Text
            style={styles.cardDescription}
          >{product.description}</Text>
        </TouchableOpacity >
      )} />
  )
}

export default ProductList;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.store.background,
    width: '100%',
    padding: 10,
  },
  card: {
    marginHorizontal: 5,
    marginBottom: 15,
    flex: 1,
    backgroundColor: colors.store.backgroundCard,
    minHeight: 200,
    borderColor: colors.store.border,
    borderWidth: 4,
    borderTopRightRadius: 5,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 20
  },
  cardTitle: {
    margin: 10,
    marginBottom: 0,
    textAlign: 'center',
    color: colors.store.text
  },
  cardImage: {
    margin: 10,
    alignSelf: 'center',
  },
  cardDescription: {
    padding: 10,
    paddingTop: 2,
    color: colors.store.text
  }
})