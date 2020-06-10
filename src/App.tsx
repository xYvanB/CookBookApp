import React from 'react';

//Navigation Stuff
import 'react-native-gesture-handler';
import { NavigationContainer, StackRouter } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack';

//Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

//Component
import Home from './components/home';
import Menu from './components/menu';
import NewRecipe from './components/newRecipe';
import Salty from './components/salty';
import Sweet from './components/sweet';

const App = () => {

  //try to use this for put salty and sweet screen inside "Ricettario"
  const Stack = createStackNavigator ();
  const MaterialBottomTabs = createMaterialBottomTabNavigator();

  const MyStack = () => {
    return (
    <Stack.Navigator headerMode='none'>
      <Stack.Screen name='Ricettario' component= {Menu} />
      <Stack.Screen name='Salty' component= {Salty} />
      <Stack.Screen name='Sweet' component= {Sweet} />
    </Stack.Navigator>)
  }

  return (
    <NavigationContainer>
      <MaterialBottomTabs.Navigator
        initialRouteName = 'Home' 
        barStyle = {{backgroundColor: '#e57373'}}
        activeColor= 'white'
        keyboardHidesNavigationBar = {true}
        shifting = {true} //false this if don't like the effect of hiding label
        screenOptions = {({ route }) => ({
          tabBarIcon: ({ focused, color, size = 25 }) => {
          let iconName = focused;
          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Ricettario') {
            iconName = focused ? 'menu-open' : 'menu';
          } else if (route.name === 'Nuova ricetta') {
            iconName = focused ? 'file-document-edit' : 'file-document-edit-outline';
          }
          return <Icon name= {iconName} color={color} size={size}/>
        }
      })}
      >
        <MaterialBottomTabs.Screen name = "Home" component = {Home}/>
        {/* <MaterialBottomTabs.Screen name = "Ricettario" children = {createRecipeList} /> */}
        <MaterialBottomTabs.Screen name = "Ricettario" component = {MyStack} />
        <MaterialBottomTabs.Screen name = "Nuova ricetta" component = {NewRecipe} />
      </MaterialBottomTabs.Navigator>
    </NavigationContainer>
  )
}

export default App;