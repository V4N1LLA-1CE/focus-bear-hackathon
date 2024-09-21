import { Stack } from 'expo-router';
import { Tabs } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';


export default function PrivateLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === 'dashboard') {
            iconName = 'home';
          } else if (route.name === 'friends') {
            iconName = 'users';
          } else if (route.name === 'you') {
            iconName = 'user';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#fefefe',
        tabBarInactiveTintColor: '#000000',
        tabBarStyle: {
          backgroundColor: '#fc8a00', // Translucent white background
          borderTopColor: 'rgba(255, 255, 255, 0.2)', // Slight border effect
          paddingBottom: 20, // Padding for the bottom icons
          paddingTop: 10, // Padding for the top icons
          position: 'absolute', // Make the tab bar overlay content
          zIndex: 10, // Ensure it's layered on top
          bottom: 0,
          left: 0,
          right: 0,
          elevation: 0,
          borderTopWidth: 0, // Optional: Removes default border
        },
        tabBarLabelStyle: {
          fontSize: 14, // Slightly larger text
        },
        tabBarIconStyle: {
          marginBottom: 0, // Adjust the icon spacing to balance it out
        },
      })}
    >
      <Tabs.Screen name="dashboard" options={{ title: 'Dashboard' }} />
      <Tabs.Screen name="friends" options={{ title: 'Friends' }} />
      <Tabs.Screen name="you" options={{ title: 'You' }} />
    </Tabs>
  );
}