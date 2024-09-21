import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function FriendRequestsPage() {
  const navigation = useNavigation();
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, name: 'Michael Jordan' },
    { id: 2, name: 'Novak Djokovic' },
    { id: 3, name: 'Virat Kohli' },
    { id: 4, name: 'Leo Messi' },
    { id: 5, name: 'Roger Federer' },
  ]);

  // Set up the navigation options using useLayoutEffect
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Friend Requests',
      headerTransparent: false,
      headerBackTitle: 'Friends', // Set the back button title to "Friends"
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    });
  }, [navigation]);

  const handleAcceptRequest = (requestId) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== requestId)
    );
  };

  const handleRejectRequest = (requestId) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== requestId)
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Friend Requests</Text>
      <FlatList
        data={friendRequests}
        renderItem={({ item }) => (
          <View key={item.id} style={styles.requestContainer}>
            <Text style={styles.dropdownText}>{item.name}</Text>
            <View style={styles.requestButtons}>
              <TouchableOpacity
                style={styles.acceptButton}
                onPress={() => handleAcceptRequest(item.id)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rejectButton}
                onPress={() => handleRejectRequest(item.id)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  requestContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 10,
  },
  dropdownText: {
    color: '#000',
    paddingVertical: 5,
    fontSize: 16,
  },
  requestButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  acceptButton: {
    backgroundColor: 'green',
    padding: 5,
    borderRadius: 5,
    marginRight: 10,
  },
  rejectButton: {
    backgroundColor: 'red',
    padding: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
});
