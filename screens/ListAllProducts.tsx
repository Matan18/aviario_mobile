import * as React from 'react';
import { StyleSheet } from 'react-native';

import ProductList, { Product } from "../components/ProductList";
import { View } from '../components/Themed';
import api from '../services/api';

const TabOneScreen: React.FC = () => {
  const [list, setList] = React.useState<Product[]>();
  React.useEffect(() => {
    api.get<Product[]>('/products').then(response => {
      setList(response.data)
    })
  }, [])



  return (
    <View style={styles.container}>
      <ProductList products={list ? list : []} />
    </View>
  );
}

export default TabOneScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
