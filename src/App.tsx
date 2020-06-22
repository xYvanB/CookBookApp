import React from 'react'

//import { YellowBox } from 'react-native';
//We need this as react-native-paper work like a shit and they don't want to change anything for fix this warning
//https://github.com/callstack/react-native-paper/issues/1520#issuecomment-564994646
//All this shit doesn't work as intended as you keep see warning on metro bundler
//The only solution is to don't use anymore react-native-paper
//This 'fix' need YellowBox to be imported from react-native
//YellowBox.ignoreWarnings(['Require cycle:']);

//Navigation Stuff
import 'react-native-gesture-handler'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs'

import { createStackNavigator } from '@react-navigation/stack'

//Icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

//Component
import Home from './components/home'
import Menu from './components/menu'
import NewRecipe from './components/newRecipe'
import Salty from './components/salty'
import Sweet from './components/sweet'

const App = () => {
  //try to use this for put salty and sweet screen inside "Ricettario"
  const Stack = createStackNavigator()
  const MaterialBottomTabs = createMaterialBottomTabNavigator()

  // const MyStack = () => {
  //   return (
  //     <Stack.Navigator headerMode="none">
  //       <Stack.Screen name="Ricettario" component={Menu} />
  //       <Stack.Screen name="Salty" component={Salty} />
  //       <Stack.Screen name="Sweet" component={Sweet} />
  //     </Stack.Navigator>
  //   )
  // }

  const TabNavigator = () => {
    return (
      <MaterialBottomTabs.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: '#e57373' }}
        activeColor="white"
        keyboardHidesNavigationBar={true}
        shifting={true} //false this if don't like the effect of hiding label
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color }) => {
            let iconName: string
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Ricettario') {
              iconName = focused ? 'menu-open' : 'menu'
            } else if (route.name === 'Nuova ricetta') {
              iconName = focused ? 'file-document-edit' : 'file-document-edit-outline'
            }
            return <Icon name={iconName} color={color} size={25} />
          },
        })}
      >
        <MaterialBottomTabs.Screen name="Home" component={Home} />
        <MaterialBottomTabs.Screen name="Ricettario" component={Menu} />
        <MaterialBottomTabs.Screen name="Nuova ricetta" component={NewRecipe} />
      </MaterialBottomTabs.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="Home" component={TabNavigator} />
        <Stack.Screen name="Salty" component={Salty} />
        <Stack.Screen name="Sweet" component={Sweet} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
