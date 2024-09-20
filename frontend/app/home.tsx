import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from "expo-router";

export default function HomePage() {
  const router = useRouter();
  
  return (
    <View style={styles.container}>
      <Text>This is the Home Page</Text>
      <Button title="Log In" onPress={() => router.push('/dashboard')} />
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
