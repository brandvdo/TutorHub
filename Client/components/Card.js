import React from 'react';
import {StyleSheet, View, Text, ImageBackground, TouchableOpacity} from 'react-native';
import axios from 'axios';

class Card extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      userFullName: null,
    };
  }

  //Pull Request example using axios
  componentDidMount(){
    axios.get('http://70.177.34.147:3000/api/users/getUserInfo/63335d787110b2d679d45ccb', {
    headers: {
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzMzNWQ3ODcxMTBiMmQ2NzlkNDVjY2IiLCJlbWFpbCI6ImJyYW5kdmRvQGdtYWlsLmNvbSIsImlhdCI6MTY2NDUxMzQyOSwiZXhwIjoxNjY0NTE1MjI5fQ.9CGIfYoRuFZ1URY0MBEyAn43krjOAN9Ke9alz8E_mdU',
    }
    })
    .then((res) => {
      this.setState({ userFullName: res.data.fullName })
    })
    .catch((error) => {
      console.error(error)
    })
  }
  

  render(){
    const { userFullName } = this.state;
    return(
        <TouchableOpacity
            onPress={() => props.navigation.navigate('UserDetails')}
            style={{paddingTop:60}}
        >
            <View style={styles.card}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{userFullName}</Text>
                </View>
                <View style={styles.imageContainer}>
                    <ImageBackground source={require('../assets/images/defaultProfileImage.png')} style={styles.image}>
                    </ImageBackground>
                </View>
                <View style={styles.description}>
                    <Text style={styles.descriptionText}>This is the description of a tutor post</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
    card: {
        shadowColor: 'black',
        shadowOpacity: 0.25,
        shadowOffset: { width: 0, height: 2},
        shadowRadius: 8,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        elevation: 5,
        height: 300,
        margin: 10
      },
      titleContainer: {
        height: '15%',
        padding: 10
      },
      title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'gray'
      },
      imageContainer: {
        width: '100%',
        height: '65%',
        overflow: 'hidden'
      },
      image: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-end'
      },
      price: {
        fontSize: 30,
        color: '#fff',
        margin: 10
      },
      year: {
        margin: 10,
        backgroundColor: '#2652B0',
        height: 25,
        width: 80,
        borderRadius: 5
      },
      yearText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center'
      },
      description: {
        margin: 10
      },
      descriptionText: {
        fontSize: 16,
        color: 'gray'
      }
});

export default Card;