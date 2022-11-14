/*

Author: Troy & Tyler

Signup Screen

*/

import React, {useState} from 'react';
import {StatusBar} from "expo-status-bar";
import {StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';


const SignupScreen = ({navigation}) =>{

  function singup(userName, userEmail, userPassword, userSchool){
    fetch("http://70.177.34.147:3000/api/users/register", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: userEmail,
            password: userPassword,
            fullName: userName,
            profileType: 0,
            school: "LSU",
            tutorSubjects: [],
            studySubjects: [],

        })
    })

        .then((response) => response.json())
        .then((responseData) => {
            console.log(
                "POST Response",
                "Response Body -> " + JSON.stringify(responseData)
            )
            navigation.navigate('Login')
        })
        .done();
}

// States for registration
const [name, setName] = useState('');
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const [confirmPassword, setConfirmPassword] = useState('');

// States for checking the errors
const [submitted, setSubmitted] = useState(false);
const [error, setError] = useState(false);


  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h1>User {username} successfully registered!!</h1>
      </div>
    );
  };
 
  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}>
        <h1>Please enter all the fields</h1>
      </div>
    );
  };
 

 // Handling the form submission
 const handleSubmit = (e) => {
    e.preventDefault();
    if (name === '' || email === '' || password === '') {
      setError(true);
    } else {
      setSubmitted(true);
      setError(false);
    }
  };

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
        backgroundColor: "#c3f7e3",
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
                    placeholder="Enter Name"
                    placeholderTextColor="#003f5c"
                    onChangeText={(name) => setName(name)} />
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
            {/* <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Confirm Password"
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(confirmPassword) => setConfirmPassword(confirmPassword)} />
            </View> */}
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.forgot_button}>Already have an account?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => singup(name,email,password)}>
                <Text style={styles.loginText}>Sign Up</Text>
            </TouchableOpacity>
        </View>
    );
}

export default SignupScreen;