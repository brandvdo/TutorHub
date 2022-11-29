/*

    Author: Logan & Tyler

    User Profile Screen

*/
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, FlatList} from 'react-native';
import * as SecureStore from 'expo-secure-store';
const jwtDecode = require('jwt-decode');

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 10,
    },
    Header:{
        paddingBottom: 10,
        backgroundColor: '#05998c',
        borderBottomLeftRadius: 50,
        borderBottomRightRadius: 50,
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
    buttonBio:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        marginTop: 10,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    buttonBack:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        top: 60,
        left: 10,
        alignSelf: 'left',
    },
    buttonBio2:{
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 30,
        backgroundColor: "#e0e0e0",
        marginTop: 60,
        alignSelf: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    nameStyle:{
        fontWeight: 'bold',
        fontSize: '25px',
        color: "#e0e0e0",
        marginTop: 10,
        alignSelf: 'center',
    },
    nameStyle2:{
        fontWeight: 'bold',
        fontSize: '15px',
        color: "black",
        marginTop: 10,
        alignSelf: 'center',
    },
    box:{
        paddingHorizontal: 40,
        paddingVertical: 20,
        marginTop: 10,
        backgroundColor: "#e0e0e0",
        alignSelf: 'center',
    },
    buttonLabel:{
        fontSize: 12,
        color: "black",
    },
    mainFeed:{
        fontSize: 20,
        color: "black",
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 15
    },
    flatListStyle:{
        width: 400,
        top: 20,
        height: 380,
        borderRadius: 10,
        marginLeft: 15,
        marginRight: 15,
        backgroundColor: '#e0e0e0'
       
    },
});


const Post = ({message, tags}) => (
    <View>
        <View style={{borderBottomColor: "rgb(5, 153, 140)", borderBottomWidth: 4, marginLeft: 5, marginRight: 5, paddingBottom: 5}}>
        <Text style={ {fontSize: 16}}>{message}</Text>
        <Text style={ {fontSize: 12}}>{tags}</Text>
        </View>
    </View>
);

const UserProfileScreen = ({navigation}) =>{

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    /*
        Take in the stored token and request the user information of the current user.
        Note that data is an object that contains all the user information

        Example: data.fullName 
    */

    const fetchData = async () => {
        const userToken = await SecureStore.getItemAsync("token");
        let profileID = await SecureStore.getItemAsync("profileID");
        const decodedToken = jwtDecode(userToken);

        if(profileID == null)
            profileID = decodedToken._id;
       
        const resp = await fetch("http://70.177.34.147:3000/api/users/getUserInfo/"+profileID, {
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
          const dataInterval = setInterval(() => fetchData(), 10 * 500);
          return () => clearInterval(dataInterval);
      }, []);
      

    const [theData, setTheData] = useState([]);
    const [theLoading, setTheLoading] = useState(true);

    //Render post item
    const renderItem = ({item}) => <Post 
    message={item.message}
    tags={item.tags}
    />;

    const fetchUserInfo = async () => {
        const userToken = await SecureStore.getItemAsync("token");
        let profileID = await SecureStore.getItemAsync("profileID");
        const decodedToken = jwtDecode(userToken);

        if(profileID == null)
            profileID = decodedToken._id;
            
        console.log(profileID)

        const resp = await fetch("http://70.177.34.147:3000/api/home/newsFeed/messages/"+profileID, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'auth-token': userToken,
            },
        })
        const theData = await resp.json();
        setTheData(theData);
        setTheLoading(false);
      };

      /*
        Used to update information
      */
        useEffect(() => {
        fetchUserInfo();
        fetchData();
      }, []);

      function goBack(){
        SecureStore.deleteItemAsync("profileID")
        navigation.navigate('Home');
      }
    return (
        <View style={styles.space}>
            <View style={[styles.Header]}>
                <View>
                    <View style={styles.buttonBack}>
                        <TouchableOpacity onPress={() => goBack()}>
                            <Text style={{fontWeight: 'bold'}}> Back To Home </Text>
                        </TouchableOpacity> 
                    </View>
                    <View style={styles.row}>
                        <Image
                            source={require('../assets/images/user-profile-icon-free-vector.webp')}
                            style={[styles.profilePic]}>
                        </Image>
                    </View>
                </View>
                <View>
                    <Text style={styles.nameStyle}>{data.fullName}</Text>
                </View>
                <View>
                    <View style={styles.row}>
                        <View style={styles.buttonBio}>
                            <TouchableOpacity onPress={() => navigation.navigate('ChatScreen')}>
                                <Text style={{fontWeight: 'bold'}}> Message </Text>
                            </TouchableOpacity> 
                        </View>
                        <Text>{'\t'}</Text>
                        <View style={styles.buttonBio}>
                            <TouchableOpacity onPress={() => navigation.navigate('')}>
                                <Text style={{fontWeight: 'bold'}}>Add Friend</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
                    <View style={styles.buttonBio}>
                        <TouchableOpacity onPress={() => navigation.navigate('EditUserProfile')}>
                            <Text style={{fontWeight: 'bold'}}>Edit Profile</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
                <View style={styles.flatListStyle}>
                    <FlatList
                            data={theData}
                            keyExtractor={item => item._id}
                            inverted = {true}
                            renderItem={renderItem}
                        />
                </View>
                <View style={styles.row}>
                        <View style={styles.buttonBio2}>
                            <TouchableOpacity onPress={() => navigation.navigate('')}>
                            <Text style={styles.nameStyle2}>Subjects Can Tutor {data.tutorSubjects}{'\n'}</Text>
                            </TouchableOpacity> 
                        </View>
                        <Text>{'\t'}</Text>
                        <View style={styles.buttonBio2}>
                            <TouchableOpacity onPress={() => navigation.navigate('')}>
                            <Text style={styles.nameStyle2}>Subjects Need Tutor {data.studySubjects}{'\n'}</Text>
                            </TouchableOpacity> 
                        </View>
                    </View>
        </View>
    );
}

export default UserProfileScreen;