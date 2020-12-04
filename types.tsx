import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from '@react-navigation/stack';
import { Product } from "./components/ProductList";

export type RootStackParamList = {
  Root: undefined;
  Product: { id: string };
  EditProduct: { product: Product };
  NotFound: undefined;
};

export type EditProductPageProps = {
  route: RouteProp<RootStackParamList, "EditProduct">;
  navigation: StackNavigationProp<RootStackParamList, "EditProduct">;
}
export type ProductPageProps = {
  route: RouteProp<RootStackParamList, "Product">;
  navigation: StackNavigationProp<RootStackParamList, "Product">;
}

export type BottomTabParamList = {
  List: { navigation: StackNavigationProp<RootStackParamList, "Root"> };
  Search: { navigation: StackNavigationProp<RootStackParamList, "Root"> };
};

export type ListParamList = {
  ListScreen: undefined;
};

export type SearchParamList = {
  SearchScreen: undefined;
};
