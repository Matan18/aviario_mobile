import React from 'react';
import { Image, Text, View } from 'react-native';
import AntDesign from "@expo/vector-icons/build/AntDesign";
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Product } from '../components/ProductList';
import api, { baseURL } from '../services/api';
import { ProductPageProps } from '../types';

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
          <AntDesign name="edit" size={40}></AntDesign>
        </TouchableOpacity>
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
      style={{ flex: 1, position: 'relative' }}
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
        <Text style={{ fontSize: 30 }}>Preço: R$ {`${(product.price / 100).toFixed(2)}`}</Text>
      </View>
      <Text style={{ fontSize: 20, padding: 10 }}>{product.description}</Text>

    </View>
  );
}

export default ProductPage;