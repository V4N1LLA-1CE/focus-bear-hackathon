import { View, Text, Button, StyleSheet, ImageBackground, TouchableOpacity } from 'react-native';
import { useRouter, useNavigation } from 'expo-router';
import { useEffect } from 'react';

export default function LandingPage() {
  const router = useRouter();
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({
      headerShown: false, // This hides the header
    });
  }, [navigation]);

  return (
    <ImageBackground 
      source={{ uri: 'https://images.unsplash.com/photo-1615196153984-342aee9c4420?fit=crop&q=80&w=800' }} // Simplified Unsplash URL
      style={styles.background}
    >
      <View style={styles.overlay}>
        <Text style={styles.title}>Welcome to the Focus Bear Demo App!</Text>
        <TouchableOpacity style={styles.button} onPress={() => router.push('/login')}>
          <Text style={styles.buttonText}>Get Started ➔</Text>
        </TouchableOpacity>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dark overlay for better text visibility
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 40,
  },
  button: {
    backgroundColor: '#e9902c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25, // Rounded button style
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
