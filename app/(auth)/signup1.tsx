import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, User } from 'lucide-react-native';

export default function Signup1() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleContinue = () => {
    if (firstName.trim() && lastName.trim()) {
      Keyboard.dismiss();
      router.push('/(auth)/signup2');
    } else {
      Alert.alert('Required Fields', 'Please enter both first and last name');
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
          <Text style={styles.step}>Step 1 of 4</Text>
        </View>

        <View style={styles.content}>
          <View style={styles.iconContainer}>
            <User color="#006A4E" size={32} />
          </View>
          
          <Text style={styles.title}>What's your name?</Text>
          <Text style={styles.subtitle}>We'll use this to personalize your TimeFor experience</Text>

          <View style={styles.form}>
            <View style={styles.inputGroup}>
              <Text style={styles.label}>First Name</Text>
              <TextInput
                style={styles.input}
                value={firstName}
                onChangeText={setFirstName}
                placeholder="Enter your first name"
                placeholderTextColor="#999"
                returnKeyType="next"
                onSubmitEditing={() => {
                  // Focus on last name input when first name is submitted
                  // For now, just dismiss keyboard
                  dismissKeyboard();
                }}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.label}>Last Name</Text>
              <TextInput
                style={styles.input}
                value={lastName}
                onChangeText={setLastName}
                placeholder="Enter your last name"
                placeholderTextColor="#999"
                returnKeyType="done"
                onSubmitEditing={dismissKeyboard}
                blurOnSubmit={true}
              />
            </View>
          </View>

          <TouchableOpacity 
            style={[styles.button, (firstName.trim() && lastName.trim()) ? {} : styles.buttonDisabled]} 
            onPress={handleContinue}
            disabled={!firstName.trim() || !lastName.trim()}
          >
            <Text style={styles.buttonText}>Continue</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => router.push('/(auth)/login1')}>
            <Text style={styles.loginLink}>Already have an account? <Text style={styles.loginLinkBold}>Sign In</Text></Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  step: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#666',
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
  loginLink: {
    textAlign: 'center',
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#666',
  },
  loginLinkBold: {
    fontFamily: 'Inter-SemiBold',
    color: '#006A4E',
  },
});