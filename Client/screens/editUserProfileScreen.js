/*

    Author: Tyler & Troy

    Edit User Profile Screen

*/
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from 'react-native';
import * as SecureStore from 'expo-secure-store';  
import { ThemeProvider } from '@react-navigation/native';
import * as ImagePicker from 'expo-image-picker';

const jwtDecode = require('jwt-decode');



const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
        backgroundColor: '#05998c',
    },
    image:{
        alignSelf: 'flex-start',
        width: 120,
        height: 120,
        marignLeft:180,
        marginTop: 40,
    },
    profilePic:{
        marginTop: 50,
        width: 120,
        height: 120,
        borderRadius: '50%',

    },
    row:{
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignSelf: 'center',
    },
    button:{
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        alignSelf: 'center',
    },
    nameStyle:{
        fontWeight: 'bold',
        fontSize: '20px',
        color: "#e0e0e0",
        alignSelf: 'left',
    },
    buttonBio:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        marginBottom: 10,
        alignSelf: 'center',
    },
    box:{
        marginTop: 10,
        alignSelf: 'left',
    },
});

const EditUserProfileScreen = ({navigation}) =>{
    const [data, setData] = useState([]);

    const fetchData = async () => {
        const userToken = await SecureStore.getItemAsync("token");
        const decodedToken = jwtDecode(userToken);
        const resp = await fetch("http://70.177.34.147:3000/api/users/getUserInfo/"+decodedToken._id, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': userToken,
            },
        })
        const data = await resp.json();
        setData(data);
        setLoading(false);
      };

    /*
        Used to update information
    */
      useEffect(() => {
        fetchData();
          const dataInterval = setInterval(() => fetchData(), 10 * 1000);
          return () => clearInterval(dataInterval);
      }, []);

      const [image, setImage] = useState(null);

      const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };
          
    return(
        <View style={[styles.container]}>
        <View style={{borderBottomColor: "rgb(224, 224, 224)", borderBottomWidth: 4, marginLeft: 5, marginRight: 5}}>
            <View>
                <View style={styles.row}>
                    <TouchableOpacity onPress={pickImage}>
                    {image && <Image source={{ uri: image }} style={[styles.profilePic]} />}
                    <Image
                        source={require('../assets/images/user-profile-icon-free-vector.webp')}
                        style={[styles.profilePic]}>
                    </Image>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={styles.buttonBio}>
                    <TouchableOpacity>
                        <Text style={{fontWeight: 'bold'}}>Change Profile Picture</Text>
                    </TouchableOpacity>
            </View>
            <View style={styles.buttonBio}>
                <TouchableOpacity onPress={() =>navigation.navigate('Login')}>
                    <Text style={{fontWeight: 'bold'}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
        <View>
            <View style={styles.box}>
                <TouchableOpacity>
                    <Text style={styles.nameStyle}>Name: {data.fullName} {'\n'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <TouchableOpacity>
                    <Text style={styles.nameStyle}>Email: {data.email} {'\n'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <TouchableOpacity>
                    <Text style={styles.nameStyle}>Subjects you need help in: {data.studySubjects}{'\n'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.box}>
                <TouchableOpacity>
                    <Text style={styles.nameStyle}>Subjects interested to Tutor: {data.tutorSubjects}{'\n'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonBio}>
                <TouchableOpacity onPress={() => navigation.navigate('UserProfile')}>
                    <Text style={{fontWeight: 'bold'}}>Back To Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    );

}

export default EditUserProfileScreen;