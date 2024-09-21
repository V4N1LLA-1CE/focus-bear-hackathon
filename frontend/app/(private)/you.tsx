import React, { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALHOST } from "../constants";

export default function YouPage() {
  const router = useRouter();
  const navigation = useNavigation();
  const [user, setUser] = useState({
    id: 1,
    name: "John Doe",
    username: "johndoe123",
    email: "john.doe@example.com",
    role: "User",
    createdAt: "2022-01-01T00:00:00.000Z",
    streakLength: 14,
  });

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Your Profile",
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 24,
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await fetchAndCreateUser();
      if (userData) {
        setUser(userData); // Set the user state only when user data is successfully fetched
      }
    };

    fetchUserData();
  });

  return (
    <View style={styles.container}>
      <View style={styles.profileCard}>
        <Text style={styles.cardTitle}>Profile Information</Text>
        <View style={styles.cardContent}>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Name:</Text> {user.name}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Username:</Text> {user.username}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Email:</Text> {user.email}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Role:</Text> {user.role}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Account Created:</Text>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </Text>
          <Text style={styles.cardText}>
            <Text style={styles.cardLabel}>Current Streak:</Text>{" "}
            {user.streakLength} days
          </Text>
        </View>
        {/* Edit Button */}
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => router.push("/edit-profile")}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>

        {/* Sign Out Button */}
        <TouchableOpacity
          style={styles.signOutButton}
          onPress={() => router.replace("/")} // Replace this with your sign-out logic
        >
          <Text style={styles.signOutButtonText}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    alignItems: "center",
    paddingTop: 100,
  },
  profileCard: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginVertical: 10,
  },
  cardTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#e9902c",
    marginBottom: 10,
    textAlign: "center",
  },
  cardContent: {
    borderTopWidth: 1,
    borderTopColor: "#e6e6e6",
    paddingTop: 10,
  },
  cardText: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
  },
  cardLabel: {
    fontWeight: "bold",
    color: "#fc8a00",
  },
  editButton: {
    backgroundColor: "#fc8a00",
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  signOutButton: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#e60000",
    marginTop: 20,
    alignItems: "center",
  },
  signOutButtonText: {
    color: "#e60000",
    fontWeight: "bold",
    fontSize: 16,
  },
});

const fetchAndCreateUser = async () => {
  try {
    // Retrieve the access token from AsyncStorage
    const token = await AsyncStorage.getItem("authToken");

    // get current user Id and name
    const profileResponse = await fetch(
      "http://" + LOCALHOST + ":3000/api/v1/auth/profile",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    const profileData = await profileResponse.json();
    const currentUserId = profileData.sub;
    const currentUsername = profileData.username;

    if (!token) {
      throw new Error("No access token found");
    }

    // Fetch user details using the access token
    const response = await fetch(
      "http://" + LOCALHOST + `:3000/api/v1/users/${currentUserId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    // Check if the response is okay
    if (!response.ok) {
      throw new Error("Failed to fetch user data");
    }

    const userData = await response.json();

    // Extract and store the username and userId
    const currentUserName = userData.name;
    const currentUserEmail = userData.email;
    const currentUserRole = userData.role;
    const { createdAt } = userData;
    const { updatedAt } = userData;

    // create user object
    const user = {
      id: currentUserId,
      name: currentUserName,
      username: currentUsername,
      email: currentUserEmail,
      role: currentUserRole,
      createdAt,
      streakLength: 14,
    };

    return user;
  } catch (err) {
    // Handle errors, such as token retrieval or fetch failure
    Alert.alert("Error occurred", err.message);
  }
};
