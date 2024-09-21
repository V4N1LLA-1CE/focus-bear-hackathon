import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { LOCALHOST } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function AddFriendsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [availableUsers, setAvailableUsers] = useState([]);

  const navigation = useNavigation();

  // Set the back button title to 'Friends'
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "Add Friends",
      headerTransparent: false,
      headerBackTitle: "Friends",
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 24,
      },
    });
  }, [navigation]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const authToken = await getAuthToken(); // Implement your method to get the auth token
        const response = await fetch(
          "http://" + LOCALHOST + ":3000/api/v1/users",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`, // Include your auth token in the header
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch users");
        }

        const data = await response.json();
        setAvailableUsers(data); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = availableUsers.filter((user) => {
    const combinedSearchField = user.name + user.username + user.email;
    return combinedSearchField
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
  });

  const renderUser = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.userName}>{item.username}</Text>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.email}>{item.email}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for friends"
        value={searchQuery}
        onChangeText={setSearchQuery}
        placeholderTextColor="#999" // Added placeholder text color
      />
      <FlatList
        data={filteredUsers}
        renderItem={renderUser}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: "#e9902c",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: "#000", // Ensures text entered is visible
  },
  card: {
    backgroundColor: "#e9902c",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Ensures shadow is visible on Android
    flexDirection: "column", // Ensures content inside the card is aligned properly
    alignItems: "start", // Centers text vertically within the card
    justifyContent: "center", // Centers text vertically within the card
  },
  userName: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  email: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },
  name: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  listContent: {
    paddingBottom: 20,
  },
});

const getAuthToken = async () => {
  try {
    const token = await AsyncStorage.getItem("authToken");
    return token; // Will return null if the token is not found
  } catch (error) {
    console.error("Error retrieving auth token:", error);
    return null; // Return null in case of an error
  }
};
