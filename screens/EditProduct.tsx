import React, { useEffect, useState } from 'react';
import { Image, Text, TextInput, View, Alert, Platform, TouchableOpacity, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { Product } from '../components/ProductList';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import api, { baseURL } from '../services/api';

import { EditProductPageProps } from "../types";
import Colors from '../constants/Colors';
// import { Container } from './styles';

const EditProduct: React.FC<EditProductPageProps> = ({ route, navigation }) => {
  const [product, setProduct] = useState(route.params.product);
  const [price, setPrice] = useState(route.params.product.price / 100);
  const [name, setName] = useState(route.params.product.name);
  const [description, setDescription] = useState(route.params.product.description);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: product.name,
      headerTitleStyle: { padding: 0, margin: 0, color: Colors.store.textDarkColor },
      headerTitleContainerStyle: { padding: 0, margin: 0 },
      headerShown: true,
      headerTintColor: Colors.store.textDarkColor,
      headerBackground: (props) => (
        <View style={{ backgroundColor: Colors.store.backgroundCardDark, flex: 1 }} />
      )
    })
  }, [product])

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestCameraRollPermissionsAsync();
        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (status !== 'granted' && cameraStatus !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const updateImage = React.useCallback(
    async (uri: string) => {
      const data = new FormData();
      data.append('image_url', {
        type: 'image/jpeg',
        name: `${product.name.replace(/\s/g, '')}.jpg`,
        uri
      })
      console.log(data)
      const response = await api.put<Product>(`/products/${product.id}/image`, data)

      setProduct(response.data)
    },
    [],
  )

  const takePicture = React.useCallback(async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
      base64: false
    });
    if (!result.cancelled) {
      const image = await ImageManipulator.manipulateAsync(
        result.uri, [],
        {
          compress: 0.8,
          format: ImageManipulator.SaveFormat.JPEG
        }
      )
      console.log('Não cancelado')
      updateImage(image.uri)
    }
  }, [])

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.cancelled) {
      console.log('Não cancelado')
      updateImage(result.uri)
    }
  };

  const preparePicture = React.useCallback(async () => {
    Alert.alert(
      'Atualizando Imagem',
      'Vocêr quer pegar uma imagem da biblioteca, ou tirar uma foto?',
      [
        {
          text: 'Biblioteca',
          onPress: () => { pickImage() },
          style: 'default'
        },
        {
          text: 'Camera',
          onPress: () => { takePicture() },
          style: "default"
        }
      ],
      { cancelable: false }
    )
  }, [pickImage, takePicture])

  const confirmUpdate = React.useCallback(async () => {
    const data = {
      name,
      price: (price * 100),
      description
    }
    const response = await api.put<Product>(`/products/${product.id}`, data)
    setProduct(response.data)
  }, [price, description, name])

  const handleSubmitUpdate = React.useCallback(async () => {
    Alert.alert(
      "Confirmando atualização",
      `Estamos atualizando o ${name}, com valor R$ ${price.toFixed(2)}, e descrição: ${description}`,
      [
        {
          text: "Cancelar",
          onPress: () => { },
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => { confirmUpdate() }
        }
      ]
    )
  }, [confirmUpdate, name, price])

  return (
    <View
      style={styles.container}
    >
      <View style={styles.formContainer}>
        <Text
          style={styles.nameText}
        >Nome</Text>
        <TextInput
          multiline={true}
          style={styles.nameInput}
          onEndEditing={(event) => {
            console.log(event.nativeEvent.text)
            setName(event.nativeEvent.text)
          }}
          returnKeyType='done'
          defaultValue={name}
          keyboardType='ascii-capable'
        />
        <View
          style={styles.priceContainer}
        >
          <Text
            style={styles.priceText}
          >R$ </Text>
          <TextInput
            multiline={true}
            keyboardType='decimal-pad'
            style={styles.priceInput}
            onEndEditing={(event) => {
              setPrice(parseFloat(event.nativeEvent.text))
            }}
            onSubmitEditing={(event) => {
              setPrice(parseFloat(event.nativeEvent.text))
            }}
            defaultValue={price.toFixed(2)}
            returnKeyType='done'
          />
        </View>
        <Text
          style={styles.descriptionText}
        >Descrição</Text>
        <TextInput
          multiline={true}
          style={styles.descriptionInput}
          onEndEditing={(event) => {
            setDescription(event.nativeEvent.text)
          }}
          returnKeyType='done'
          defaultValue={description}
        />
        <RectButton
          style={styles.updateButtom}
          onPress={() => {
            handleSubmitUpdate()
          }}
        >
          <Text
            style={styles.updateButtomText}
          >
            {"Atualizar"}
          </Text>
        </RectButton>
      </View>
      <TouchableOpacity
        onPress={() => {
          preparePicture()
        }}
        style={styles.imageContainer}
      >
        <Image
          style={styles.image}
          source={{
            uri: `${baseURL}/files/${product.image_url}`,
            width: 100,
            height: 100
          }}
        ></Image>
      </TouchableOpacity>

    </View>
  );
}

export default EditProduct;



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.store.background,
    position: 'relative'
  },
  formContainer: {
    height: 150,
    paddingTop: 15,
    alignSelf: 'center'
  },
  nameText: {
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    color: Colors.store.text,
    fontSize: 20
  },
  nameInput: {
    width: 300,
    margin: 5,
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    color: Colors.store.text,
    borderColor: Colors.store.border,
    borderRadius: 4
  },
  priceContainer: {
    flexDirection: 'row'
  },
  priceText: {
    fontSize: 30,
    margin: 7,
    alignSelf: 'center',
    color: Colors.store.text
  },
  priceInput: {
    width: 250,
    margin: 5,
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    color: Colors.store.text,
    borderColor: Colors.store.border,
    borderRadius: 4
  },
  descriptionText: {
    margin: 5,
    marginTop: 0,
    marginBottom: 0,
    color: Colors.store.text,
    fontSize: 20
  },
  descriptionInput: {
    height: 100,
    width: 300,
    margin: 5,
    fontSize: 20,
    padding: 10,
    borderWidth: 1,
    color: Colors.store.text,
    borderColor: Colors.store.border,
    borderRadius: 4
  },
  updateButtom: {
    margin: 10,
    height: 50,
    width: 150,
    alignSelf: 'center',
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.store.backgroundCardDark,
    borderRadius: 15,
    borderColor: "#000",
    borderWidth: 10
  },
  updateButtomText: {
    fontSize: 30,
    color: Colors.store.textDarkColor
  },
  imageContainer: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center'
  },
  image: {
    borderRadius: 10,
  }
})