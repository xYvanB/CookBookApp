import React from 'react'
import { Dimensions, SafeAreaView, SectionList, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { data } from '../data'

const screenHeight = Dimensions.get('screen').height
const screenWidth = Dimensions.get('screen').width

const Sweet = ({ navigation }) => {
  console.log('Log Sweet Recipe')
  console.log('Height Screen:', screenHeight)
  console.log('Width Screen:', screenWidth)

  const backButton = () => {
    navigation.navigate('Ricettario')
  }

  const sweetData = data.find((t) => t.title === 'Sweet')

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar backgroundColor="#e57373" barStyle="dark-content" />

      <View style={Styles.container}>
        <View style={Styles.backButton}>
          <TouchableOpacity onPress={backButton}>
            <Icon name="close-circle-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
        <View style={Styles.titleCategoryContainer}>
          <Text style={Styles.titleCategory}>Sweet Recipes</Text>
        </View>
        <SectionList
          sections={[sweetData]}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item, index }) =>
            index % 2 == 0 ? (
              <View style={Styles.boxList1}>
                <Text style={Styles.titleRecipe}> {item.title}</Text>
                <Text style={Styles.recipe}> Ricetta: {item.recipe}</Text>
              </View>
            ) : (
              <View style={Styles.boxList2}>
                <Text style={Styles.titleRecipe}> {item.title}</Text>
                <Text style={Styles.recipe}> Ricetta: {item.recipe}</Text>
              </View>
            )
          }
          ListEmptyComponent={
            <TouchableOpacity style={Styles.empty}>
              <Text style={Styles.emptyText}>Add some recipe to your CookBook</Text>
            </TouchableOpacity>
          }
        />
      </View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  backButton: {
    alignItems: 'flex-end',
    paddingTop: 9,
    paddingRight: 15,
    paddingBottom: 25,
    zIndex: 2,
  },
  container: {
    flex: 1,
  },
  titleCategory: {
    textAlign: 'center',
    // textAlignVertical: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    backgroundColor: '#e57373',
    color: 'white',
    width: screenWidth,
    height: 50,
    paddingTop: 12,
    textTransform: 'uppercase',
  },
  titleCategoryContainer: {
    position: 'absolute',
    zIndex: 1,
  },

  //SectionList Styles
  boxList1: {
    borderColor: 'black',
    borderWidth: 2,
    marginHorizontal: 40,
    marginVertical: 10,
    height: 100,
  },
  boxList2: {
    borderColor: 'green',
    borderWidth: 2,
    marginHorizontal: 40,
    marginVertical: 10,
    height: 100,
  },
  recipe: {
    fontSize: 15,
    textAlign: 'center',
    color: 'gray',
  },
  titleRecipe: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  empty: {
    flex: 1,
    backgroundColor: '#e57373',
    borderRadius: 5,
    height: 50,
    width: 160,
    padding: 5,
    margin: 5,
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
    alignSelf: 'center',
  },

  buttonTextRefresh: {
    textAlign: 'center',
    marginVertical: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  //Fin Button Styles
})

export default Sweet
