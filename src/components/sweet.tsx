import React from 'react'
import {
  Dimensions,
  Image,
  SafeAreaView,
  SectionList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import { data } from '../data'

const screenWidth: number = Dimensions.get('screen').width

const Sweet: React.FunctionComponent = ({ navigation }: string) => {
  console.log('Log Sweet Recipe')

  const backButton = () => {
    navigation.navigate('Ricettario')
  }

  const sweetData: { title: string; data: { id: number; title: string; recipe: string } } = data.find(
    (t) => t.title === 'Sweet',
  )
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
                <Image source={{ uri: 'https://picsum.photos/200/200' }} style={Styles.image} />
                <View style={Styles.boxText1}>
                  <View style={Styles.boxTitleRecipe}>
                    <Text style={Styles.titleRecipe}> {item.title}</Text>
                  </View>
                  <View style={Styles.boxRecipe}>
                    <Text style={Styles.recipe}> Ricetta: {item.recipe}</Text>
                  </View>
                </View>
              </View>
            ) : (
              <View style={Styles.boxList2}>
                <Image source={{ uri: 'https://picsum.photos/200/200' }} style={Styles.image} />
                <View style={Styles.boxText2}>
                  <View style={Styles.boxTitleRecipe}>
                    <Text style={Styles.titleRecipe}> {item.title}</Text>
                  </View>
                  <View style={Styles.boxRecipe}>
                    <Text style={Styles.recipe}> Ricetta: {item.recipe}</Text>
                  </View>
                </View>
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
    height: 200,
    width: screenWidth,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  image: {
    width: screenWidth / 2,
    height: 200,
    resizeMode: 'stretch',
  },
  boxText1: {
    width: screenWidth / 2,
  },

  boxList2: {
    height: 200,
    width: screenWidth,
    flexDirection: 'row-reverse',
    alignItems: 'center',
    marginBottom: 10,
  },
  boxText2: {
    width: screenWidth / 2,
  },
  boxTitleRecipe: {
    borderRadius: 5,
    backgroundColor: '#e57373',
    marginHorizontal: 5,
  },
  titleRecipe: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#333',
  },
  boxRecipe: {},
  recipe: {
    fontSize: 15,
    textAlign: 'center',
    color: 'gray',
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
