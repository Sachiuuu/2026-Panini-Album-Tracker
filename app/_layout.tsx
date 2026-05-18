import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0b1220' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="section/[id]" options={{ headerShown: true, title: '' }} />
        <Stack.Screen name="team/[code]" options={{ headerShown: true, title: '' }} />
      </Stack>
    </SafeAreaProvider>
  );
}
