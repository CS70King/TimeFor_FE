import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, LogIn } from 'lucide-react-native';

export default function Login1() {
  const [emailOrUsername, setEmailOrUsername] = useState('');

  const handleContinue = () => {
    if (emailOrUsername.trim()) {
      Keyboard.dismiss();
      router.push('/(auth)/login2');
    }
  };

  const dismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <ArrowLeft color="#333" size={24} />
          </TouchableOpacity>
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <LogIn color="#006A4E" size={32} />
          </View>
          
          <Text style={styles.title}>Welcome back</Text>
          <Text style={styles.subtitle}>Sign in to your TimeFor account</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Email or Username</Text>
              <TextInput
                style={styles.input}
                value={emailOrUsername}
                onChangeText={setEmailOrUsername}
                placeholder="Enter your email or username"
                placeholderTextColor="#999"
                autoCapitalize="none"
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                blurOnSubmit={true}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.button, emailOrUsername.trim() ? {} : styles.buttonDisabled]} 
            onPress={handleContinue}
            disabled={!emailOrUsername.trim()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/signup1')}>
            <Text style={styles.signupLink}>
              Don't have an account? <Text style={styles.signupLinkBold}>Sign Up</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#F0F8F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Inter-Bold',
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#666',
    marginBottom: 40,
  },
  form: {
    marginBottom: 40,
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    backgroundColor: '#FAFAFA',
  },
  button: {
    backgroundColor: '#006A4E',
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonDisabled: {
    backgroundColor: '#CCCCCC',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
  },
  signupLink: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  signupLinkBold: {
    fontFamily: 'Inter-SemiBold',
    color: '#006A4E',
  },
});