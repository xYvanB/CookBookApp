import React, { useState } from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'
import { TouchableOpacity } from 'react-native-gesture-handler'

import { ButtonGroup } from 'react-native-elements'

import { openDatabase } from 'react-native-sqlite-storage'

const testDatabase: React.FunctionComponent = () => {
  const db = openDatabase({
    name: 'recipeTest2.db',
    location: 'default',
    createFromLocation: '~www/recipeTest2.db',
  })

  // console.log('gesu è nato:', db)

  //used for "Button group" component, it require a number as an index, so no string allowed
  const [selectedIndex, setSelectedIndex] = useState(NaN)

  const onPress = (number: number): void => {
    setSelectedIndex(number)
    console.log('premimi tutto')
    if (number === 0) {
      db.transaction(
        function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS SaltyRecipes (ID INTEGER PRIMARY KEY AUTOINCREMENT, Title, Recipe)')
          tx.executeSql('INSERT INTO SaltyRecipes (Title, Recipe) VALUES (?,?)', ['Pizza', 'Pasta'])
          tx.executeSql('INSERT INTO SaltyRecipes (Title, Recipe) VALUES (?,?)', ['Pasta', 'Pizza'])
        },
        function (error) {
          console.log('Transaction ERROR: ', error.message)
        },
        function () {
          console.log('Database creato e/o dati inseriti')
        },
      )
    } else {
      db.transaction(
        function (tx) {
          tx.executeSql('CREATE TABLE IF NOT EXISTS SweetRecipes (ID INTEGER PRIMARY KEY AUTOINCREMENT, Title, Recipe)')
          tx.executeSql('INSERT INTO SweetRecipes (Title, Recipe) VALUES (?,?)', ['Torta di mele', 'pere'])
          tx.executeSql('INSERT INTO SweetRecipes (Title, Recipe) VALUES (?,?)', ['Torta di pere', 'mele'])
        },
        function (error) {
          console.log('Transaction ERROR: ', error.message)
        },
        function () {
          console.log('Database creato e/o dati inseriti')
        },
      )
    }
  }

  const onSaltyShow = () => {
    console.log('onSaltyShow')
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT count(*) AS mycount FROM SaltyRecipes',
        [],
        function (tx, rs) {
          console.log('Numero di righe: ', rs.rows.item(0).mycount)
        },
        function (tx, error) {
          console.log('Errore: ', error.message)
        },
      )
    })
  }

  const onSweetShow = () => {
    console.log('onSweetShow')
    db.transaction(function (tx) {
      tx.executeSql(
        'SELECT count(*) AS mycount FROM SweetRecipes',
        [],
        function (tx, rs) {
          console.log('Numero di righe: ', rs.rows.item(0).mycount)
        },
        function (tx, error) {
          console.log('Errore: ', error.message)
        },
      )
    })
  }

  const getSaltyData = () => {
    db.transaction(
      function (tx) {
        const query = 'SELECT * FROM SaltyRecipes'

        tx.executeSql(
          query,
          [],
          function (tx, resultSet) {
            for (let x = 0; x < resultSet.rows.length; x++) {
              console.log(
                'ID: ',
                resultSet.rows.item(x).ID,
                ', Title: ',
                resultSet.rows.item(x).Title,
                ', Recipe: ',
                resultSet.rows.item(x).Recipe,
              )
            }
          },
          function (tx, error) {
            console.log('SELECT error: ' + error.message)
          },
        )
      },
      function (error) {
        console.log('transaction error: ' + error.message)
      },
      function () {
        console.log('transaction ok')
      },
    )
  }

  const getSweetData = () => {
    db.transaction(
      function (tx) {
        const query = 'SELECT * FROM SweetRecipes'

        tx.executeSql(
          query,
          [],
          function (tx, resultSet) {
            for (let x = 0; x < resultSet.rows.length; x++) {
              console.log(
                'ID: ',
                resultSet.rows.item(x).ID,
                ', Title: ',
                resultSet.rows.item(x).Title,
                ', Recipe: ',
                resultSet.rows.item(x).Recipe,
              )
            }
          },
          function (tx, error) {
            console.log('SELECT error: ' + error.message)
          },
        )
      },
      function (error) {
        console.log('transaction error: ' + error.message)
      },
      function () {
        console.log('transaction ok')
      },
    )
  }

  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar backgroundColor="#e57373" barStyle="dark-content" />
      <View style={Styles.boxIntro}>
        <ButtonGroup
          onPress={onPress}
          selectedIndex={selectedIndex}
          buttons={['Insert Salty Data', 'Insert Sweet Data']}
        />
        {/* <TouchableOpacity style={Styles.button} onPress={onPress}>
          <Text>Insert Salty Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={onPress}>
          <Text>Insert Sweet Data</Text>
        </TouchableOpacity> */}
        <TouchableOpacity style={Styles.button} onPress={onSaltyShow}>
          <Text>Show Salty Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={onSweetShow}>
          <Text>Show Sweet Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={getSaltyData}>
          <Text>Get Salty Data</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Styles.button} onPress={getSweetData}>
          <Text>Get Sweet Data</Text>
        </TouchableOpacity>
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
