import * as React from 'react'; 

import { View, Text, TouchableOpacity, ImageBackground, StyleSheet } from 'react-native'; 

 

// Import the local background image 

import backgroundImage from './assets/background.png'; // Make sure your image is in the assets folder 

 

export default function HomeScreen({navigation}) { 

  return ( 

    <ImageBackground 

      source={backgroundImage} 

      style={styles.background} 

    > 

      <View style={styles.headingContainer}> 

        <Text style={styles.heading}>Welcome Chef Christoffel</Text> 

      </View> 

 

      <View style={styles.buttonContainer}> 

        <TouchableOpacity 

          style={styles.button} 

          onPress={() => { 

            console.log('Edit/View the menu pressed'); NavigationPreloadManager.navigate('MenuScreen')

          }} 

        > 

          <Text style={styles.buttonText}>Edit/View the menu</Text> 

        </TouchableOpacity> 

         

        <TouchableOpacity 

          style={styles.button} 

          onPress={() => {  

            console.log('Exit pressed'); NavigationPreloadManager.navigate('HomeScreen')

          }} 

        > 

          <Text style={styles.buttonText}>Exit</Text> 

        </TouchableOpacity> 

      </View> 

    </ImageBackground> 

  ); 

} 

 

// Styles 

const styles = StyleSheet.create({ 

  background: { 

    flex: 1, 

    justifyContent: 'space-between', // Puts the heading at the top and buttons at the bottom 

    alignItems: 'center', 

  }, 

  headingContainer: { 

    marginTop: 100, 

    marginCenter: 10, // Adjusts the distance from the top 

  }, 

  heading: { 

    fontSize: 28, 

    fontWeight: 'bold', 

    color: '#0B098C',  

    textAlign: 'center', 

    textShadowColor: '#000', // Black shadow for contrast 

    textShadowOffset: { width: 1, height:1 }, 

    textShadowRadius: 2, 

  }, 

  buttonContainer: { 

    width: '100%', 

    paddingBottom: 30, // Padding to prevent buttons from touching the edge of the screen 

    alignItems: 'center', 

  }, 

  button: { 

    backgroundColor: '#0B098C', // Button color 

    paddingVertical: 15, 

    paddingHorizontal: 30, 

    borderRadius: 10, 

    marginVertical: 10, 

    width: '80%', // Makes the button take 80% of the screen width 

    alignItems: 'center', 

  }, 

  buttonText: { 

    color: '#fff', // White text for the buttons 

    fontSize: 16, 

    fontWeight: 'bold', 

  }, 

}); 

 
