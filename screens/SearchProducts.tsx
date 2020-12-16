import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { RectButton, TextInput } from 'react-native-gesture-handler';

import ProductList, { Product } from '../components/ProductList';
import { View } from '../components/Themed';
import api from '../services/api';
import Colors from '../constants/Colors';
import Layout from '../constants/Layout';

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
        style={styles.searchContainer}
      >
        <TextInput
          style={styles.searchInput}
          value={searchValue}
          placeholder="Pesquisar Produto"
          onChangeText={(value) => { setSearchValue(value) }}
        />
        <RectButton
          onPress={handleSearch}
          style={styles.searchButtom}
        >
          <FontAwesome
            name="search-plus" size={25}
            style={styles.searchIcon}
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
  searchContainer: {
    width: Layout.window.width,
    padding: 5,
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: Colors.store.backgroundCardDark,
    borderBottomWidth: 2,
    borderBottomColor: Colors.store.borderDark,
  },
  searchInput: {
    backgroundColor:Colors.store.backgroundLight,
    borderColor: Colors.store.borderDark,
    borderRadius: 4,
    borderWidth: 2,
    width: 250,
    height: 30,
    fontSize: 20,
    margin: 5,
    padding: 5,
    paddingLeft: 10
  },
  searchButtom: {
    width: 30,
    height: 30,
    margin: 5,
    borderRadius: 15,
    justifyContent: 'center'
  },
  searchIcon: {
    alignSelf: 'center',
    color: Colors.store.border
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
