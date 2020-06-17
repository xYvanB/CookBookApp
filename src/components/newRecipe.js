import React, { useState, useRef, useCallback } from 'react'
import { Text, StyleSheet, View, TouchableOpacity, Alert, ScrollView } from 'react-native'
import { data } from '../data'

//input & button element, we can even use default stuff but let's try this
import { Input, ButtonGroup } from 'react-native-elements'

const NewRecipe = () => {
  console.log('--------------------------')
  console.log('Log del newRecipe')
  console.log('--------------------------')

  const [textTitle, setTextTitle] = useState('')
  const [textRecipe, setTextRecipe] = useState('')

  //used for "Button group" component, it require a number as an index, so no string allowed
  const [selectedIndex, setSelectedIndex] = useState(NaN)

  const recipeRef = useRef(null)

  const onTitleSubmit = () => recipeRef?.current.focus()

  const changeCategory = (number) => {
    setSelectedIndex(number)
    if (number === 0) {
      console.log('--------------------------')
      console.log('Dio salato')
    } else {
      console.log('--------------------------')
      console.log('Dio dolce')
    }
  }

  const resetInputs = () => {
    setTextRecipe('')
    setTextTitle('')
    setSelectedIndex(NaN)
  }

  const saveRecipe = () => {
    console.log('--------------------------')
    console.log('title: ', textTitle, ' recipe: ', textRecipe, ' category: ', selectedIndex === 0 ? 'Salty' : 'Sweet')
    console.log('--------------------------')
    console.log(data)
    if (selectedIndex === 0) {
      console.log('inside if')
      const first = data.filter((t) => t.title === 'Sweet')[0]
      const addedRecipe = {}
      addedRecipe['id'] = 4
      addedRecipe['title'] = textTitle
      addedRecipe['recipe'] = textRecipe
      first.data.push(addedRecipe)
    } else if (selectedIndex === 1) {
      console.log('inside else if')
      const first = data.filter((t) => t.title === 'Sweet')[0]
      const addedRecipe = {}
      addedRecipe['id'] = 4
      addedRecipe['title'] = textTitle
      addedRecipe['recipe'] = textRecipe
      first.data.push(addedRecipe)
      Alert.alert('Congratulazioni', 'Hai salvato correttamente la ricetta', [{ text: 'OK', onPress: resetInputs }], {
        cancelable: false,
      })
    } else {
      console.log('inside else')
      Alert.alert('Errore', 'Seleziona una categoria per la ricetta prima di salvarla')
    }
  }

  return (
    <>
      <View>
        <Text style={styles.textIntro}>Aggiungi una ricetta</Text>
        <Text style={styles.textUnderIntro}>Assicurati di compilare tutti i campi</Text>
      </View>
      <ScrollView scrollEnabled={false} contentContainerStyle={styles.menu}>
        <Input
          placeholder="Titolo"
          returnKeyType="next"
          onChangeText={(textTitle) => setTextTitle(textTitle)}
          selectionColor="#e57373"
          type="text"
          leftIcon={{ type: 'feather', name: 'type', size: 20 }}
          rightIcon={{ type: 'feather', name: 'delete', size: 20 }}
          value={textTitle}
          onSubmitEditing={onTitleSubmit}
        />
        <Input
          ref={recipeRef}
          placeholder="Ricetta"
          type="text"
          textBreakStrategy="balanced"
          onChangeText={(textRecipe) => setTextRecipe(textRecipe)}
          returnKeyType="send"
          leftIcon={{ type: 'feather', name: 'italic', size: 20 }}
          rightIcon={{ type: 'feather', name: 'delete', size: 20 }}
          multiline={true}
          value={textRecipe}
        />

        <ButtonGroup
          onPress={changeCategory}
          selectedIndex={selectedIndex}
          buttons={['Salty', 'Sweet']}
          containerStyle={styles.buttonStyle}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.buttonText}
          innerBorderStyle={styles.innerBorder}
          selectedTextStyle={styles.selectedButton}
          selectedButtonStyle={styles.selectedButtonBG}
        />

        <TouchableOpacity style={styles.buttonContainer} onPress={saveRecipe}>
          <Text style={styles.buttonTextSave}>Salva ricetta</Text>
        </TouchableOpacity>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  test: {
    width: 100,
    height: 50,
  },
  menu: {
    alignItems: 'center',
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
  },

  textIntro: {
    fontSize: 35,
    fontWeight: 'bold',
    marginTop: 20,
    textAlign: 'center',
  },
  textUnderIntro: {
    fontSize: 15,
    textAlign: 'center',
  },
  result: {
    margin: 8,
    textAlign: 'center',
  },

  //Save Button
  buttonContainer: {
    backgroundColor: '#e57373',
    height: 40,
    width: 200,
    marginVertical: 10,
    borderRadius: 8,
  },
  buttonTextSave: {
    textAlign: 'center',
    marginVertical: 5,
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  //Fin Save Button

  //Start ButtonGroup
  buttonStyle: {
    backgroundColor: 'white',
  },
  buttonText: {
    textAlign: 'center',
    color: '#e57373',
  },
  selectedButton: {
    color: 'white',
  },
  selectedButtonBG: {
    backgroundColor: '#e57373',
  },
  innerBorder: {
    color: 'black',
    width: 2,
  },
  //Fin BottonGroup
})

export default NewRecipe
