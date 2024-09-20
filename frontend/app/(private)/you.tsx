import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the FontAwesome icon library

export default function YouPage() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true, // Show header
      headerTitle: 'Your Profile',
      headerTransparent: true, // Make the header translucent
      headerStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0.3)', // Transparent effect for the navbar
      },
      headerTintColor: '#fff', // Text color in the header
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <TouchableOpacity onPress={() => router.replace('/')} style={styles.headerButton}>
          <Icon name="sign-out" size={24} color="#fff" />
        </TouchableOpacity>
      ),
    });
  }, [navigation, router]);

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1583883175425-46dee3845e7f?q=80&w=800&auto=format&fit=crop' }}
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.welcomeText}>Your Profile</Text>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    width: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark translucent overlay
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
  },
  headerButton: {
    marginRight: 10, // Adjusts positioning of the icon in the header
  },
});
