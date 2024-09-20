import { View, Text, TextInput, Button, StyleSheet, Alert, TouchableOpacity, ImageBackground } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome'; // Import the icon library

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const role = 'USER'; // Default role
  const LOCALHOST = '192.168.0.108'

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignup = async () => {
    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match.');
      return;
    }

    try {
      const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, username, email, password, role }),
      });

      if (response.ok) {
        Alert.alert('Signup Successful');
        router.push('/login');
      } else {
        const errorData = await response.json();
        Alert.alert('Signup Failed', errorData.error || 'An error occurred');
      }
    } catch (error) {
      Alert.alert('Signup Failed', error.message);
    }
  };

  return (
    <ImageBackground
      source={{ uri: 'https://images.unsplash.com/photo-1548504769-900b70ed122e?fit=crop&w=800&q=80' }} // Fetch a nature-inspired image from Unsplash
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>
        
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ddd"
        />
        
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#ddd"
        />
        
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#ddd"
        />
        
        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#ddd"
          />
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.iconButton}>
            <Icon name={showPassword ? 'eye' : 'eye-slash'} size={20} color="#e9902c" />
          </TouchableOpacity>
        </View>
        
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.passwordInput}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            placeholderTextColor="#ddd"
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)} style={styles.iconButton}>
            <Icon name={showConfirmPassword ? 'eye' : 'eye-slash'} size={20} color="#e9902c" />
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
        
        <Text style={styles.loginText}>Already have an account?</Text>
        <TouchableOpacity style={styles.linkButton} onPress={() => router.push('/login')}>
          <Text style={styles.linkText}>Log In</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  container: {
    backgroundColor: 'rgba(255, 244, 233, 0.9)', // Slight opacity for overlay effect
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: '#000', // Adding a soft shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    color: '#e9902c',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#e9902c',
    marginBottom: 5,
  },
  input: {
    // borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    // borderColor: '#e9902c',
    backgroundColor: '#fefefe',
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // borderWidth: 1,
    // borderColor: '#e9902c',
    borderRadius: 5,
    backgroundColor: '#fefefe',
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
  },
  iconButton: {
    padding: 10,
  },

  button: {
    backgroundColor: '#e9902c',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000', // Adding shadow to button
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginText: {
    textAlign: 'center',
    color: '#e9902c',
    marginBottom: 10,
  },
  linkButton: {
    alignSelf: 'center',
  },
  linkText: {
    color: '#e9902c',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
});