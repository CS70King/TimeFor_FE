import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="signup1" />
      <Stack.Screen name="signup2" />
      <Stack.Screen name="verify-email" />
      <Stack.Screen name="verify-phone" />
      <Stack.Screen name="login1" />
      <Stack.Screen name="login2" />
    </Stack>
  );
}