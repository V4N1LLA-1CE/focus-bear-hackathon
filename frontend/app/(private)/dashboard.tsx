import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon library

export default function DashboardPage() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true, // Show header
      headerTitle: 'My Dashboard', // Set title to "Dashboard"
      headerTransparent: true, // Make the header translucent
      headerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent effect for the navbar
      },
      headerTintColor: '#000', // Text color in the header
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.headerButton}>
          <Icon name="sign-out" size={24} color="#fc8a00" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  return (
    <View style={styles.container}>
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Welcome to your Dashboard!</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fefefe', // Solid white background
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000', // Changed text color to black for visibility on white background
    textAlign: 'center',
  },
  headerButton: {
    marginRight: 10, // Adjusts positioning of the icon in the header
  },
});
