import React from "react";
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

import Header from './src/components/Header';

export default function App() {

  const [inputName, setInputName] = React.useState('');
  const [nameList, setNameList] = React.useState([]);

  const addNameToList = () => {
    setNameList([... nameList, inputName]);
    console.log(nameList);
  }

  return (
    <View style={styles.container}>
      <Header/>
      <View>
        <Text></Text>
        <TextInput
          placeholder="Enter Name"
          onChangeText={text => setInputName(text)}
          value = {inputName}
        />
        <Button
            title="Add Name"
            onPress={addNameToList}
        />
      </View>
      <View>
        {nameList.map(names => <View><Text>{names}</Text></View>)}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 30
  },
});
