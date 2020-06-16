import React from 'react';
import { SectionList, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { data } from '../data';

const Salty = ({ navigation }) => {
  
  console.log ('Log Sweet Recipe')

  const backButton = () => {
    navigation.navigate ('Ricettario')
  }

  const sweetData = data.find (t => t.title === 'Sweet')

    return (
      <>
        <TouchableOpacity onPress={backButton} style={Styles.backButton}>
          <Icon name='close-circle-outline' size={30} color='#e57373'/>
        </TouchableOpacity>
        <View style={Styles.container}>
          <View style = {Styles.textContainer}>
            <Text style={Styles.text}>
                Sweet Recipes
            </Text>
          </View>
          <SectionList
          sections= { [ sweetData ] }
          keyExtractor = { (item, index) => item + index} 
          renderItem = { ( { item } ) => 
            <View style={Styles.boxList}>
              <Text style={Styles.titleList}> {item.title}</Text>
              <Text style={Styles.list}> Ricetta: {item.recipe}</Text>
            </View>}
          ListEmptyComponent = { 
            <TouchableOpacity style= {Styles.empty}>
              <Text style={Styles.emptyText}>Add some recipe to your CookBook</Text> 
            </TouchableOpacity> }  />
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
    justifyContent: 'center'   
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
})

export default Salty