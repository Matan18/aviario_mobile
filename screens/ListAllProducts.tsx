import * as React from 'react';
import { Modal, StyleSheet } from 'react-native';
import FloatButton from '../components/FloatButton';

import ProductList, { Product } from "../components/ProductList";
import NewProduct from "../components/NewProduct";
import { View } from '../components/Themed';
import colors from "../constants/Colors";
import api from '../services/api';

const ListAllProducts: React.FC = () => {
  const [list, setList] = React.useState<Product[]>([]);
  const [modalVisible, setModaVisible] = React.useState(false);

  React.useEffect(() => {
    console.log('===========Separator==============')
    api.get<Product[]>('/products').then(response => {
      setList(response.data)
    })
  }, [])


  const showModal = React.useCallback(() => {
    setModaVisible(true)
  }, [setModaVisible])

  const updateList = React.useCallback(
    (product: Product) => {
      setList([...list, product])
      setModaVisible(false)
    },
    [setList, list],
  )

  return (
    <View style={styles.container}>
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
        onRequestClose={() => {
          setModaVisible(false)
        }}
      >
        <NewProduct onProductCreated={(product) => { updateList(product) }} />
      </Modal>
      <ProductList products={list ? list : []} />
      <FloatButton
        onPress={() => {
          showModal()
        }}
        buttonStyles={{
          position: 'absolute',
          right: 20,
          bottom: 20
        }}
        size={50}
      />
    </View>
  );
}

export default ListAllProducts;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
