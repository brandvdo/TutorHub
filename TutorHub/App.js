import React from "react";
import { Button, StyleSheet, Text, Image, TextInput, View } from 'react-native';
import { NavigationContainer } from "@react-navigation/native";
import {createNativeStackNavigator } from '@react-navigation/native-stack'


import Header from './src/components/Header';

function HomeScreen({navigation}){
  return (
    <View style={styles.container}>
     <Header/>
     <View>
      <Image
        source={require('./assets/TutorHub.png')}          
          style={{width:60, height:40}}
          >
      </Image>
      <Text>TutorHub is a workspace for LSU students and tutors to connect with each other on a simple platform </Text>
     <TextInput
          style={styles.placeholder}
          placeholder="Enter lsu email"
        />
        </View>
      <Button
        title="Create Account"
        onPress={() => navigation.navigate('Create Account')}
      />
    </View>
  );
}

function NextScreen() {
  return (
    <View style={{ flex: 1}}>
      <Image
          source={require('./assets/TutorHub.png')}
           style={{width:60, height:40}}
          >
      </Image>
    <Text>My Profile Page</Text>
    <TextInput
      style={styles.placeholder}
      placeholder="Enter Name"></TextInput>
  </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {


  // const [inputName, setInputName] = React.useState('');
  // const [nameList, setNameList] = React.useState([]);

  // const addNameToList = () => {
  //   setNameList([... nameList, inputName]);
  //   console.log(nameList);
  // }

  return(
    <NavigationContainer>
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Create Account" component={NextScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );

}


const styles = StyleSheet.create({
  container: {
    padding: 30
    
  },
    placeholder: {
      textAlign: 'center',
      margin:30,
      fontSize:20,
    }
});

export default App;
