import React, { useState } from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { data } from '../data';

const Salty = ({ navigation }) => {

  console.log ('Log Salty Recipe');

  const [ reState, setReState ] = useState (false)

  const backButton = () => {
    navigation.navigate ('Ricettario')
  }
  
  const refresh = () => {
    setReState (true)
    console.log (reState)
    setReState (false)
  }

  const saltyData = data.find (t => t.title === 'Salty')

  return (
    <>
      <TouchableOpacity onPress={backButton} style={Styles.backButton}>
        <Icon name='close-circle-outline' size={30} color='#e57373'/>
      </TouchableOpacity>
      <View style={Styles.container}>
        <View style = {Styles.textContainer}>
          <Text style={Styles.text}>
              Salty Recipes
          </Text>
        </View>
        <SectionList
        sections= { [ saltyData ] }
        keyExtractor = { (item, index) => item + index}
        renderItem = { ( { item } ) =>             
          <View style={Styles.boxList}> {/* Maybe this isn't necessary*/}
            <Text style={Styles.titleList}> {item.title}</Text>
            <Text style={Styles.list}> Ricetta: {item.recipe}</Text>
          </View>}
        extraData = { reState } //how does it work ?
        ListEmptyComponent = { 
          <TouchableOpacity style= {Styles.empty}>
            <Text style={Styles.emptyText}>Add some recipe to your CookBook</Text> 
          </TouchableOpacity> }  />
        <View style = {Styles.buttonContainer}>
          <TouchableOpacity onPress = {refresh}>
            <Text style = {Styles.buttonTextRefresh}>Refresh</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  )
}

const Styles = StyleSheet.create ({
  backButton: {
    alignItems: 'flex-end',
    marginTop: 15,
    marginRight: 15
  },
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    borderRadius: 5,
    backgroundColor: '#e57373',
    color: 'white',
    width: 200,
  },
  textContainer: {
    alignItems: 'center',
  },

  //SectionList Styles
  boxList: {
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal: 40,
    marginVertical: 10,
    height: 100
  },
  list: {
    fontSize: 15,
    textAlign: 'center',
    color: 'gray'
  },
  titleList: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: "bold",
  },
  empty: {
    flex: 1,
    backgroundColor: '#e57373',
    borderRadius: 5,
    height: 50,
    width: 160,
    padding: 5,
    margin: 5
  },
  emptyText: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'white',
    // fontSize: 30,
  },
  //Fin SectionList Styles

  //Button Styles
  buttonContainer: {
    backgroundColor: '#e57373',
    height: 40,
    width: 200,
    marginVertical: 10,
    borderRadius: 8,
    alignSelf: 'center'
  }, 
  buttonTextRefresh: {
    textAlign: 'center',
    marginVertical: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: "bold",
  }, 
  //Fin Button Styles
})

export default Salty