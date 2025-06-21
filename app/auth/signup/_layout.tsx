import { Stack } from 'expo-router/stack';

export default function SignupLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="name" />
      <Stack.Screen name="credentials" />
      <Stack.Screen name="verify-email" />
      <Stack.Screen name="verify-phone" />
    </Stack>
  );
}