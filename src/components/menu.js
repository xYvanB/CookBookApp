import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity, } from 'react-native'

const Menu = ({navigation}) => {

  console.log ('Log del menu')

  const saltyButton = () => {
    navigation.navigate ('Salty')
  }

  const sweetButton = () => {
    navigation.navigate ('Sweet')
  } 

  return (
    <>
      <View style={styles.containerIntro}>
        <Text style={styles.textIntro}>Lista delle ricette</Text>
        <Text style={styles.textUnderIntro}>Premi sul nome della ricetta per avere più informazioni al riguardo</Text>
      </View>
      <View style={styles.containerMenu}>
        {/* SectionList require a different structure for the context from the FlatList  */}
        <TouchableOpacity onPress={saltyButton} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Ricette Salate</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={sweetButton} style={styles.buttonContainer}>
          <Text style={styles.buttonText}>Ricette Dolci</Text>
        </TouchableOpacity>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  containerIntro: {
    display: 'flex',
    flex: 1
  },
  containerMenu: {
    display: 'flex',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 100
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
    fontWeight: "bold",
  },
  textIntro: {
    fontSize: 35,
    textAlign: 'center',
    marginTop: 20,
    fontWeight: 'bold'
  },
  textUnderIntro: {
    fontSize: 15,
    textAlign: 'center',
    paddingBottom: 170,
    paddingHorizontal: 20
  }
});

export default Menu