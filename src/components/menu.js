import React from 'react'
import { StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Menu = ({ navigation }) => {
  console.log('Log del menu')

  const saltyButton = () => {
    navigation.navigate('Salty')
  }

  const sweetButton = () => {
    navigation.navigate('Sweet')
  }

  return (
    <SafeAreaView style={Styles.containerIntro}>
      <StatusBar backgroundColor="#e57373" barStyle="dark-content" />
      <View style={Styles.containerIntro}>
        <Text style={Styles.textIntro}>Lista delle ricette</Text>
        <Text style={Styles.textUnderIntro}>Premi sul nome della ricetta per avere più informazioni al riguardo</Text>
      </View>
      <View style={Styles.containerMenu}>
        {/* SectionList require a different structure for the context from the FlatList  */}
        <TouchableOpacity onPress={saltyButton} style={Styles.buttonContainer}>
          <Text style={Styles.buttonText}>Ricette Salate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sweetButton} style={Styles.buttonContainer}>
          <Text style={Styles.buttonText}>Ricette Dolci</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  containerIntro: {
    display: 'flex',
    flex: 1,
  },
  containerMenu: {
    display: 'flex',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100,
  },
  buttonContainer: {
    backgroundColor: '#e57373',
    height: 40,
    width: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    textAlign: 'center',
    marginVertical: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  textIntro: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold',
  },
  textUnderIntro: {
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 170,
    paddingHorizontal: 20,
  },
})

export default Menu
