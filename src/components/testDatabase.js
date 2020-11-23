import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { openDatabase } from 'react-native-sqlite-storage'

const testDatabase = () => {
  const db = openDatabase({
    name: 'recipeTest2.db',
    location: 'default',
    createFromLocation: '~www/recipeTest2.db',
  })

  console.log('gesu è nato:', db)

  const onPress = () => {
    console.log('premimi tutto')
    db.transaction(
      function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS SaltyRecipes (Title, Recipe)')
        tx.executeSql('INSERT INTO SaltyRecipes (Title, Recipe) VALUES (?,?)', ['Psto', 'pasto'])
        tx.executeSql('INSERT INTO SaltyRecipes (Title, Recipe) VALUES (?,?)', ['Pasta', 'Diocane'])
      },
      function (error) {
        console.log('Transaction ERROR: ', error.message)
      },
      function () {
        console.log('Populated Database ok')
      },
    )
  }

  const onShow = () => {
    console.log('PORCODDIO')
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT count(*) AS mycount FROM SaltyRecipes',
        [],
        function (tx, rs) {
          console.log('Record count: ' + rs.rows.item(0).mycount)
        },
        function (tx, error) {
          console.log('SELECT error: ' + error.message)
        },
      )
    })
  }

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar backgroundColor="#e57373" barStyle="dark-content" />
      <View style={Styles.boxIntro}>
        <TouchableOpacity style={Styles.button} onPress={onPress}>
          <Text>Insert Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={onShow}>
          <Text>Show Data</Text>
        </TouchableOpacity>
        <Text style={Styles.textIntro}>test</Text>
      </View>
    </SafeAreaView>
  )
}

const Styles = StyleSheet.create({
  boxIntro: {
    justifyContent: 'center',
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  textIntro: {
    fontSize: 35,
    textAlign: 'center',
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#DDDDDD',
    padding: 10,
  },
})

export default testDatabase
