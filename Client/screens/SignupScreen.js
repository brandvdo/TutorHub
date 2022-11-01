/*

Signup Screen

*/

import React from 'react';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';

const SignupScreen = () =>(
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
                placeholder="Create a Username"
                placeholderTextColor="#003f5c"
                onChangeText={(email) => setEmail(email)} />
        </View>
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
        <View style={styles.inputView}>
            <TextInput
                style={styles.TextInput}
                placeholder="Confirm Password"
                placeholderTextColor="#003f5c"
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)} />
        </View>
        <TouchableOpacity>
            <Text style={styles.forgot_button}>Already have an account?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
    </View>
);

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

    selectedLabel: {
        color: "white",
    },

    headline: {
        fontWeight: 'bold',
        fontSize: 22,
        textAlign: 'center',
        padding: 10,
        color:'white'
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

      loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#c3f7e3",
      },
});

export default SignupScreen;