import React, { useLayoutEffect, useState } from "react";
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

export default function DashboardPage() {
  const router = useRouter();
  const navigation = useNavigation();

  const [friends, setFriends] = useState([
    { id: 1, name: "John Doe", score: 150 },
    { id: 2, name: "Jane Smith", score: 200 },
    { id: 3, name: "Robert Johnson", score: 120 },
    { id: 4, name: "Emily Davis", score: 180 },
    { id: 5, name: "Usain Bolt", score: 300 },
    { id: 6, name: "Lionel Messi", score: 250 },
    { id: 7, name: "Serena Williams", score: 220 },
    { id: 8, name: "LeBron James", score: 170 },
    { id: 9, name: "Trent Boult", score: 121 },
    { id: 10, name: "CR7", score: 240 },
    { id: 11, name: "Novak Djokovic", score: 320 },
    { id: 12, name: "MJ", score: 340 },
    { id: 13, name: "Venus Williams", score: 120 },
    { id: 14, name: "Virat Kohli", score: 370 },
  ]);

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

  const handleAcceptRequest = (requestId) => {
    const acceptedRequest = friendRequests.find((req) => req.id === requestId);
    setFriends((prevFriends) => [...prevFriends, acceptedRequest]);
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
      <Text style={styles.leaderboardName}>{item.name}</Text>
      <Text style={styles.leaderboardScore}>{item.score} pts</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.leaderboardTitle}>Global Leaderboard</Text>
        <FlatList
          data={friends.sort((a, b) => b.score - a.score)}
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
    justifyContent: "center",
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
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
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
