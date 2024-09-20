// _layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Public routes */}
      <Stack.Screen name="(public)" options={{ headerShown: false }} />
      
      {/* Private routes */}
      <Stack.Screen name="(private)" options={{ headerShown: false }} />
    </Stack>
  );
}
