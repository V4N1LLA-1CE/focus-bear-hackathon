import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';

export default function OutgoingRequestsPage() {
  const router = useRouter();
  const { outgoingRequests } = useLocalSearchParams(); // Retrieve the outgoingRequests passed as a parameter

  const parsedRequests = outgoingRequests ? JSON.parse(outgoingRequests) : [];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Outgoing Friend Requests</Text>

      {parsedRequests.length === 0 ? (
        <Text style={styles.noRequestsText}>No outgoing friend requests.</Text>
      ) : (
        <FlatList
          data={parsedRequests}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.requestCard}>
              <Text style={styles.userName}>{item.name}</Text>
            </View>
          )}
          contentContainerStyle={styles.listContent}
        />
      )}

      {/* Back Button */}
      <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe',
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#e9902c',
  },
  requestCard: {
    backgroundColor: '#fff',
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '90%',
  },
  userName: {
    fontSize: 18,
    color: '#333',
  },
  noRequestsText: {
    fontSize: 16,
    color: '#777',
  },
  backButton: {
    marginTop: 20,
    backgroundColor: '#fc8a00',
    padding: 10,
    borderRadius: 5,
  },
  backButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  listContent: {
    paddingBottom: 20,
    alignItems: 'center',
  },
});
