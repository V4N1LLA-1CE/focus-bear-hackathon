import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

export default function LandingPage() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text>Welcome to the App!</Text>
      <Button title="Go to Home" onPress={() => router.push('/home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});