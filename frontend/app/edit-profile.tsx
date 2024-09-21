import React, { useLayoutEffect, useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LOCALHOST } from "./constants";

export default function EditProfilePage() {
  const router = useRouter();
  const navigation = useNavigation();
  const [userData, setUserData] = useState({
    name: '',
    username: '',
    email: '',
    role: '',
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Edit Profile',
      headerTransparent: false,
      headerBackTitle: 'Your Profile', // The back button will show 'Your Profile' in the navbar
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    });
  }, [navigation]);

  useEffect(() => {
    // Fetch user data and populate the edit form
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (!token) {
          throw new Error("No access token found");
        }

        const profileResponse = await fetch(
          `http://${LOCALHOST}:3000/api/v1/auth/profile`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!profileResponse.ok) {
          throw new Error("Failed to fetch profile data");
        }

        const profileData = await profileResponse.json();
        const currentUserId = profileData.sub;

        const response = await fetch(
          `http://${LOCALHOST}:3000/api/v1/users/${currentUserId}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const user = await response.json();

        setUserData({
          name: user.name,
          username: user.username,
          email: user.email,
          role: user.role,
        });
      } catch (error) {
        Alert.alert("Error occurred", error.message);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (field, value) => {
    setUserData({ ...userData, [field]: value });
  };

  const handleSave = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken");

      if (!token) {
        throw new Error("No access token found");
      }

      const response = await fetch(
        `http://${LOCALHOST}:3000/api/v1/users/update`, // Replace with your actual update endpoint
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(userData),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const updatedUser = await response.json();
      Alert.alert("Success", "Profile updated successfully!");
      setUserData(updatedUser);

      router.back(); // Navigate back to the profile page
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>
      <TextInput
        style={styles.input}
        value={userData.name}
        placeholder="Name"
        onChangeText={(value) => handleInputChange('name', value)}
      />
      <TextInput
        style={styles.input}
        value={userData.username}
        placeholder="Username"
        onChangeText={(value) => handleInputChange('username', value)}
      />
      <TextInput
        style={styles.input}
        value={userData.email}
        placeholder="Email"
        keyboardType="email-address"
        onChangeText={(value) => handleInputChange('email', value)}
      />
      <TextInput
        style={styles.input}
        value={userData.role}
        placeholder="Role"
        editable={false} // Role might not be editable depending on your app logic
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fc8a00',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#e9902c',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#fc8a00',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
