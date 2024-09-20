// (private)/dashboard.tsx
import React, { useLayoutEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';

export default function DashboardPage() {
  const router = useRouter();
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true, // Ensure header is shown
      headerStyle: {
        backgroundColor: '#f4511e', // Customize background color
      },
      headerTintColor: '#fff', // Customize text color
      headerRight: () => (
        <Button
          title="Sign Out"
          onPress={() => router.push('/home')}
        />
      ),
    });
  }, [navigation, router]);

  return (
    <View style={styles.container}>
      <Text>Welcome to your Dashboard!</Text>
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
