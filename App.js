import React, { useState, useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity, // Import TouchableOpacity for handling profile clicks
} from 'react-native';
import ProfileScreen from './Profile'; 

const Stack = createStackNavigator();

function HomeScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [userExists, setUserExists] = useState(false); // Initialize as false
  const [searchPressed, setSearchPressed] = useState(false); // Track if the "Search" button was pressed
  const isRequesting = useRef(false);

  const handleSearch = async () => {
    if (!username || isRequesting.current) return;

    isRequesting.current = true;
    setLoading(true);
    try {
      const response = await fetch(
        `https://ratings.tankionline.com/api/eu/profile/?user=${username}`
      );
      const data = await response.json();

      if (data.response !== null && data.responseType === 'OK') {
        setUserData(data.response);
        setUserExists(true); // User exists
      } else {
        setUserExists(false); // User does not exist
        setUserData(null);
      }
    } catch (error) {
      setUserExists(false); // User does not exist
      setUserData(null);
    } finally {
      setLoading(false);
      isRequesting.current = false;
      setSearchPressed(true); // Mark that the "Search" button was pressed
    }
  };

  // Handle when the username is changed
  const handleUsernameChange = (text) => {
    setUsername(text);
    if (!text) {
      // If the username is empty, reset the userExists state
      setUserExists(false);
      setSearchPressed(false); // Also reset the searchPressed state
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile Page</Text>
      <TextInput
        placeholder="Enter username"
        style={[styles.input, { marginBottom: 20 }]}
        onChangeText={handleUsernameChange} // Use the custom handler
        value={username}
      />
      <Button title="Search" onPress={handleSearch} />
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : userExists && searchPressed ? (
        // Check if the user exists and "Search" button was pressed
        <TouchableOpacity
          style={styles.profileContainer}
          onPress={() => navigation.navigate('Profile', { userData })}
        >
          <Image
            source={{
              uri:
                'https://media.discordapp.net/attachments/604484924946251778/670310899344474122/unknown.png',
            }}
            style={styles.profileImage}
          />
          <Text style={styles.nickname}>{userData?.name}</Text>
        </TouchableOpacity>
      ) : null}
      {userExists === false && searchPressed ? (
        // Display error message when user does not exist and "Search" button was pressed
        <Text style={styles.errorText}>This user does not exist</Text>
      ) : null}
      <StatusBar style="auto" />
    </View>
  );
}


export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Profile" component={ProfileScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    width: 200,
  },
  profileContainer: {
    alignItems: 'center',
    backgroundColor: 'black',
    padding: 10,
    borderRadius: 10,
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  nickname: {
    color: 'white',
  },
  errorText: {
    color: 'red', // Display the error message in red
    marginTop: 20,
  },
});
