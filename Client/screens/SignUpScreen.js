/*

    Sign Up Screen

*/

import React from 'react';
import {StyleSheet, View, Text, TextInput} from 'react-native';

const UserProfileScreen = () =>{
    const [text, setText] = useState('');
    return(
        <View>
            <Text>Sign Up Screen</Text>
            <TextInput
            style={{height: 40}}
            placeholder="PlaceholderText"
            onChangeText={newText => setText(newText)}
            defaultValue={text}
            />
            <Text style={{padding: 10, fontSize:42}}>
                

            </Text>
        </View>
    );

}

const styles = StyleSheet.create({

});

export default UserProfileScreen;