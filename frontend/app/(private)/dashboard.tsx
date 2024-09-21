import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { useRouter } from "expo-router";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALHOST } from "../constants";

export default function DashboardPage() {
  const router = useRouter();
  const navigation = useNavigation();

  const [users, setUsers] = useState([]);

  const [showRequests, setShowRequests] = useState(false);
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, name: "Michael Jordan" },
    { id: 2, name: "Novak Djokovic" },
    { id: 3, name: "Virat Kohli" },
    { id: 4, name: "Leo Messi" },
    { id: 5, name: "Roger Federer" },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: "My Dashboard",
      headerTransparent: true,
      headerStyle: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
      headerTintColor: "#000",
      headerTitleStyle: {
        fontWeight: "bold",
        fontSize: 24,
      },
      headerRight: () => (
        <View style={styles.headerIcons}>
          <TouchableOpacity
            onPress={() => setShowRequests(!showRequests)}
            style={styles.headerButton}
          >
            <Icon name="bell" size={24} color="#fc8a00" />
            {friendRequests.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>
                  {friendRequests.length}
                </Text>
              </View>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.replace("/")}
            style={styles.headerButton}
          >
            <Icon name="sign-out" size={24} color="#fc8a00" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, showRequests, friendRequests]);

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
        setUsers(data); // Adjust according to your API response structure
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleAcceptRequest = (requestId) => {
    const acceptedRequest = friendRequests.find((req) => req.id === requestId);
    setUsers((prevFriends) => [...prevFriends, acceptedRequest]);
    setFriendRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== requestId),
    );
  };

  const handleRejectRequest = (requestId) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== requestId),
    );
  };

  const renderLeaderboardCard = ({ item, index }) => (
    <View style={styles.leaderboardCard}>
      <Text style={styles.leaderboardRank}>{index + 1}</Text>
      <Text style={styles.leaderboardName}>{item.username}</Text>
      <Text style={styles.leaderboardScore}>{item.dailyStats} pts</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.leaderboardTitle}>Global Leaderboard</Text>
        <FlatList
          data={users.sort((a, b) => b.dailyStats - a.dailyStats)}
          renderItem={renderLeaderboardCard}
          keyExtractor={(item) => item.id.toString()}
          contentContainerStyle={styles.leaderboardList}
        />
      </View>

      {/* Friend Requests Dropdown */}
      {showRequests && (
        <View style={styles.dropdown}>
          <Text style={styles.dropdownHeader}>Friend Requests</Text>
          {friendRequests.slice(0, 4).map((request) => (
            <View key={request.id} style={styles.requestContainer}>
              <Text style={styles.dropdownText}>{request.name}</Text>
              <View style={styles.requestButtons}>
                <TouchableOpacity
                  style={styles.acceptButton}
                  onPress={() => handleAcceptRequest(request.id)}
                >
                  <Text style={styles.buttonText}>Accept</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.rejectButton}
                  onPress={() => handleRejectRequest(request.id)}
                >
                  <Text style={styles.buttonText}>Reject</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          {friendRequests.length > 4 && (
            <TouchableOpacity onPress={() => router.push("/friend-requests")}>
              <Text style={styles.showMoreLink}>Show More</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fefefe",
    justifyContent: "start",
    alignItems: "center",
    paddingTop: 110,
    paddingBottom: 100,
  },
  overlay: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  headerButton: {
    marginRight: 15,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  notificationBadge: {
    position: "absolute",
    right: -6,
    top: -3,
    backgroundColor: "red",
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: "center",
    alignItems: "center",
  },
  notificationText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  dropdown: {
    position: "absolute",
    top: 100,
    right: 10,
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: 250,
    zIndex: 1000,
  },
  dropdownHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000",
  },
  requestContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    paddingBottom: 10,
  },
  dropdownText: {
    color: "#000",
    paddingVertical: 5,
    fontSize: 16,
  },
  requestButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  acceptButton: {
    backgroundColor: "green",
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: "red",
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
  },
  showMoreLink: {
    color: "#e9902c",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
    textDecorationLine: "underline",
  },
  leaderboardTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 0,
    color: "#fc8a00",
  },
  leaderboardCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    width: "100%", // Adjust width
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    alignSelf: "center", // Center the card
  },
  leaderboardRank: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
    width: 30,
    textAlign: "center",
  },
  leaderboardName: {
    fontSize: 16,
    color: "#333",
    flex: 1,
    textAlign: "left",
    marginLeft: 10,
  },
  leaderboardScore: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fc8a00",
  },
  leaderboardList: {
    width: "100%", // Set this to 100%
    alignItems: "center", // Center content horizontally
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
