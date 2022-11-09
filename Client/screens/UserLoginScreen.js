/*

    Author: Troy & Tyler

    User Login Screen

*/

import React, {useState} from 'react';
import { StatusBar } from "expo-status-bar";
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Button} from 'react-native';

function login(userEmail, userPassword){
    fetch("http://70.177.34.147:3000/api/users/login", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'auth-token': 'jwtToken'
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword
        })
    })

        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
            //const user_Token = sessionStorage.setItem('jwtToken',JSON.stringify(responseData.token));
           // console.log(user_Token);
        })
        .done();
}

const UserLoginScreen = ({navigation}) =>{

// States for registration
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: '#05998c',
        alignItems: "center",
    },
    inputView: {
        backgroundColor: "#c3f7e3",
        borderRadius: 30,
        width: "70%",
        height: 45,
        marginBottom: 20,

        alignItems: "center",
    },

    headline: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        padding: 10,
        color:'white'
    },

    selectedLabel: {
        color: "white",
    },

    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
      },

      forgot_button: {
        height: 30,
        marginBottom: 30,
      },

      forgot_buttonUpdated: {
        height: 30,
        marginTop: 30,
      },

      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#c3f7e3",
        marginTop: 50
      },
});

return (
    <View style={[styles.container]}>
    <Image
        source={require('../assets/TutorHub.png')}
        style={{ alignSelf: 'center', width: 120, height: 120, marginTop: 180 }}
    ></Image>
    <Text style={styles.headline}>Welcome to TutorHub</Text>
    <StatusBar style="auto" />
    <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="Enter Email"
            placeholderTextColor="#003f5c"
            onChangeText={(email) => setEmail(email)} />
    </View>
    <View style={styles.inputView}>
        <TextInput
            style={styles.TextInput}
            placeholder="Enter Password"
            placeholderTextColor="#003f5c"
            secureTextEntry={true}
            onChangeText={(password) => setPassword(password)} />
    </View>
    <TouchableOpacity>
        <Text style={styles.forgot_button}>Forgot Password?</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={() => login(email,password && navigation.navigate('Home'))} style={styles.loginBtn}>
        <Text style={styles.loginText}>Login</Text>
    </TouchableOpacity>
    <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.forgot_buttonUpdated}>Don't have an account? Sign up now.</Text>
    </TouchableOpacity>
</View>
    );
}

export default UserLoginScreen;