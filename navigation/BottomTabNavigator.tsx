import { Feather } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ListAllProducts from '../screens/ListAllProducts';
import SearchProducts from '../screens/SearchProducts';
import { BottomTabParamList, ListParamList,  SearchParamList } from '../types';

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

const BottomTabNavigator: React.FC = () => {
  const colorScheme = useColorScheme();
  return (
    <BottomTab.Navigator
      initialRouteName="List"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      <BottomTab.Screen
        name="List"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="list" color={color} />,
        }}
      />
      <BottomTab.Screen
        name="Search"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

export default BottomTabNavigator;
// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: string; color: string }) {
  return <Feather size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<ListParamList>();

function TabOneNavigator() {
  return (
    <TabOneStack.Navigator>
      <TabOneStack.Screen
        name="ListScreen"
        component={ListAllProducts}
        options={{ headerTitle: 'Todos os Produtos' }}
      />
    </TabOneStack.Navigator>
  );
}

const TabTwoStack = createStackNavigator<SearchParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="SearchScreen"
        component={SearchProducts}
        options={{ headerTitle: 'Pesquisar' }}
      />
    </TabTwoStack.Navigator>
  );
}
