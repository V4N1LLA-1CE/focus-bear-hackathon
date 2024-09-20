// (public)/_layout.tsx
import { Stack } from 'expo-router';

export default function PublicLayout() {
  return (
    <Stack>
      <Stack.Screen name="home" options={{ headerShown: true }} />
      <Stack.Screen name="login" options={{ headerShown: true }} />
      <Stack.Screen name="signup" options={{ headerShown: true }} />
    </Stack>
  );
}
