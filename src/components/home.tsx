import React from 'react'
import { SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native'

const Home: React.FunctionComponent = () => {
  return (
    <SafeAreaView style={Styles.container}>
      <StatusBar backgroundColor="#e57373" barStyle="dark-content" />
      <View style={Styles.boxIntro}>
        <Text style={Styles.textIntro}>Welcome to my simple CookBook App</Text>
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
})

export default Home
