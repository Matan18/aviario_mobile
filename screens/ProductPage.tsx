import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Product } from '../components/ProductList';
import api, { baseURL } from '../services/api';
import { ProductPageProps } from '../types';
import Colors from '../constants/Colors';

// import { Container } from './styles';

const ProductPage: React.FC<ProductPageProps> = ({ route, navigation }) => {
  const [product, setProduct] = React.useState<Product>({} as Product);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: product.name,
      headerShown: true,
      headerRight: (props) => (
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('EditProduct', { product })
          }}
          style={{
            margin: 5
          }}
        >
          <AntDesign name="edit" size={40} color={Colors.store.textDarkColor}></AntDesign>
        </TouchableOpacity>
      ),
      headerTintColor: Colors.store.textDarkColor,
      headerBackground: (props) => (
        <View style={{ backgroundColor: Colors.store.backgroundCardDark, flex: 1 }} />
      )

    })
  }, [product])
  React.useEffect(() => {
    api.get<Product>(`/products/${route.params.id}`).then(response => {
      setProduct(response.data);
    })
  }, [route])

  return (
    <View
      style={styles.container}
    >
      <Image
        style={styles.image}
        source={{
          uri: `${baseURL}/files/${product.image_url}`,
          width: 300,
          height: 300
        }}
      />
      <View
        style={styles.dataContainer}
      >
        <Text
          style={styles.priceText}
        >Preço: R$ {`${(product.price / 100).toFixed(2)}`}</Text>
        <Text style={styles.descriptionText}>{product.description}</Text>
      </View>

    </View>
  );
}

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.store.background,
    alignItems: 'center',
  },
  image: {
    marginVertical: 20,
    borderWidth: 3,
    borderColor: Colors.store.borderDark,
    borderRadius: 20
  },
  dataContainer: {
    height: 50,
    paddingTop: 15,
    width: 325,
    alignItems: 'center',
  },
  priceText: {
    fontSize: 30,
    color: Colors.store.text
  },
  descriptionText: {
    margin: 10,
    fontSize: 20,
    color: Colors.store.text,
    textAlign: 'center'
  }
})