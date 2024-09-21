// (public)/login.tsx
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Alert,
} from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Icon from "react-native-vector-icons/FontAwesome"; // Import the icon library
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LOCALHOST } from "../constants";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    // Handle login logic here
    // Call /api/v1/auth/login with body {"username":string, "password":string} returns JWT token
    try {
      const response = await fetch(
        "http://" + LOCALHOST + ":3000/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            password,
          }),
        },
      );

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token; // Access the 'access_token' from the response

        // Store the token in AsyncStorage
        await AsyncStorage.setItem("authToken", accessToken);

        // Navigate to the dashboard
        router.push("/(private)/dashboard");
      } else {
        Alert.alert("Login failed");
      }
    } catch (error) {
      Alert.alert("An error occurred during login", error);
    }
  };

  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1548504769-900b70ed122e?fit=crop&w=800&q=80",
      }} // Another nature-inspired image from Unsplash
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>

        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
          placeholderTextColor="#ddd" // Lighter color for placeholder text
        />

        <Text style={styles.label}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, styles.passwordInput]}
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            placeholderTextColor="#ddd" // Lighter color for placeholder text
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.iconButton}
          >
            <Icon
              name={showPassword ? "eye" : "eye-slash"}
              size={20}
              color="#e9902c"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => router.push("/signup")}
        >
          <Text style={styles.linkText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    backgroundColor: "rgba(255, 244, 233, 0.9)", // Light overlay similar to signup page
    padding: 20,
    marginHorizontal: 20,
    borderRadius: 20,
    shadowColor: "#000", // Adding a soft shadow for depth
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  title: {
    fontSize: 28,
    color: "#e9902c",
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: "#e9902c",
    marginBottom: 5,
  },
  input: {
    // borderWidth: 1,
    padding: 12,
    marginBottom: 10,
    borderRadius: 5,
    // borderColor: '#e9902c',
    backgroundColor: "#fefefe",
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    // borderWidth: 1,
    // borderColor: '#e9902c',
    borderRadius: 5,
    backgroundColor: "#fefefe",
    marginBottom: 10,
  },
  passwordInput: {
    flex: 1,
    padding: 12,
    paddingBottom: 2,
  },
  iconButton: {
    padding: 10,
  },
  button: {
    backgroundColor: "#e9902c",
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 15,
    shadowColor: "#000", // Adding shadow to button
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    color: "#e9902c",
    marginBottom: 10,
  },
  linkButton: {
    alignSelf: "center",
  },
  linkText: {
    color: "#e9902c",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});
