import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton, TextInput } from 'react-native-gesture-handler';

import ProductList, { Product } from '../components/ProductList';
import { View } from '../components/Themed';
import api from '../services/api';

const SearchProducts: React.FC = () => {
  const [list, setList] = React.useState<Product[]>([]);
  const [searchValue, setSearchValue] = React.useState('');
  const handleSearch = React.useCallback(
    () => {
      api.get<Product[]>(`/products/search?name=${searchValue}`).then(response => {
        setList(response.data)
      })
    }, [setList, searchValue],
  )
  return (
    <View style={styles.container}>
      <View
        style={
          {
            padding: 5,
            flexDirection: 'row'
          }
        }
      >
        <TextInput
          style={
            {
              backgroundColor: '#bbb',
              width: 250,
              height: 30,
              fontSize: 20,
              margin: 5,
              padding: 5
            }
          }
          value={searchValue}
          placeholder="Pesquisar Produto"
          onChangeText={(value) => { setSearchValue(value) }}
        />
        <RectButton
          onPress={handleSearch}
          style={
            {
              width: 30,
              height: 30,
              margin: 5,
              backgroundColor: '#999',
              borderRadius: 15,
              justifyContent: 'center'
            }
          }
        >
          <FontAwesome
            name="search-plus" size={25}
            style={{
              alignSelf: 'center',

            }}
          />

        </RectButton>

      </View>
      <ProductList products={list} />
    </View>
  );
}
export default SearchProducts;

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
