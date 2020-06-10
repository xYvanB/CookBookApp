import React from 'react';
import { StyleSheet, StatusBar, Text, View } from 'react-native';

const Home = () => {

  return (
    <>
      <StatusBar backgroundColor='#e57373' barStyle="light-content" /> 
      <View style={styles.boxIntro}>
        <Text style={styles.textIntro}>Welcome to my simple CookBook App</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  boxIntro: {
    justifyContent: 'center',
    flex: 1,
  },
  textIntro: {
    fontSize: 35,
    textAlign: 'center',
  },
});

export default Home;