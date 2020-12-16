import React from 'react';
import { Alert, Image, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as ImageManipulator from "expo-image-manipulator";
import api from '../services/api';
import { Product } from './ProductList';

// import { Container } from './styles';

interface INewProductProp {
  onProductCreated: (product: Product) => void;
}

const NewProduct: React.FC<INewProductProp> = ({ onProductCreated }) => {
  const [name, setName] = React.useState('')
  const [description, setDescription] = React.useState('')
  const [price, setPrice] = React.useState(1)
  const [quantity, setQuantity] = React.useState(1)
  const [image, setImage] = React.useState<string>()

  const createProduct = React.useCallback(async () => {
    const data = new FormData();
    data.append('name', name)
    data.append('description', description)
    data.append('price', (price * 100).toString());
    data.append('quantity', (quantity).toString());
    data.append('image_url', {
      type: 'image/jpeg',
      name: `${name.replace(/\s/g, '')}.jpg`,
      uri: image
    })
    const response = await api.post<Product>('/products', data);
    onProductCreated(response.data);
  }, [name, description, image, price, quantity])

  const updateImage = React.useCallback(
    (uri: string) => {
      setImage(uri)
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
      quality: 0.6,
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

  return (
    <View style={
      {
        alignSelf: 'center',
        margin: 50,
        backgroundColor: '#ddd',
        borderRadius: 20,
        width: 300,
        height: 350,
        justifyContent: 'center',
        alignItems: 'center'
      }
    }>
      <View>
        <Text>Nome</Text>
        <TextInput
          style={{ width: 250, height: 30, backgroundColor: '#999', textAlign: 'center' }}
          value={name}
          placeholder="Coloque o nome do produto"
          onChangeText={(value) => setName(value)}
        />
      </View>
      <View>
        <Text>Descrição</Text>
        <TextInput
          style={{ width: 250, height: 30, backgroundColor: '#999', textAlign: 'center' }}
          value={description}
          placeholder="Coloque a descrição do produto"
          onChangeText={(value) => setDescription(value)}
        />
      </View>
      <View>
        <Text>Preço</Text>
        <View
          style={{
            flexDirection: 'row'
          }}
        >
          <TextInput
            multiline={true}
            keyboardType='decimal-pad'
            style={{ width: 250, height: 30, backgroundColor: '#999', textAlign: 'center' }}
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
        <TouchableOpacity
          onPress={() => {
            preparePicture()
          }}
          style={{
            margin: 5,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text>Coloque uma Imagem</Text>
          <Image
            style={{
              alignSelf: 'center',
              margin: 0,
              backgroundColor: '#000',
            }}
            source={{
              uri: `${image}`,
              width: 100,
              height: 100
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            margin: 0,
            height: 50,
            width: 150,
            alignItems: 'center',
            alignSelf: 'center',
            justifyContent: 'center',
            backgroundColor: '#005',
            borderRadius: 15
          }}
          onPress={() => {
            createProduct()
          }}
        >
          <Text
            style={{ fontSize: 30, color: "#fff" }}
          >
            {"Atualizar"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default NewProduct;