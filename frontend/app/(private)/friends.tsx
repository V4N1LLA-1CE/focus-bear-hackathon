import React, { useLayoutEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function FriendsPage() {
  const router = useRouter();
  const navigation = useNavigation();

  const [friends, setFriends] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Robert Johnson' },
    { id: 4, name: 'Emily Davis' },
  ]);

  const [showRequests, setShowRequests] = useState(false);
  const [friendRequests, setFriendRequests] = useState([
    { id: 1, name: 'Michael Jordan' },
    { id: 2, name: 'Novak Djokovic' },
    { id: 3, name: 'Virat Kohli' },
    { id: 4, name: 'Leo Messi' },
    // { id: 5, name: 'Leo Messi' },
    // { id: 6, name: 'Leo Messi' },
    // { id: 7, name: 'Leo Messi' },
    // { id: 8, name: 'Leo Messi' },
    // { id: 9, name: 'Leo Messi' },
  ]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Friends',
      headerTransparent: true,
      headerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)',
      },
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
      headerRight: () => (
        <View style={styles.headerIconWrapper}>
          {/* Bell Icon */}
          <TouchableOpacity onPress={() => setShowRequests(!showRequests)} style={styles.headerButton}>
            <Icon name="bell" size={24} color="rgba(255, 172, 28, 0.8)" />
            {friendRequests.length > 0 && (
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>{friendRequests.length}</Text>
              </View>
            )}
          </TouchableOpacity>

          {/* Plus Icon for Add Friends */}
          <TouchableOpacity onPress={() => router.push('/add-friend')} style={styles.headerButton}>
            <Icon name="plus" size={24} color="rgba(255, 172, 28, 0.8)" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, showRequests, friendRequests]);

  const handleAcceptRequest = (requestId) => {
    const acceptedRequest = friendRequests.find((req) => req.id === requestId);
    setFriends((prevFriends) => [...prevFriends, acceptedRequest]);
    setFriendRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== requestId)
    );
  };

  const handleRejectRequest = (requestId) => {
    setFriendRequests((prevRequests) =>
      prevRequests.filter((req) => req.id !== requestId)
    );
  };

  const renderFriendCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <View style={styles.card}>
        <Text style={styles.friendName}>{item.name}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {friends.length === 0 ? (
        <Text style={styles.noFriendsText}>No Friends Yet</Text>
      ) : (
        <FlatList
          data={friends}
          renderItem={renderFriendCard}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.friendList}
        />
      )}

      {/* Dropdown for Friend Requests */}
      {showRequests && (
        <View style={styles.dropdown}>
          <Text style={styles.dropdownHeader}>Incoming Friend Requests</Text>
          {friendRequests.length === 0 ? (
            <Text style={styles.dropdownText}>No Friend Requests</Text>
          ) : (
            friendRequests.map((request) => (
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
            ))
          )}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 100,
  },
  noFriendsText: {
    fontSize: 20,
    color: '#000',
    marginBottom: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: 'center',
    margin: 10,
    paddingHorizontal: 70,
  },
  card: {
    backgroundColor: '#fff',
    width: 150,
    height: 150,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    paddingHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  friendName: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18,
    textAlign: 'center',
  },
  friendList: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerIconWrapper: {
    flexDirection: 'row', // Set flexDirection to 'row' for horizontal alignment
    alignItems: 'center',
  },
  headerButton: {
    marginRight: 15, // Adjust margin between the icons
  },
  notificationBadge: {
    position: 'absolute',
    right: -6,
    top: -3,
    backgroundColor: 'red',
    width: 18,
    height: 18,
    borderRadius: 9,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  dropdown: {
    position: 'absolute',
    top: 100,
    right: 10,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
    width: 200,
    zIndex: 1000,
  },
  dropdownHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#000',
  },
  requestContainer: {
    marginBottom: 10,
    borderBottomWidth: 1,  // Add a light border at the bottom
    borderBottomColor: '#ccc',  // Light gray color for the border
    paddingBottom: 10,   // Add padding to prevent content overlap
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
