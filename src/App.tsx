import React from 'react'

//Navigation Stuff
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
import testDatabase from './components/testDatabase'

const App: React.FunctionComponent = () => {
  const Stack = createStackNavigator()
  const MaterialBottomTabs = createMaterialBottomTabNavigator()

  const TabNavigator = (): object => {
    let iconName: string
    return (
      <MaterialBottomTabs.Navigator
        initialRouteName="Home"
        barStyle={{ backgroundColor: '#e57373' }}
        activeColor="white"
        keyboardHidesNavigationBar={true}
        shifting={true} //false this if don't like the effect of hiding label
        screenOptions={({ route }): object => ({
          // eslint-disable-next-line react/display-name
          tabBarIcon: ({ focused, color }): object => {
            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline'
            } else if (route.name === 'Ricettario') {
              iconName = focused ? 'menu-open' : 'menu'
            } else if (route.name === 'Nuova ricetta') {
              iconName = focused ? 'file-document-edit' : 'file-document-edit-outline'
            } else if (route.name === 'Database') {
              iconName = focused ? 'database-edit' : 'database'
            }
            return <Icon name={iconName} color={color} size={25} />
          },
        })}
      >
        <MaterialBottomTabs.Screen name="Home" component={Home} />
        <MaterialBottomTabs.Screen name="Ricettario" component={Menu} />
        <MaterialBottomTabs.Screen name="Nuova ricetta" component={NewRecipe} />
        <MaterialBottomTabs.Screen name="Database" component={testDatabase} />
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
