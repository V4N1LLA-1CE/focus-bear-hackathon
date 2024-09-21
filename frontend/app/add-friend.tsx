import React, { useLayoutEffect, useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function AddFriendsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [availableUsers, setAvailableUsers] = useState([
    { id: 1, name: 'John Doe' },
    { id: 2, name: 'Jane Smith' },
    // Add more users as needed
  ]);

  const navigation = useNavigation();

  // Set the back button title to 'Friends'
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: 'Add Friends',
      headerTransparent: false,
      headerBackTitle: 'Friends',
      headerTintColor: '#000',
      headerTitleStyle: {
        fontWeight: 'bold',
        fontSize: 24,
      },
    });
  }, [navigation]);

  const filteredUsers = availableUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderUser = ({ item }) => (
    <TouchableOpacity style={styles.card}>
      <Text style={styles.userName}>{item.name}</Text>
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
    backgroundColor: '#fefefe',
    padding: 20,
  },
  searchBar: {
    height: 40,
    borderColor: '#e9902c',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 20,
    paddingHorizontal: 10,
    color: '#000', // Ensures text entered is visible
  },
  card: {
    backgroundColor: '#e9902c',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    elevation: 5, // Ensures shadow is visible on Android
    flexDirection: 'row', // Ensures content inside the card is aligned properly
    alignItems: 'center', // Centers text vertically within the card
  },
  userName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  listContent: {
    paddingBottom: 20,
  },
});
